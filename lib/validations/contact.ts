import { z } from "zod";
import { quoteConfig } from "@/lib/quote/config";

const honeypot = z.string().optional();

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email(),
  message: z.string().trim().min(10).max(4000),
  website: honeypot,
});

export type ContactInput = z.infer<typeof contactSchema>;

const selectionSchema = z
  .record(z.string(), z.string())
  .refine(
    (selection) =>
      quoteConfig.steps.every((step) => {
        const value = selection[step.id];
        return (
          typeof value === "string" &&
          step.options.some((option) => option.id === value)
        );
      }),
    { message: "Incomplete or invalid selection" },
  );

export const quoteRequestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email(),
  organisation: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
  selection: selectionSchema,
  website: honeypot,
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
