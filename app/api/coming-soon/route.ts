import { NextResponse } from "next/server";
import { isSmtpReady, escapeHtml, sendSiteEmail, SmtpSendError } from "@/lib/email";
import { site } from "@/lib/site";
import { contactSchema } from "@/lib/validations/contact";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, message } = parsed.data;
  const subject = `[${site.name}] Coming soon — ${name}`;
  const text = `Nom: ${name}\nEmail: ${email}\n\n${message}`;
  const html = `
    <p><strong>Nom:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
  `;

  if (!isSmtpReady()) {
    if (process.env.NODE_ENV === "production") {
      console.error("[coming-soon] SMTP is not configured");
      return NextResponse.json({ ok: false }, { status: 503 });
    }
    console.info("[coming-soon] dry-run: SMTP is not configured");
    return NextResponse.json({ ok: true, dryRun: true });
  }

  try {
    await sendSiteEmail({
      subject,
      text,
      html,
      replyTo: email,
      to: site.comingSoonEmail,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const code = error instanceof SmtpSendError ? error.code : "UNKNOWN";
    const detail = error instanceof SmtpSendError ? error.detail : undefined;
    console.error("[coming-soon] send failed", code, detail, error);
    return NextResponse.json({ ok: false, code, detail }, { status: 500 });
  }
}
