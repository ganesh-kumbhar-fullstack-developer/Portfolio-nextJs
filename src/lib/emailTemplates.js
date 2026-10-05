import { SITE_URL, RESUME_PATH, profile, socials } from "@/data/portfolio";

// Email-safe markup: tables + inline styles. The layout is fluid like a responsive site — the card fills the
// reading pane up to MAX_WIDTH and columns are percentage widths with a min-width, so they sit side by side on
// wide screens and wrap on narrow ones even where media queries are stripped. The <style> block refines phones
// in clients that support it; the [if mso] tables give Outlook desktop a fixed layout.

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

const MAX_WIDTH = 1040; // like a site container: fluid up to this width
const OUTLOOK_WIDTH = 760; // Outlook desktop ignores max-width, so it gets a fixed width
const PAD = 44; // card side padding on desktop (20px on phones)

// Web links open in a new tab; mailto:/tel: links are left alone
const NEW_TAB = 'target="_blank" rel="noopener noreferrer"';

const LABEL = `font-family:${MONO};font-size:11px;line-height:1.4;text-transform:uppercase;letter-spacing:.06em;color:${C.muted};`;

function button(href, label, { primary = true, block = false } = {}) {
  const colors = primary
    ? `background:${C.head};color:${C.accent};border:1px solid ${C.head};`
    : `background:${C.card};color:${C.ink};border:1px solid #cbd5e1;`;
  const shape = block
    ? "display:block;text-align:center;margin:0 0 10px;"
    : "display:inline-block;margin:0 8px 10px 0;";
  return `<a href="${href}" ${href.startsWith("http") ? NEW_TAB : ""} class="${block ? "" : "btn"}" style="${colors}${shape}padding:12px 20px;border-radius:8px;white-space:nowrap;font-family:${MONO};font-size:13px;line-height:1.3;font-weight:700;text-decoration:none;">${label}</a>`;
}

// Fluid row of columns: `width` is a percentage, `min` the px width below which a column wraps onto its own line.
function grid(cells, gap = 28) {
  const items = cells
    .map(({ html, width, min }, i) => {
      const last = i === cells.length - 1;
      return `<!--[if mso]><td width="${width}%" valign="top"><![endif]-->
<div class="col" style="display:inline-block;vertical-align:top;width:${width}%;min-width:${min}px;font-size:15px;line-height:1.65;"><div class="col-gap" style="padding:0 ${last ? 0 : gap}px ${last ? 0 : 18}px 0;">${html}</div></div>
<!--[if mso]></td><![endif]-->`;
    })
    .join("");
  return `<div style="font-size:0;line-height:0;">
<!--[if mso]><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><![endif]-->
${items}
<!--[if mso]></tr></table><![endif]-->
</div>`;
}

// Shared shell: hidden preheader, dark terminal header, white card, footer
function layout({ preheader, command, title, status, body, footer }) {
  return `<!doctype html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${title}</title>
<style>
  body { margin:0 !important; padding:0 !important; width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
  a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; }
  @media only screen and (max-width:640px) {
    .wrap { padding:12px 8px !important; }
    .pad { padding-left:20px !important; padding-right:20px !important; }
    .col { display:block !important; width:100% !important; min-width:0 !important; }
    .col-gap { padding-right:0 !important; padding-bottom:18px !important; }
    .title { font-size:21px !important; }
    .status { display:none !important; }
    .btn { display:block !important; text-align:center !important; margin-right:0 !important; }
  }
</style>
<!--[if mso]><style>body, table, td, div, p, a { font-family:Arial, sans-serif !important; }</style><![endif]-->
</head>
<body style="margin:0;padding:0;background:${C.page};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${preheader}&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.page};">
  <tr><td class="wrap" align="center" style="padding:32px 16px;">
    <!--[if mso]><table role="presentation" width="${OUTLOOK_WIDTH}" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:${MAX_WIDTH}px;background:${C.card};border-radius:14px;overflow:hidden;border:1px solid ${C.line};">
      <tr><td class="pad" style="background:${C.head};padding:24px ${PAD}px;border-bottom:3px solid ${C.accent};">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td valign="middle" width="44" style="width:44px;">
            <div style="width:40px;height:40px;line-height:40px;border-radius:9px;border:1px solid #1f5c3f;background:#0a0e13;text-align:center;font-family:${MONO};font-size:17px;font-weight:800;color:${C.accent};">gk</div>
          </td>
          <td valign="middle" style="padding-left:12px;">
            <div style="font-family:${SANS};font-size:15px;line-height:1.3;font-weight:700;color:#ffffff;">${profile.name}</div>
            <div style="font-family:${MONO};font-size:11px;line-height:1.4;color:#8798a8;">${profile.title} · gktechhub.com</div>
          </td>
        </tr></table>
        <div style="margin-top:20px;font-family:${MONO};font-size:12px;line-height:1.5;color:#8798a8;">
          <span style="color:${C.accent};">guest@ganesh-os</span>:<span style="color:#5cd6ff;">~</span>$ <span style="white-space:nowrap;">${command}</span><span class="status" style="white-space:nowrap;color:${C.accent};">&nbsp;&nbsp;● ${status}</span>
        </div>
        <div class="title" style="margin-top:6px;font-family:${SANS};font-size:26px;line-height:1.25;font-weight:700;color:#ffffff;">${title}</div>
      </td></tr>
      <tr><td class="pad" style="padding:30px ${PAD}px;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.body};">
        ${body}
      </td></tr>
      <tr><td class="pad" style="background:${C.soft};border-top:1px solid ${C.line};padding:18px ${PAD}px;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.muted};">
        ${footer}
      </td></tr>
    </table>
    <!--[if mso]></td></tr></table><![endif]-->
  </td></tr>
</table>
</body>
</html>`;
}

function field(label, value) {
  return `<div style="padding:10px 0;border-bottom:1px solid ${C.line};">
    <div style="${LABEL}">${label}</div>
    <div style="margin-top:3px;font-family:${SANS};font-size:15px;line-height:1.5;color:${C.ink};word-break:break-word;">${value}</div>
  </div>`;
}

function messageBlock(msg) {
  return `<div style="background:${C.soft};border:1px solid ${C.line};border-left:3px solid ${C.accent};border-radius:8px;padding:16px 18px;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.ink};word-break:break-word;">${multiline(msg)}</div>`;
}

// The enquiry delivered to my inbox
export function adminEnquiryEmail({ fullName, email, subject, msg, receivedAt }) {
  const safeEmail = escapeHtml(email);
  const replySubject = encodeURIComponent(`Re: ${subject || "Your message on gktechhub.com"}`);

  // Four across on desktop, wrapping to 2×2 or a single column as the screen narrows
  const details = grid(
    [
      ["From", `<strong>${escapeHtml(fullName)}</strong>`],
      ["Email", `<a href="mailto:${safeEmail}" style="color:${C.accentDark};text-decoration:none;font-weight:600;">${safeEmail}</a>`],
      ["Subject", subject ? escapeHtml(subject) : `<span style="color:${C.muted};">(no subject)</span>`],
      ["Received", `${escapeHtml(receivedAt)} IST`],
    ].map(([label, value]) => ({ html: field(label, value), width: 25, min: 150 })),
    20,
  );

  const body = `
    <p style="margin:0 0 14px;">You have a new message from the contact form on your portfolio.</p>
    ${details}
    <div style="margin:26px 0 8px;${LABEL}">Message</div>
    ${messageBlock(msg)}
    <div style="margin-top:24px;">${button(`mailto:${safeEmail}?subject=${replySubject}`, `Reply to ${escapeHtml(fullName.split(" ")[0])} →`)}</div>
    <p style="margin:4px 0 0;font-size:13px;color:${C.muted};">Or just hit reply — this email's Reply-To is set to the sender.</p>`;

  return layout({
    preheader: `${escapeHtml(fullName)}: ${escapeHtml(msg.slice(0, 90))}`,
    command: "./inbox --new",
    title: "New portfolio enquiry",
    status: "new message",
    body,
    footer: `Sent by the contact form on <a href="${SITE_URL}" ${NEW_TAB} style="color:${C.muted};">gktechhub.com</a>. The sender received an automatic confirmation.`,
  });
}

// The confirmation the visitor receives
export function visitorConfirmationEmail({ fullName, subject, msg }) {
  const firstName = escapeHtml(fullName.split(" ")[0]);
  const link = (href, label, color = C.ink) =>
    `<a href="${href}" ${href.startsWith("http") ? NEW_TAB : ""} style="color:${color};font-weight:600;text-decoration:none;white-space:nowrap;">${label}</a>`;
  const socialLinks = socials
    .map((s) => link(s.href, s.name))
    .join(`<span style="color:#cbd5e1;">&nbsp;&nbsp;·&nbsp;&nbsp;</span>`);

  const yourMessage = `
    <div style="margin:0 0 8px;${LABEL}">Your message${subject ? ` · ${escapeHtml(subject)}` : ""}</div>
    ${messageBlock(msg)}`;

  const contactCard = `
    <div style="border:1px solid ${C.line};border-radius:10px;padding:16px 18px 8px;">
      <div style="${LABEL}">Reach me directly</div>
      <div style="margin-top:10px;font-family:${SANS};font-size:14px;line-height:1.5;">
        <div style="color:${C.muted};font-size:12px;">Phone</div>
        <div>${link(profile.phoneHref, profile.phone)}&nbsp;&nbsp;${link(`https://wa.me/${profile.whatsapp}`, "WhatsApp", C.accentDark)}</div>
        <div style="margin-top:10px;color:${C.muted};font-size:12px;">Email</div>
        <div style="word-break:break-all;">${link(`mailto:${profile.email}`, profile.email)}</div>
      </div>
      <div style="margin-top:16px;">
        ${button(SITE_URL, "View portfolio →", { block: true })}
        ${button(`${SITE_URL}${RESUME_PATH}`, "Download resume", { primary: false, block: true })}
      </div>
    </div>`;

  const body = `
    <p style="margin:0 0 14px;font-size:17px;color:${C.ink};">Hi ${firstName},</p>
    <p style="margin:0 0 14px;">Thanks for reaching out through my portfolio — your message landed safely in my inbox. I read every one personally and usually reply within <strong style="color:${C.ink};">24 hours</strong>.</p>
    <p style="margin:0 0 26px;">If it's urgent, call or WhatsApp me at <a href="${profile.phoneHref}" style="color:${C.accentDark};font-weight:700;text-decoration:none;white-space:nowrap;">${profile.phone}</a>, or simply reply to this email.</p>
    ${grid([
      { html: yourMessage, width: 62, min: 300 },
      { html: contactCard, width: 38, min: 240 },
    ])}
    <p style="margin:28px 0 0;">Best regards,</p>
    <p style="margin:2px 0 0;font-weight:700;color:${C.ink};">${profile.name}</p>
    <p style="margin:0;font-size:13px;color:${C.muted};">${profile.title} · ${profile.focus} · ${profile.location}</p>`;

  return layout({
    preheader: "Got your message — I'll get back to you within 24 hours.",
    command: "./send_message.sh --status",
    title: "Message received ✓",
    status: "delivered",
    body,
    footer: `${socialLinks}<br/><span style="display:inline-block;margin-top:8px;">You're receiving this because you used the contact form on <a href="${SITE_URL}" ${NEW_TAB} style="color:${C.muted};">gktechhub.com</a>. This is a one-time confirmation — no mailing lists.</span>`,
  });
}
