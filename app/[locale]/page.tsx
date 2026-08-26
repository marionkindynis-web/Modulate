import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/Button";
import { ComingSoon } from "@/components/ComingSoon";
import { HomeChapterIndicator } from "@/components/HomeChapterIndicator";
import { HomeHero } from "@/components/HomeHero";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/Section";
import { Link } from "@/i18n/navigation";
import { resolveLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  return buildPageMetadata(locale, "/", site.comingSoon ? "ComingSoon" : "Home");
}

export default async function HomePage({ params }: Props) {
  await resolveLocale(params);

  if (site.comingSoon) {
    return <ComingSoon />;
  }

  const t = await getTranslations("Home");
  const whyKeys = ["method", "expertise", "proximity", "transparency", "results"] as const;

  return (
    <>
      <HomeHero />
      <HomeChapterIndicator />

      <Section id="home-problem" className="bg-surface">
        <Reveal>
          <SectionHeading
            kicker={t("problemKicker")}
            title={t("problemTitle")}
            intro={t("problemBody")}
          />
        </Reveal>
      </Section>

      <Section id="home-improve">
        <Reveal>
          <SectionHeading kicker={t("improveKicker")} title={t("improveTitle")} />
        </Reveal>
        <div className="mt-14 grid gap-12 border-t border-line pt-12 md:grid-cols-2 md:gap-16">
          <Reveal delay={1}>
            <h3 className="type-display-md text-ink">{t("improveImageTitle")}</h3>
            <p className="type-body mt-4 text-muted">{t("improveImageBody")}</p>
          </Reveal>
          <Reveal delay={2}>
            <h3 className="type-display-md text-ink">{t("improveWorkTitle")}</h3>
            <p className="type-body mt-4 text-muted">{t("improveWorkBody")}</p>
          </Reveal>
        </div>
      </Section>

      <Section id="home-method" className="bg-surface">
        <Reveal>
          <SectionHeading
            kicker={t("methodKicker")}
            title={t("methodTitle")}
            intro={t("methodBody")}
          />
        </Reveal>
        <Reveal delay={1} className="mt-10">
          <ButtonLink href="/notre-approche" variant="secondary">
            {t("methodCta")}
          </ButtonLink>
        </Reveal>
      </Section>

      <Section id="home-work">
        <Reveal>
          <SectionHeading
            kicker={t("workKicker")}
            title={t("workTitle")}
            intro={t("workIntro")}
          />
        </Reveal>
        <Reveal delay={1} className="mt-8">
          <Link href="/realisations" className="link-arrow type-nav font-medium text-ink">
            {t("workCta")}
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </Section>

      <Section id="home-why" className="bg-surface">
        <Reveal>
          <SectionHeading kicker={t("whyKicker")} title={t("whyTitle")} />
        </Reveal>
        <div className="mt-14 grid gap-10 border-t border-line pt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-14">
          {whyKeys.map((key, i) => (
            <Reveal key={key} delay={Math.min(i, 5)}>
              <h3 className="type-display-md text-ink">{t(`whyItems.${key}.title`)}</h3>
              <p className="type-body mt-3 text-muted">{t(`whyItems.${key}.body`)}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="home-cta">
        <Reveal>
          <div className="bg-ink px-6 py-14 text-white md:px-14 md:py-20">
            <h2 className="type-display-lg text-white">{t("ctaTitle")}</h2>
            <p className="type-body mt-5 max-w-xl text-white/70">{t("ctaBody")}</p>
            <div className="mt-10">
              <ButtonLink href="/contact" variant="inverted">
                {t("ctaButton")}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
