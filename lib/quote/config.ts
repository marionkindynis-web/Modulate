export type QuoteOption = {
  id: string;
  minAdd?: number;
  maxAdd?: number;
  minFactor?: number;
  maxFactor?: number;
  requiresManualQuote?: boolean;
};

export type QuoteStep = {
  id: string;
  options: QuoteOption[];
};

export type QuoteConfig = {
  currency: "CHF";
  roundTo: number;
  base: { min: number; max: number };
  steps: QuoteStep[];
};

export const quoteConfig: QuoteConfig = {
  currency: "CHF",
  roundTo: 100,
  base: { min: 4000, max: 6000 },
  steps: [
    {
      id: "object",
      options: [
        { id: "process", minAdd: 3000, maxAdd: 5000 },
        { id: "tools", minAdd: 4000, maxAdd: 8000 },
        { id: "organisation", minAdd: 5000, maxAdd: 9000 },
        { id: "digital", minAdd: 3500, maxAdd: 7000 },
      ],
    },
    {
      id: "scope",
      options: [
        { id: "flow", minAdd: 0, maxAdd: 1000 },
        { id: "team", minAdd: 2500, maxAdd: 5000 },
        { id: "org", minAdd: 6000, maxAdd: 12000 },
      ],
    },
    {
      id: "maturity",
      options: [
        { id: "structured", minAdd: 0, maxAdd: 500 },
        { id: "partial", minAdd: 1000, maxAdd: 2500 },
        { id: "build", minAdd: 2500, maxAdd: 5000 },
      ],
    },
    {
      id: "timeline",
      options: [
        { id: "flexible", minFactor: 1, maxFactor: 1 },
        { id: "standard", minFactor: 1, maxFactor: 1.15 },
        { id: "urgent", requiresManualQuote: true },
      ],
    },
  ],
};

export type QuoteSelection = Record<string, string>;

export function isCompleteSelection(selection: QuoteSelection): boolean {
  return quoteConfig.steps.every((step) => Boolean(selection[step.id]));
}
