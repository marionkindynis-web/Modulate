import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/Button";
import { PageIntro, Section } from "@/components/Section";
import { resolveLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const digitalKeys = [
  "branding",
  "identity",
  "direction",
  "web",
  "sites",
  "templates",
] as const;

const systemsKeys = [
  "workflows",
  "automation",
  "integration",
  "apps",
  "ai",
] as const;

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  return buildPageMetadata(locale, "/expertise", "Expertise");
}

export default async function ExpertisePage({ params }: Props) {
  await resolveLocale(params);
  const t = await getTranslations("Expertise");

  return (
    <>
      <Section>
        <PageIntro kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      </Section>

      <Section className="bg-surface">
        <p className="text-xs font-medium tracking-[0.08em] text-muted uppercase">
          {t("digitalKicker")}
        </p>
        <h2 className="mt-4 max-w-3xl text-[36px] leading-11">{t("digitalTitle")}</h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {digitalKeys.map((key) => (
            <li key={key} className="border-t border-line pt-3 text-copy">
              {t(`digitalItems.${key}`)}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <p className="text-xs font-medium tracking-[0.08em] text-muted uppercase">
          {t("systemsKicker")}
        </p>
        <h2 className="mt-4 max-w-3xl text-[36px] leading-11">{t("systemsTitle")}</h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {systemsKeys.map((key) => (
            <li key={key} className="border-t border-line pt-3 text-copy">
              {t(`systemsItems.${key}`)}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">{t("aiNote")}</p>
      </Section>

      <Section className="bg-surface">
        <p className="text-xs font-medium tracking-[0.08em] text-muted uppercase">
          {t("entryKicker")}
        </p>
        <h2 className="mt-4 max-w-2xl text-[36px] leading-11">{t("entryTitle")}</h2>
        <p className="mt-6 max-w-2xl text-copy">{t("entryBody")}</p>
      </Section>

      <Section>
        <div className="rounded-xl border border-line bg-ink px-6 py-10 text-white md:px-12 md:py-14">
          <h2 className="text-[36px] leading-11 text-white">{t("ctaTitle")}</h2>
          <p className="mt-4 max-w-2xl text-white/80">{t("ctaBody")}</p>
          <div className="mt-8">
            <ButtonLink href="/contact" variant="secondary">
              {t("ctaButton")}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
