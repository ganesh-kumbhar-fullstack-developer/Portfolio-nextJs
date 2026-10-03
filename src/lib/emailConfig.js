import nodemailer from "nodemailer";

export async function sendEmail({ to, subject, html, replyTo }) {
  try {
    // Safety check
    if (!to) {
      throw new Error("Recipient email is missing");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      },
    });

    const info = await transporter.sendMail({
      from: `"Ganesh Kumbhar" <${process.env.EMAIL_USER}>`,
      to,
      replyTo,
      subject,
      html,
    });

    return info;

  } catch (error) {
    console.error("❌ Email error:", error);
    throw error;
  }
}