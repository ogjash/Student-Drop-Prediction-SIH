import { sendEmail } from "../config/email.service.js";

export const email=async(req,res)=>{
  try {
    const { to, subject,html } = req.body;
    if (!to || !subject || !html) {
      return res.status(400).json({ error: "Invalid payload" });
    }
    const result = await sendEmail({ to, subject, text, html });
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: "Email failed", detail: String(e) });
  }
};
