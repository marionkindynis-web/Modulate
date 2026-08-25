import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/Button";
import { PageIntro, Section } from "@/components/Section";
import { site } from "@/lib/site";
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
    <>
      <Section>
        <PageIntro kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      </Section>

      <Section className="bg-surface">
        <h2 className="max-w-2xl text-[36px] leading-11">{t("whyTitle")}</h2>
        <p className="mt-6 max-w-2xl text-copy">{t("whyBody")}</p>
      </Section>

      <Section>
        <h2 className="max-w-2xl text-[36px] leading-11">{t("peopleTitle")}</h2>
        <p className="mt-6 max-w-2xl text-copy">{t("peopleBody")}</p>
        <p className="mt-3 text-sm text-muted">{t("peopleNote")}</p>
      </Section>

      <Section className="bg-surface">
        <h2 className="max-w-2xl text-[36px] leading-11">{t("complementTitle")}</h2>
        <p className="mt-6 max-w-2xl text-copy">{t("complementBody")}</p>
        <p className="mt-8 text-sm text-muted">{site.taglineLockup}</p>
      </Section>

      <Section>
        <h2 className="max-w-2xl text-[36px] leading-11">{t("ctaTitle")}</h2>
        <div className="mt-8">
          <ButtonLink href="/contact">{t("ctaButton")}</ButtonLink>
        </div>
      </Section>
    </>
  );
}
