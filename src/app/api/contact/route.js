import { sendEmail, missingEmailConfig, CONTACT_INBOX } from "@/lib/emailConfig";
import { adminEnquiryEmail, visitorConfirmationEmail } from "@/lib/emailTemplates";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    const missing = missingEmailConfig();
    if (missing.length) {
      console.error(`Contact API: email is not configured. Missing env vars: ${missing.join(", ")} (see .env.example)`);
      return Response.json(
        { error: "The contact form is temporarily unavailable. Please email ganeshhh2003@gmail.com directly." },
        { status: 503 },
      );
    }

    const receivedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    await sendEmail({
      to: CONTACT_INBOX(),
      replyTo: email,
      subject: `Portfolio enquiry from ${fullName}${subject ? ` – ${subject}` : ""}`.slice(0, 150),
      html: adminEnquiryEmail({ fullName, email, subject, msg, receivedAt }),
    });

    // The enquiry is already delivered — a failed auto-reply shouldn't report failure to the visitor
    try {
      await sendEmail({
        to: email,
        subject: "Thanks for getting in touch – Ganesh Kumbhar",
        html: visitorConfirmationEmail({ fullName, subject, msg }),
      });
    } catch (error) {
      console.error("Contact API: auto-reply failed:", error);
    }

    return Response.json({ message: "Message sent" });
  } catch (error) {
    console.error("Contact API error:", error);
    return Response.json(
      { error: "Couldn't send your message right now. Please email ganeshhh2003@gmail.com directly." },
      { status: 500 },
    );
  }
}
