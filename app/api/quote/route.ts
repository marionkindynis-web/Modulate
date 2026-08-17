import { NextResponse } from "next/server";
import { calculateQuote, formatQuoteAmount } from "@/lib/quote/calculate";
import { quoteConfig } from "@/lib/quote/config";
import { escapeHtml, isMailConfigured, sendSiteEmail } from "@/lib/email";
import { quoteRequestSchema } from "@/lib/validations/contact";
import { site } from "@/lib/site";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = quoteRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, organisation, message, selection } = parsed.data;
  const result = calculateQuote(selection);
  const rangeLabel =
    result.kind === "manual"
      ? "Sur devis"
      : `${formatQuoteAmount(result.min, "fr")} – ${formatQuoteAmount(result.max, "fr")}`;

  const choices = quoteConfig.steps
    .map((step) => `${step.id}: ${selection[step.id]}`)
    .join("\n");

  const subject = `[${site.name}] Devis — ${name} (${rangeLabel})`;
  const text = [
    `Nom: ${name}`,
    `Email: ${email}`,
    `Organisation: ${organisation || "—"}`,
    `Fourchette: ${rangeLabel}`,
    "",
    "Choix:",
    choices,
    "",
    message || "",
  ].join("\n");

  const html = `
    <p><strong>Nom:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Organisation:</strong> ${escapeHtml(organisation || "—")}</p>
    <p><strong>Fourchette recalculée:</strong> ${escapeHtml(rangeLabel)}</p>
    <p><strong>Choix:</strong><br />${escapeHtml(choices).replaceAll("\n", "<br />")}</p>
    <p>${escapeHtml(message || "").replaceAll("\n", "<br />")}</p>
  `;

  if (!isMailConfigured()) {
    console.info("[quote] dry-run: SMTP is not configured");
    return NextResponse.json({ ok: true, dryRun: true, range: result });
  }

  try {
    await sendSiteEmail({ subject, text, html, replyTo: email });
    return NextResponse.json({ ok: true, range: result });
  } catch (error) {
    console.error("[quote] send failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
