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

type SmtpAttempt = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
};

export class SmtpSendError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "SmtpSendError";
    this.code = code;
  }
}

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

function smtpFileCandidates(): string[] {
  return [
    join(process.cwd(), ".env"),
    join(process.cwd(), ".env.local"),
    join(process.cwd(), ".env.production"),
    join(homedir(), ".env.local"),
    join(process.cwd(), "smtp.env"),
    join(homedir(), "smtp.env"),
    join(homedir(), "sites/modulate.ch/smtp.env"),
    "/srv/customer/smtp.env",
    "/srv/customer/sites/modulate.ch/smtp.env",
  ];
}

function loadFileEnv(): Record<string, string> {
  const merged: Record<string, string> = {};
  const loaded: string[] = [];

  for (const filePath of smtpFileCandidates()) {
    if (!existsSync(filePath)) continue;
    Object.assign(merged, parseEnvFile(readFileSync(filePath, "utf8")));
    loaded.push(filePath);
  }

  if (loaded.length > 0) {
    console.info("[email] loaded", loaded.join(", "));
  }

  return merged;
}

function envValue(name: string, fileEnv: Record<string, string>): string | undefined {
  const value = (fileEnv[name] ?? process.env[name])?.trim();
  return value ? value : undefined;
}

function getSmtpConfig() {
  const fileEnv = loadFileEnv();
  const host = envValue("SMTP_HOST", fileEnv) ?? "mail.infomaniak.com";
  const port = Number(envValue("SMTP_PORT", fileEnv) ?? 587);
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

function smtpErrorCode(error: unknown): string {
  if (error instanceof SmtpSendError) return error.code;
  if (error && typeof error === "object" && "code" in error && error.code) {
    return String(error.code);
  }
  if (error instanceof Error && error.message) {
    const match = error.message.match(/\b(EAUTH|ECONNECTION|ETIMEDOUT|EDNS|EENVELOPE|ETLS)\b/);
    if (match) return match[1];
  }
  return "UNKNOWN";
}

async function sendWithAttempt(
  attempt: SmtpAttempt,
  mail: {
    from: string;
    to: string;
    replyTo: string;
    subject: string;
    text: string;
    html: string;
  },
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: attempt.host,
    port: attempt.port,
    secure: attempt.secure,
    requireTLS: !attempt.secure,
    auth: { user: attempt.user, pass: attempt.pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  await transporter.sendMail(mail);
}

export async function sendSiteEmail(payload: MailPayload & { to?: string }): Promise<void> {
  const { host, port, user, pass, to, from, secure } = getSmtpConfig();
  const recipient = payload.to ?? to;

  if (!user || !pass || !from || !recipient) {
    throw new SmtpSendError("NOT_CONFIGURED", "SMTP is not configured");
  }

  const mail = {
    from: `"Modulate" <${from}>`,
    to: recipient,
    replyTo: payload.replyTo,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  };

  const attempts: SmtpAttempt[] = [
    { host, port, secure, user, pass },
    { host, port: 587, secure: false, user, pass },
    { host, port: 465, secure: true, user, pass },
  ].filter(
    (attempt, index, list) =>
      list.findIndex((item) => item.port === attempt.port && item.secure === attempt.secure) ===
      index,
  );

  let lastError: unknown;
  for (const attempt of attempts) {
    try {
      await sendWithAttempt(attempt, mail);
      console.info("[email] sent via port", attempt.port);
      return;
    } catch (error) {
      lastError = error;
      console.error("[email] failed on port", attempt.port, smtpErrorCode(error));
    }
  }

  throw new SmtpSendError(smtpErrorCode(lastError), "SMTP send failed");
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
