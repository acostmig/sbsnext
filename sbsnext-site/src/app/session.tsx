'use server';

import { createUser, getUser } from '@/lib/db/queries';
import { headers } from 'next/headers';
import { User, UserContact } from '@/lib/db/schema';

export interface Session {
  user: User
  contact: UserContact | null
}

export async function getSession(): Promise<Session | null> {
    const ip = await getClientIP();
    if (!ip) return null; // No IP detected

    let users = await getUser(ip); // Fetch users from DB
    let currentUserWithContact = users[0]; // Select the first user

    if (!currentUserWithContact) {
        await createUser(ip);
        users = await getUser(ip);
        currentUserWithContact = users[0]; 
    }

    return { user:currentUserWithContact.User, contact: currentUserWithContact.UserContact};
}

// Utility function to extract client IP from headers
async function getClientIP(): Promise<string | null> {
    const headerList = await headers();
    const forwardedFor = headerList.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim(); // Use first IP in the list
    }
    return headerList.get('remote-addr'); // Fallback to remote address
}
