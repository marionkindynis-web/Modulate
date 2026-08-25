import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/Button";
import { PageIntro, Section } from "@/components/Section";
import { resolveLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  return buildPageMetadata(locale, "/devis", "Quote");
}

/** Route reserved for a later phase — configurator intentionally not mounted. */
export default async function QuotePage({ params }: Props) {
  await resolveLocale(params);
  const t = await getTranslations("Quote");

  return (
    <Section>
      <PageIntro kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      <p className="mt-4 text-sm text-muted">{t("reservedNote")}</p>
      <div className="mt-10">
        <ButtonLink href="/contact">{t("cta")}</ButtonLink>
      </div>
    </Section>
  );
}
