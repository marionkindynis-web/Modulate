import { getTranslations } from "next-intl/server";
import { Card } from "@/components/Card";
import { PageIntro, Section } from "@/components/Section";
import { resolveLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  return buildPageMetadata(locale, "/services", "Services");
}

export default async function ServicesPage({ params }: Props) {
  await resolveLocale(params);
  const t = await getTranslations("Services");

  return (
    <Section>
      <PageIntro kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {(["adapt", "optimize", "elevate"] as const).map((key) => (
          <Card
            key={key}
            kicker={t(`items.${key}.kicker`)}
            title={t(`items.${key}.title`)}
          >
            <p>{t(`items.${key}.body`)}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
