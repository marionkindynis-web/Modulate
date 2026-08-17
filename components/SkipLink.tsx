import { getTranslations } from "next-intl/server";

export async function SkipLink() {
  const t = await getTranslations("Nav");

  return (
    <a
      href="#contenu"
      className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
    >
      {t("skip")}
    </a>
  );
}
