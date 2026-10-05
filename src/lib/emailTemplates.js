import { SITE_URL, RESUME_PATH, profile, socials } from "@/data/portfolio";

// Email clients ignore <style> blocks and flexbox — everything here is tables + inline styles.

// User input is interpolated into HTML emails — escape it to prevent HTML injection.
export const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const multiline = (value) => escapeHtml(value).replace(/\r?\n/g, "<br/>");

const C = {
  page: "#eef1f4",
  card: "#ffffff",
  head: "#05070a",
  headLine: "#1a2430",
  accent: "#3dfc9a",
  accentDark: "#11804a",
  ink: "#0f172a",
  body: "#334155",
  muted: "#64748b",
  line: "#e2e8f0",
  soft: "#f8fafc",
};

const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const MONO = "'SFMono-Regular',Menlo,Consolas,'Liberation Mono',monospace";

// Web links open in a new tab; mailto:/tel: links are left alone
const NEW_TAB = 'target="_blank" rel="noopener noreferrer"';

function button(href, label, primary = true) {
  const style = primary
    ? `background:${C.head};color:${C.accent};border:1px solid ${C.head};`
    : `background:${C.card};color:${C.ink};border:1px solid ${C.line};`;
  return `<a href="${href}" ${href.startsWith("http") ? NEW_TAB : ""} style="${style}display:inline-block;margin:0 8px 10px 0;padding:12px 20px;border-radius:8px;white-space:nowrap;font-family:${MONO};font-size:13px;font-weight:700;text-decoration:none;">${label}</a>`;
}

// Shared shell: hidden preheader, dark terminal header, white card, footer
function layout({ preheader, command, title, body, footer }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:${C.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.page};">
  <tr><td align="center" style="padding:32px 12px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${C.card};border-radius:14px;overflow:hidden;border:1px solid ${C.line};">
      <tr><td style="background:${C.head};padding:22px 28px;border-bottom:3px solid ${C.accent};">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td valign="middle" width="44">
            <div style="width:40px;height:40px;line-height:40px;border-radius:9px;border:1px solid #1f5c3f;background:#0a0e13;text-align:center;font-family:${MONO};font-size:17px;font-weight:800;color:${C.accent};">gk</div>
          </td>
          <td valign="middle" style="padding-left:12px;">
            <div style="font-family:${SANS};font-size:15px;font-weight:700;color:#ffffff;">${profile.name}</div>
            <div style="font-family:${MONO};font-size:11px;color:#8798a8;">${profile.title} · gktechhub.com</div>
          </td>
        </tr></table>
        <div style="margin-top:18px;font-family:${MONO};font-size:12px;color:#8798a8;">
          <span style="color:${C.accent};">guest@ganesh-os</span>:<span style="color:#5cd6ff;">~</span>$ <span style="white-space:nowrap;">${command}</span>
        </div>
        <div style="margin-top:6px;font-family:${SANS};font-size:24px;line-height:1.3;font-weight:700;color:#ffffff;">${title}</div>
      </td></tr>
      <tr><td style="padding:28px;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.body};">
        ${body}
      </td></tr>
      <tr><td style="background:${C.soft};border-top:1px solid ${C.line};padding:18px 28px;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.muted};">
        ${footer}
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function detailRow(label, value) {
  return `<tr>
    <td valign="top" style="padding:10px 0;border-bottom:1px solid ${C.line};width:96px;font-family:${MONO};font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:${C.muted};">${label}</td>
    <td valign="top" style="padding:10px 0;border-bottom:1px solid ${C.line};font-family:${SANS};font-size:15px;color:${C.ink};">${value}</td>
  </tr>`;
}

function messageBlock(msg) {
  return `<div style="background:${C.soft};border:1px solid ${C.line};border-left:3px solid ${C.accent};border-radius:8px;padding:16px 18px;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.ink};">${multiline(msg)}</div>`;
}

// The enquiry delivered to my inbox
export function adminEnquiryEmail({ fullName, email, subject, msg, receivedAt }) {
  const name = escapeHtml(fullName);
  const safeEmail = escapeHtml(email);
  const replySubject = encodeURIComponent(`Re: ${subject || "Your message on gktechhub.com"}`);

  const body = `
    <p style="margin:0 0 20px;">You have a new message from the contact form on your portfolio.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${detailRow("From", `<strong>${name}</strong>`)}
      ${detailRow("Email", `<a href="mailto:${safeEmail}" style="color:${C.accentDark};text-decoration:none;font-weight:600;">${safeEmail}</a>`)}
      ${detailRow("Subject", subject ? escapeHtml(subject) : `<span style="color:${C.muted};">(no subject)</span>`)}
      ${detailRow("Received", `${escapeHtml(receivedAt)} IST`)}
    </table>
    <div style="margin:0 0 8px;font-family:${MONO};font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:${C.muted};">Message</div>
    ${messageBlock(msg)}
    <div style="margin-top:26px;">${button(`mailto:${safeEmail}?subject=${replySubject}`, `Reply to ${escapeHtml(fullName.split(" ")[0])} →`)}</div>
    <p style="margin:4px 0 0;font-size:13px;color:${C.muted};">Or just hit reply — this email's Reply-To is set to the sender.</p>`;

  return layout({
    preheader: `${escapeHtml(fullName)}: ${escapeHtml(msg.slice(0, 90))}`,
    command: "./inbox --new",
    title: "New portfolio enquiry",
    body,
    footer: `Sent by the contact form on <a href="${SITE_URL}" ${NEW_TAB} style="color:${C.muted};">gktechhub.com</a>. The sender received an automatic confirmation.`,
  });
}

// The confirmation the visitor receives
export function visitorConfirmationEmail({ fullName, subject, msg }) {
  const firstName = escapeHtml(fullName.split(" ")[0]);
  const socialLinks = socials
    .map((s) => `<a href="${s.href}" ${NEW_TAB} style="color:${C.ink};font-weight:600;text-decoration:none;">${s.name}</a>`)
    .join(`<span style="color:#cbd5e1;">&nbsp;&nbsp;·&nbsp;&nbsp;</span>`);

  const body = `
    <p style="margin:0 0 16px;font-size:17px;color:${C.ink};">Hi ${firstName},</p>
    <p style="margin:0 0 16px;">Thanks for reaching out through my portfolio — your message landed safely in my inbox. I read every one personally and usually reply within <strong style="color:${C.ink};">24 hours</strong>.</p>
    <p style="margin:0 0 24px;">If it's urgent, call or WhatsApp me at <a href="${profile.phoneHref}" style="color:${C.accentDark};font-weight:700;text-decoration:none;white-space:nowrap;">${profile.phone}</a>, or simply reply to this email.</p>
    <div style="margin:0 0 8px;font-family:${MONO};font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:${C.muted};">Your message${subject ? ` · ${escapeHtml(subject)}` : ""}</div>
    ${messageBlock(msg)}
    <p style="margin:28px 0 14px;">While you wait, here's a bit more about my work:</p>
    <div>${button(SITE_URL, "View portfolio →")}${button(`${SITE_URL}${RESUME_PATH}`, "Download resume", false)}</div>
    <p style="margin:16px 0 0;">Best regards,</p>
    <p style="margin:2px 0 0;font-weight:700;color:${C.ink};">${profile.name}</p>
    <p style="margin:0;font-size:13px;color:${C.muted};">${profile.title} · ${profile.focus}<br/>${profile.location}</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:14px;font-size:14px;">
      <tr>
        <td style="padding:3px 12px 3px 0;font-family:${MONO};font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:${C.muted};">Phone</td>
        <td style="padding:3px 0;"><a href="${profile.phoneHref}" style="color:${C.ink};font-weight:600;text-decoration:none;white-space:nowrap;">${profile.phone}</a>
          <span style="color:#cbd5e1;">&nbsp;·&nbsp;</span><a href="https://wa.me/${profile.whatsapp}" ${NEW_TAB} style="color:${C.accentDark};font-weight:600;text-decoration:none;">WhatsApp</a></td>
      </tr>
      <tr>
        <td style="padding:3px 12px 3px 0;font-family:${MONO};font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:${C.muted};">Email</td>
        <td style="padding:3px 0;"><a href="mailto:${profile.email}" style="color:${C.ink};font-weight:600;text-decoration:none;">${profile.email}</a></td>
      </tr>
    </table>`;

  return layout({
    preheader: "Got your message — I'll get back to you within 24 hours.",
    command: "./send_message.sh --status",
    title: "Message received ✓",
    body,
    footer: `${socialLinks}<br/><span style="display:inline-block;margin-top:8px;">You're receiving this because you used the contact form on <a href="${SITE_URL}" ${NEW_TAB} style="color:${C.muted};">gktechhub.com</a>. This is a one-time confirmation — no mailing lists.</span>`,
  });
}
