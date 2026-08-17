import {
  quoteConfig,
  type QuoteSelection,
} from "@/lib/quote/config";

export type QuoteRange = {
  kind: "range";
  min: number;
  max: number;
  currency: "CHF";
};

export type QuoteResult = QuoteRange | { kind: "manual" };

export function calculateQuote(selection: QuoteSelection): QuoteResult {
  for (const step of quoteConfig.steps) {
    const selectedId = selection[step.id];
    if (!selectedId) continue;
    const option = step.options.find((entry) => entry.id === selectedId);
    if (option?.requiresManualQuote) {
      return { kind: "manual" };
    }
  }

  let min = quoteConfig.base.min;
  let max = quoteConfig.base.max;
  let minFactor = 1;
  let maxFactor = 1;

  for (const step of quoteConfig.steps) {
    const selectedId = selection[step.id];
    if (!selectedId) continue;
    const option = step.options.find((entry) => entry.id === selectedId);
    if (!option) continue;
    min += option.minAdd ?? 0;
    max += option.maxAdd ?? 0;
    minFactor *= option.minFactor ?? 1;
    maxFactor *= option.maxFactor ?? 1;
  }

  const roundedMin = roundTo(min * minFactor, quoteConfig.roundTo);
  const roundedMax = roundTo(max * maxFactor, quoteConfig.roundTo);

  return {
    kind: "range",
    min: roundedMin,
    max: Math.max(roundedMin, roundedMax),
    currency: quoteConfig.currency,
  };
}

function roundTo(value: number, increment: number): number {
  return Math.round(value / increment) * increment;
}

export function formatQuoteAmount(value: number, locale: string): string {
  return new Intl.NumberFormat(locale === "fr" ? "fr-CH" : "en-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0,
  }).format(value);
}
