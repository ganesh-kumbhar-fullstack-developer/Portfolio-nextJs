import { sendEmail } from "@/lib/emailConfig";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// User input is interpolated into HTML emails — escape it to prevent HTML injection.
const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(req) {
  try {
    const body = await req.json();
    const fullName = body.fullName?.trim();
    const email = body.email?.trim();
    const subject = body.subject?.trim() || "";
    const msg = body.msg?.trim();

    // Honeypot filled in → almost certainly a bot. Pretend success.
    if (body.website) {
      return Response.json({ message: "Message sent" });
    }

    if (!fullName || !email || !msg) {
      return Response.json({ error: "Name, email and message are required." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email) || fullName.length > 80 || subject.length > 120 || msg.length > 2000) {
      return Response.json({ error: "Please check the form fields and try again." }, { status: 400 });
    }

    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const safeName = escapeHtml(fullName);

    const formData = {
      Name: safeName,
      Email: escapeHtml(email),
      Subject: escapeHtml(subject) || "—",
      Message: escapeHtml(msg).replace(/\n/g, "<br/>"),
    };

    const adminEmailHTML = `
      <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden;">
          <div style="background:#0f172a; color:#ffffff; padding:15px;">
            <h2 style="margin:0;">New portfolio enquiry</h2>
          </div>
          <div style="padding:20px;">
            <table style="width:100%; border-collapse:collapse;">
              ${Object.entries(formData)
                .map(
                  ([key, value]) => `
                  <tr>
                    <td style="padding:10px; border:1px solid #ddd; font-weight:bold; background:#f9fafb; width:110px;">${key}</td>
                    <td style="padding:10px; border:1px solid #ddd;">${value}</td>
                  </tr>`,
                )
                .join("")}
            </table>
            <p style="margin-top:20px; font-size:12px; color:#666;">Received on: ${timestamp} IST</p>
          </div>
        </div>
      </div>
    `;

    const userEmailHTML = `
      <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
        <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden;">
          <div style="background:#754ef9; color:#ffffff; padding:20px;">
            <h2 style="margin:0;">Thanks for reaching out</h2>
          </div>
          <div style="padding:20px; line-height:1.6;">
            <p>Hi ${safeName},</p>
            <p>Thank you for your message through my portfolio. I've received it and will get back to you shortly.</p>
            <p style="margin-top:30px;">Best regards,<br/><strong>Ganesh Kumbhar</strong><br/>Software Engineer · gktechhub.com</p>
          </div>
          <div style="background:#f1f5f9; padding:10px; font-size:12px; color:#666; text-align:center;">
            This is an automated response.
          </div>
        </div>
      </div>
    `;

    await sendEmail({
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio enquiry from ${fullName}${subject ? ` – ${subject}` : ""}`.slice(0, 150),
      html: adminEmailHTML,
    });

    await sendEmail({
      to: email,
      subject: "Thanks for getting in touch – Ganesh Kumbhar",
      html: userEmailHTML,
    });

    return Response.json({ message: "Message sent" });
  } catch (error) {
    console.error("Contact API error:", error);
    return Response.json(
      { error: "Couldn't send your message right now. Please email ganeshhh2003@gmail.com directly." },
      { status: 500 },
    );
  }
}
