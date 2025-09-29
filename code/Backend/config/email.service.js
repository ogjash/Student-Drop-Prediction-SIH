import { createMailer } from "./mailer.js";
const transporter = createMailer();

export async function sendEmail({ to, subject, text, html }) {
  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    text,
    html,
  });
  return { messageId: info.messageId, response: info.response };
}
