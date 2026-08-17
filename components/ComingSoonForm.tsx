"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export function ComingSoonForm() {
  const t = useTranslations("ComingSoon");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "dry-run" | "error"
  >("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("submitting");

    try {
      const response = await fetch("/api/coming-soon", {
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

  return (
    <div className="relative overflow-hidden rounded-lg bg-ink p-8 md:p-9">
      <span className="brand-gradient absolute inset-x-0 top-0 h-0.5" aria-hidden />
      {status === "success" || status === "dry-run" ? (
        <div className="py-8 text-center">
          <p className="font-display text-xl text-white">{t("successTitle")}</p>
          <p className="mt-3 text-[#d4d3cc]">{t("successBody")}</p>
          {status === "dry-run" ? (
            <p className="mt-3 text-sm text-white/50">{t("dryRun")}</p>
          ) : null}
        </div>
      ) : (
        <form onSubmit={onSubmit} className="relative" noValidate>
          <div className="sr-only">
            <label htmlFor="coming-soon-website">{t("honeypot")}</label>
            <input
              id="coming-soon-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          <h2 className="font-display text-xl text-white">{t("formTitle")}</h2>
          <p className="mt-2 mb-7 text-sm leading-6 text-[#d4d3cc]">{t("formLead")}</p>
          <div>
            <label
              htmlFor="coming-soon-name"
              className="mb-2 block text-[11px] font-medium tracking-[0.1em] text-[#c9c8c1] uppercase"
            >
              {t("name")}
            </label>
            <input
              id="coming-soon-name"
              name="name"
              type="text"
              required
              minLength={2}
              autoComplete="name"
              placeholder={t("namePlaceholder")}
              className="coming-soon-field"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="coming-soon-email"
              className="mb-2 block text-[11px] font-medium tracking-[0.1em] text-[#c9c8c1] uppercase"
            >
              {t("email")}
            </label>
            <input
              id="coming-soon-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
              className="coming-soon-field"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="coming-soon-message"
              className="mb-2 block text-[11px] font-medium tracking-[0.1em] text-[#c9c8c1] uppercase"
            >
              {t("message")}
            </label>
            <textarea
              id="coming-soon-message"
              name="message"
              required
              minLength={10}
              rows={5}
              placeholder={t("messagePlaceholder")}
              className="coming-soon-field min-h-[110px] resize-y"
            />
          </div>
          {status === "error" ? (
            <p className="mt-4 text-sm text-[#f0b4b4]" role="alert">
              {t("error")}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded bg-white px-6 text-sm font-medium text-ink transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
          >
            {status === "submitting" ? t("submitting") : t("submit")}
          </button>
          <p className="mt-4 text-[13px] leading-5 text-white/40">{t("note")}</p>
        </form>
      )}
    </div>
  );
}
