import { getTranslations } from "next-intl/server";
import { PlaceholderMedia } from "@/components/PlaceholderMedia";
import { PageIntro, Section } from "@/components/Section";
import { resolveLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  return buildPageMetadata(locale, "/a-propos", "About");
}

export default async function AboutPage({ params }: Props) {
  await resolveLocale(params);
  const t = await getTranslations("About");

  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <PageIntro kicker={t("kicker")} title={t("title")} intro={t("intro")} />
          <p className="mt-6 max-w-2xl">{t("body")}</p>
        </div>
        <div className="lg:col-span-5">
          <PlaceholderMedia />
        </div>
      </div>
    </Section>
  );
}
