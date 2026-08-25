import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/Button";
import { ComingSoon } from "@/components/ComingSoon";
import { PageIntro, Section, SectionHeading } from "@/components/Section";
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
      <section className="hero-atmosphere">
        <div className="container-site flex min-h-[min(88vh,52rem)] flex-col justify-end pb-20 pt-16 md:justify-center md:pb-28 md:pt-20 lg:pb-32">
          <div className="max-w-3xl">
            <PageIntro
              brandAsHero
              kicker={t("kicker")}
              title={t("title")}
              intro={t("intro")}
            />
            <div className="motion-rise motion-rise-delay-3 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/contact">{t("primaryCta")}</ButtonLink>
              <ButtonLink href="/notre-approche" variant="secondary">
                {t("secondaryCta")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <Section className="bg-surface">
        <SectionHeading
          kicker={t("problemKicker")}
          title={t("problemTitle")}
          intro={t("problemBody")}
        />
      </Section>

      <Section>
        <SectionHeading kicker={t("improveKicker")} title={t("improveTitle")} />
        <div className="mt-14 grid gap-12 border-t border-line pt-12 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="type-display-md">{t("improveImageTitle")}</h3>
            <p className="type-body mt-4 text-muted">{t("improveImageBody")}</p>
          </div>
          <div>
            <h3 className="type-display-md">{t("improveWorkTitle")}</h3>
            <p className="type-body mt-4 text-muted">{t("improveWorkBody")}</p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeading
          kicker={t("methodKicker")}
          title={t("methodTitle")}
          intro={t("methodBody")}
        />
        <div className="mt-10">
          <ButtonLink href="/notre-approche" variant="secondary">
            {t("methodCta")}
          </ButtonLink>
        </div>
      </Section>

      <Section>
        <SectionHeading
          kicker={t("workKicker")}
          title={t("workTitle")}
          intro={t("workIntro")}
        />
        <div className="mt-8">
          <Link
            href="/realisations"
            className="type-nav font-medium text-ink transition-transform duration-200 hover:translate-x-1 inline-flex"
          >
            {t("workCta")} →
          </Link>
        </div>
      </Section>

      <Section className="bg-surface">
        <SectionHeading kicker={t("whyKicker")} title={t("whyTitle")} />
        <div className="mt-14 grid gap-10 border-t border-line pt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-14">
          {whyKeys.map((key) => (
            <div key={key}>
              <h3 className="type-display-md">{t(`whyItems.${key}.title`)}</h3>
              <p className="type-body mt-3 text-muted">{t(`whyItems.${key}.body`)}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="bg-ink px-6 py-14 text-white md:px-14 md:py-20">
          <h2 className="type-display-lg text-white">{t("ctaTitle")}</h2>
          <p className="type-body mt-5 max-w-xl text-white/70">{t("ctaBody")}</p>
          <div className="mt-10">
            <ButtonLink href="/contact" variant="inverted">
              {t("ctaButton")}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
