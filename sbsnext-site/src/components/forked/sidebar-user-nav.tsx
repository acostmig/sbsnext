'use client';
import Image from 'next/image';


import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/forked/ui/sidebar';
import { Session } from '@/app/session';

export function SidebarUserNav({session}: {session: Session}) {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton className="bg-background h-10">
          <Image
            src={`https://avatar.vercel.sh/${session?.user?.clientIP}`}
            alt={session?.contact?.email ?? 'User Avatar'}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="truncate">{session?.contact?.email}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
