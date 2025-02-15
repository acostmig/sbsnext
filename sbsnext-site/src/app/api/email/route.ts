import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        if(process.env.DISABLE_EMAIL?.toLowerCase()==="true")
        {
            return new Response("Email Disabled", {status: 200})
        }
        const { message } = await req.json();

        if (!message) {
            return new Response("no message provided", {status: 400})
        }

        
        const { data, error } = await resend.emails.send({
            from: 'SBSNext site <website@automated.sbsnext.com>',
            to: ['miguel@sbsnext.com', 'acostmig@gmail.com'],
            subject: 'Contact Us from SBSNext site',
            html: `<strong>${message}</strong>`,
        });

        if (error) {
            return new Response("failed to send email "+error.name+": "+error.message, {status: 400})
        }

        return new Response(data?.id, {status: 200})
    } catch (err: any) {
        return new Response("failed to send email "+ err?.message, {status: 500})
    }
}
