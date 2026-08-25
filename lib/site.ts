export const site = {
  name: "Modulate",
  tagline: "Adapt. Optimize. Elevate.",
  taglineLockup: "ADAPT. OPTIMIZE. ELEVATE.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://modulate.ch",
  comingSoon: process.env.NEXT_PUBLIC_COMING_SOON !== "false",
  comingSoonEmail: "marion@marionweb.ch",
  socials: {
    linkedin: null as string | null,
  },
  host: {
    name: "Infomaniak Network SA",
    address: "Rue Eugène-Marziano 25, 1227 Genève, Suisse",
    url: "https://www.infomaniak.com",
  },
} as const;

export const navItems = [
  { href: "/", key: "home" },
  { href: "/notre-approche", key: "approach" },
  { href: "/expertise", key: "expertise" },
  { href: "/realisations", key: "work" },
  { href: "/a-propos", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

/** Header CTA — conversation, not quote configurator */
export const navCta = {
  href: "/contact",
  key: "cta",
} as const;

export const legalItems = [
  { href: "/mentions-legales", key: "legal" },
  { href: "/politique-de-confidentialite", key: "privacy" },
] as const;
