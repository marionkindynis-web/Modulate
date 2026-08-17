import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Pathname } from "@/i18n/routing";
import { site } from "@/lib/site";

const allPaths: Pathname[] = [
  "/",
  "/services",
  "/a-propos",
  "/realisations",
  "/devis",
  "/contact",
  "/mentions-legales",
  "/politique-de-confidentialite",
];

const comingSoonPaths: Pathname[] = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = site.comingSoon ? comingSoonPaths : allPaths;

  return paths.flatMap((pathname) =>
    routing.locales.map((locale) => ({
      url: new URL(getPathname({ locale, href: pathname }), site.url).toString(),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((item) => [
            item,
            new URL(getPathname({ locale: item, href: pathname }), site.url).toString(),
          ]),
        ),
      },
    })),
  );
}
