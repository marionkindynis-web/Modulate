"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/Button";
import { calculateQuote, formatQuoteAmount } from "@/lib/quote/calculate";
import { quoteConfig, type QuoteSelection } from "@/lib/quote/config";

type QuoteKey = Parameters<ReturnType<typeof useTranslations<"Quote">>>[0];

const fieldClass =
  "mt-2 h-12 w-full rounded-md border border-line bg-surface px-4 text-base text-copy placeholder:text-muted";

type Status = "idle" | "submitting" | "success" | "dry-run" | "error";

export function QuoteBuilder() {
  const t = useTranslations("Quote");
  const locale = useLocale();
  const [stepIndex, setStepIndex] = useState(0);
  const [selection, setSelection] = useState<QuoteSelection>({});
  const [status, setStatus] = useState<Status>("idle");
  const totalSteps = quoteConfig.steps.length + 1;
  const isContactStep = stepIndex >= quoteConfig.steps.length;
  const currentStep = quoteConfig.steps[stepIndex];
  const result = calculateQuote(selection);

  function selectOption(stepId: string, optionId: string) {
    setSelection((current) => ({ ...current, [stepId]: optionId }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("submitting");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, selection }),
      });
      const payload = (await response.json()) as { ok?: boolean; dryRun?: boolean };
      if (!response.ok || !payload.ok) {
        setStatus("error");
        return;
      }
      setStatus(payload.dryRun ? "dry-run" : "success");
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
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <p className="text-sm text-muted">
          {t("progress", { current: stepIndex + 1, total: totalSteps })}
        </p>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-line">
          <div
            className="brand-gradient h-full transition-[width] duration-300 ease-out"
            style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
          />
        </div>

        {!isContactStep && currentStep ? (
          <div className="mt-8">
            <h2 className="font-display text-[28px] leading-9 md:text-[36px] md:leading-11">
              {t(`steps.${currentStep.id}.title` as QuoteKey)}
            </h2>
            <ul className="mt-6 grid gap-3">
              {currentStep.options.map((option) => {
                const selected = selection[currentStep.id] === option.id;
                return (
                  <li key={option.id}>
                    <button
                      type="button"
                      onClick={() => selectOption(currentStep.id, option.id)}
                      aria-pressed={selected}
                      className={`w-full rounded-lg border p-6 text-left transition-colors duration-200 ${
                        selected
                          ? "border-ink bg-surface"
                          : "border-line bg-surface hover:border-ink/40"
                      }`}
                    >
                      <p className="font-display text-xl text-ink">
                        {t(`steps.${currentStep.id}.options.${option.id}.label` as QuoteKey)}
                      </p>
                      <p className="mt-2 text-copy">
                        {t(`steps.${currentStep.id}.options.${option.id}.description` as QuoteKey)}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {stepIndex > 0 ? (
                <Button type="button" variant="secondary" onClick={() => setStepIndex((value) => value - 1)}>
                  {t("back")}
                </Button>
              ) : null}
              <Button
                type="button"
                disabled={!selection[currentStep.id]}
                onClick={() => setStepIndex((value) => value + 1)}
                className="sm:ml-auto"
              >
                {t("next")}
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8" noValidate>
            <h2 className="font-display text-[28px] leading-9 md:text-[36px] md:leading-11">
              {t("contactTitle")}
            </h2>
            <p className="mt-3 text-copy">{t("contactIntro")}</p>
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">{t("name")}</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="mt-6">
              <label htmlFor="quote-name" className="text-sm font-medium text-ink">
                {t("name")}
              </label>
              <input id="quote-name" name="name" required minLength={2} className={fieldClass} />
            </div>
            <div className="mt-5">
              <label htmlFor="quote-email" className="text-sm font-medium text-ink">
                {t("email")}
              </label>
              <input
                id="quote-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={fieldClass}
              />
            </div>
            <div className="mt-5">
              <label htmlFor="quote-org" className="text-sm font-medium text-ink">
                {t("organisation")}
              </label>
              <input
                id="quote-org"
                name="organisation"
                placeholder={t("organisationPlaceholder")}
                className={fieldClass}
              />
            </div>
            <div className="mt-5">
              <label htmlFor="quote-message" className="text-sm font-medium text-ink">
                {t("message")}
              </label>
              <textarea
                id="quote-message"
                name="message"
                rows={5}
                placeholder={t("messagePlaceholder")}
                className="mt-2 w-full rounded-md border border-line bg-surface px-4 py-3 text-base text-copy placeholder:text-muted"
              />
            </div>
            {status === "error" ? (
              <p className="mt-4 text-sm text-danger" role="alert">
                {t("error")}
              </p>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button type="button" variant="secondary" onClick={() => setStepIndex(quoteConfig.steps.length - 1)}>
                {t("back")}
              </Button>
              <Button type="submit" disabled={status === "submitting"} className="sm:ml-auto">
                {status === "submitting" ? t("submitting") : t("submit")}
              </Button>
            </div>
          </form>
        )}
      </div>

      <aside className="lg:col-span-4">
        <div className="rounded-xl border border-line bg-surface p-6 lg:sticky lg:top-28">
          <p className="text-xs font-medium tracking-[0.08em] text-muted uppercase">
            {t("estimateKicker")}
          </p>
          {result.kind === "manual" ? (
            <>
              <p className="mt-4 font-display text-[28px] leading-9 text-ink">
                {t("manualTitle")}
              </p>
              <p className="mt-3">{t("manualBody")}</p>
            </>
          ) : Object.keys(selection).length === 0 ? (
            <p className="mt-4">{t("incomplete")}</p>
          ) : (
            <>
              <p className="mt-4 text-sm text-muted">{t("rangeLabel")}</p>
              <p className="mt-1 font-display text-[28px] leading-9 text-ink">
                {formatQuoteAmount(result.min, locale)} – {formatQuoteAmount(result.max, locale)}
              </p>
            </>
          )}
          <ul className="mt-6 space-y-2 border-t border-line pt-5 text-sm">
            {quoteConfig.steps.map((step) => {
              const selected = selection[step.id];
              if (!selected) return null;
              return (
                <li key={step.id} className="flex justify-between gap-3">
                  <span className="text-muted">{t(`steps.${step.id}.title` as QuoteKey)}</span>
                  <span className="text-right text-ink">
                    {t(`steps.${step.id}.options.${selected}.label` as QuoteKey)}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-sm text-muted">{t("disclaimer")}</p>
        </div>
      </aside>
    </div>
  );
}
