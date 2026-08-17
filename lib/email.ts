import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import nodemailer from "nodemailer";

type MailPayload = {
  subject: string;
  text: string;
  html: string;
  replyTo: string;
};

function parseEnvFile(text: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const separator = line.indexOf("=");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    let value = line.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  }
  return result;
}

function loadFileEnv(): Record<string, string> {
  const merged: Record<string, string> = {};
  const candidates = [
    join(process.cwd(), "smtp.env"),
    join(process.cwd(), ".env.local"),
    join(process.cwd(), ".env"),
    join(homedir(), "smtp.env"),
    join(homedir(), "sites/modulate.ch/smtp.env"),
    "/srv/customer/smtp.env",
  ];

  for (const filePath of candidates) {
    if (!existsSync(filePath)) continue;
    Object.assign(merged, parseEnvFile(readFileSync(filePath, "utf8")));
  }

  return merged;
}

function envValue(name: string, fileEnv: Record<string, string>): string | undefined {
  const value = (process.env[name] ?? fileEnv[name])?.trim();
  return value ? value : undefined;
}

function getSmtpConfig() {
  const fileEnv = loadFileEnv();
  const host = envValue("SMTP_HOST", fileEnv) ?? "mail.infomaniak.com";
  const port = Number(envValue("SMTP_PORT", fileEnv) ?? 465);
  const user = envValue("SMTP_USER", fileEnv);
  const pass = envValue("SMTP_PASS", fileEnv);
  const to = envValue("CONTACT_TO_EMAIL", fileEnv);
  const from = envValue("SMTP_FROM", fileEnv) ?? user;
  const secureFlag = envValue("SMTP_SECURE", fileEnv);
  const secure =
    secureFlag === "true" ? true : secureFlag === "false" ? false : port === 465;

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
    requireTLS: !secure && port === 587,
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
