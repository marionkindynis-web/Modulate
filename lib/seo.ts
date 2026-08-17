import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppLocale, type Pathname } from "@/i18n/routing";
import { site } from "@/lib/site";

type MetadataNamespace =
  | "Home"
  | "ComingSoon"
  | "Services"
  | "About"
  | "Work"
  | "Quote"
  | "Contact"
  | "Legal"
  | "Privacy";

export async function buildPageMetadata(
  locale: AppLocale,
  pathname: Pathname,
  namespace: MetadataNamespace,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const path = getPathname({ locale, href: pathname });
  const url = new URL(path, site.url).toString();
  const title = t("metaTitle");
  const description = t("metaDescription");

  const languages: Record<string, string> = {
    "x-default": new URL(
      getPathname({ locale: routing.defaultLocale, href: pathname }),
      site.url,
    ).toString(),
  };

  for (const item of routing.locales) {
    languages[item] = new URL(
      getPathname({ locale: item, href: pathname }),
      site.url,
    ).toString();
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: locale === "fr" ? "fr_CH" : "en_GB",
      type: "website",
    },
  };
}
