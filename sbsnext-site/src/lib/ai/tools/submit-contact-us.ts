import { tool } from 'ai';
import { z } from 'zod';
import { Resend } from 'resend';


export const submitContactUs = tool({
  description: 'Send contact us email',
  parameters: z.object({
    phoneNumber: z.string(),
    emailAddress: z.string(),
  }),
  execute: async ({ phoneNumber, emailAddress }) => {
      let msg = "Sent! We'll get back to you soon.";

      let contactInfo = [];
      if (phoneNumber) contactInfo.push(`phone number: ${phoneNumber}`);
      if (emailAddress) contactInfo.push(`email: ${emailAddress}`);

      if (contactInfo.length > 0) {
        await SendEmail("User requested to be contacted \n\n with the following details: \n" + contactInfo.join(" and "));
      }

      return msg;


  },
});

export async function SendEmail(message: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);


  const { data, error } = await resend.emails.send({
    from: 'SBSNext site <website@automated.sbsnext.com>',
    to: ['miguel@sbsnext.com', 'acostmig@gmail.com'],
    subject: 'Contact Us from SBSNext site',
    html: `<strong>${message}</strong>`,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}
