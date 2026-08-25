"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/Button";

const fieldClass =
  "mt-2 h-12 w-full rounded-md border border-line bg-surface px-4 text-base text-copy placeholder:text-muted";

export function ContactForm() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "dry-run" | "error">(
    "idle",
  );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await response.json()) as { ok?: boolean; dryRun?: boolean };
      if (!response.ok || !payload.ok) {
        setStatus("error");
        return;
      }
      setStatus(payload.dryRun ? "dry-run" : "success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success" || status === "dry-run") {
    return (
      <div className="rounded-xl border border-line bg-surface p-8">
        <h2 className="font-display text-[28px] leading-9">{t("successTitle")}</h2>
        <p className="mt-3">{t("successBody")}</p>
        {status === "dry-run" ? (
          <p className="mt-3 text-sm text-muted">{t("dryRun")}</p>
        ) : null}
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative rounded-xl border border-line bg-surface p-6 md:p-8"
      noValidate
    >
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">{t("honeypot")}</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink">
          {t("name")}
        </label>
        <input id="name" name="name" type="text" required minLength={2} className={fieldClass} />
      </div>
      <div className="mt-5">
        <label htmlFor="email" className="text-sm font-medium text-ink">
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="nom@entreprise.ch"
          className={fieldClass}
        />
      </div>
      <div className="mt-5">
        <label htmlFor="message" className="text-sm font-medium text-ink">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={6}
          placeholder={t("messagePlaceholder")}
          className="mt-2 w-full rounded-md border border-line bg-surface px-4 py-3 text-base text-copy placeholder:text-muted"
        />
      </div>
      {status === "error" ? (
        <p className="mt-4 text-sm text-danger" role="alert">
          {t("error")}
        </p>
      ) : null}
      <div className="mt-6">
        <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? t("submitting") : t("submit")}
        </Button>
      </div>
    </form>
  );
}
