import { getTranslations } from "next-intl/server";
import { QuoteBuilder } from "@/components/QuoteBuilder";
import { PageIntro, Section } from "@/components/Section";
import { resolveLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  return buildPageMetadata(locale, "/devis", "Quote");
}

export default async function QuotePage({ params }: Props) {
  await resolveLocale(params);
  const t = await getTranslations("Quote");

  return (
    <Section>
      <PageIntro kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      <div className="mt-12">
        <QuoteBuilder />
      </div>
    </Section>
  );
}
