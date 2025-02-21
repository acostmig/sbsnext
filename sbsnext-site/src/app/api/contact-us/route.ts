import { getSession } from '@/app/session';
import { addUserContact } from '@/lib/db/queries';
import { Resend } from 'resend';

export async function POST(req: Request) {
    try {
        const session =await getSession();
        const userId = session?.user.id
        if(userId ===undefined)
        {
            return new Response("Unauthorized", {status: 401})
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        const formData = await req.json();

        const html = `
            <strong>
                <h2>New Contact Form Submission</h2>
                <table border="1" cellspacing="0" cellpadding="5">
                    ${Object.entries(formData)
                        .map(([key, value]) => 
                    `
                    <tr>
                        <td>
                           <strong>${key}</strong>
                        </td>
                        <td>
                            ${value}
                        </td>
                    </tr>
                    `)
                        .join("")}
                </table>
            </strong>
        `;

        if (formData.length === 0) {
            return new Response("no message provided", {status: 400})
        }

        addUserContact(userId, formData.name, formData.email, formData.phone);

        if(process.env.DISABLE_EMAIL?.toLowerCase()==="true")
        {
            return new Response("Email Disabled: \n"+html, {status: 200})
        }

        const { data, error }:{data:any, error:any}= await resend.emails.send({
            from: 'SBSNext site <website@automated.sbsnext.com>',
            to: ['miguel@sbsnext.com', 'acostmig@gmail.com'],
            subject: 'Contact Us from SBSNext site',
            html: html
        });

        if (error) {
            return new Response("failed to send email "+error.name+": "+error.message, {status: 400})
        }

        return new Response(data?.id, {status: 200})
    } catch (err: any) {
        return new Response("failed to send email "+ err?.message, {status: 500})
    }
}
