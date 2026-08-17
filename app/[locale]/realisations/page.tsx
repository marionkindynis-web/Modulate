import { getTranslations } from "next-intl/server";
import { Card } from "@/components/Card";
import { PlaceholderMedia } from "@/components/PlaceholderMedia";
import { PageIntro, Section } from "@/components/Section";
import { resolveLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  return buildPageMetadata(locale, "/realisations", "Work");
}

export default async function WorkPage({ params }: Props) {
  await resolveLocale(params);
  const t = await getTranslations("Work");

  return (
    <Section>
      <PageIntro kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {(["one", "two", "three"] as const).map((key) => (
          <div key={key} className="flex flex-col gap-4">
            <PlaceholderMedia />
            <Card kicker={t(`items.${key}.kicker`)} title={t(`items.${key}.title`)}>
              <p>{t(`items.${key}.body`)}</p>
            </Card>
          </div>
        ))}
      </div>
    </Section>
  );
}
