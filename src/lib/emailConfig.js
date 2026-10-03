import nodemailer from "nodemailer";

const REQUIRED_ENV = ["EMAIL_USER", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "GOOGLE_REFRESH_TOKEN"];

// Names of the Gmail OAuth2 env vars that are not set (see .env.example)
export function missingEmailConfig() {
  return REQUIRED_ENV.filter((key) => !process.env[key]);
}

// Where portfolio enquiries are delivered — defaults to the sending account
export const CONTACT_INBOX = () => process.env.CONTACT_TO || process.env.EMAIL_USER;

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