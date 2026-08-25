import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/notre-approche": {
      fr: "/notre-approche",
      en: "/approach",
    },
    "/expertise": "/expertise",
    "/a-propos": {
      fr: "/a-propos",
      en: "/about",
    },
    "/realisations": {
      fr: "/realisations",
      en: "/work",
    },
    "/devis": {
      fr: "/devis",
      en: "/quote",
    },
    "/contact": "/contact",
    "/mentions-legales": {
      fr: "/mentions-legales",
      en: "/legal-notice",
    },
    "/politique-de-confidentialite": {
      fr: "/politique-de-confidentialite",
      en: "/privacy-policy",
    },
  },
});

export type Pathname = keyof typeof routing.pathnames;
export type AppLocale = (typeof routing.locales)[number];
