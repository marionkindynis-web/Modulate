import nodemailer from "nodemailer";

type MailPayload = {
  subject: string;
  text: string;
  html: string;
  replyTo: string;
};

function getSmtpConfig() {
  const host = process.env.SMTP_HOST ?? "mail.infomaniak.com";
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.SMTP_FROM ?? user;
  const secure = process.env.SMTP_SECURE !== "false";

  return { host, port, user, pass, to, from, secure };
}

export function isSmtpReady(): boolean {
  const { user, pass } = getSmtpConfig();
  return Boolean(user && pass);
}

export function isMailConfigured(): boolean {
  const { to } = getSmtpConfig();
  return isSmtpReady() && Boolean(to);
}

export async function sendSiteEmail(payload: MailPayload & { to?: string }): Promise<void> {
  const { host, port, user, pass, to, from, secure } = getSmtpConfig();
  const recipient = payload.to ?? to;

  if (!user || !pass || !from || !recipient) {
    throw new Error("SMTP is not configured");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to: recipient,
    replyTo: payload.replyTo,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  });
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
