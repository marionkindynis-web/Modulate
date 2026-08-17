import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { escapeHtml, isMailConfigured, sendSiteEmail } from "@/lib/email";
import { site } from "@/lib/site";

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
  const subject = `[${site.name}] Contact — ${name}`;
  const text = `Nom: ${name}\nEmail: ${email}\n\n${message}`;
  const html = `
    <p><strong>Nom:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
  `;

  if (!isMailConfigured()) {
    console.info("[contact] dry-run: SMTP is not configured");
    return NextResponse.json({ ok: true, dryRun: true });
  }

  try {
    await sendSiteEmail({ subject, text, html, replyTo: email });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] send failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
