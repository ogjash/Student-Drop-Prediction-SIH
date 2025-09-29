import nodemailer from "nodemailer";

export function createMailer() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
   });
  return transporter;
}
