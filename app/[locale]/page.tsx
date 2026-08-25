import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/Button";
import { ComingSoon } from "@/components/ComingSoon";
import { PlaceholderMedia } from "@/components/PlaceholderMedia";
import { PageIntro, Section } from "@/components/Section";
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
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <PageIntro kicker={t("kicker")} title={t("title")} intro={t("intro")} />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact">{t("primaryCta")}</ButtonLink>
              <ButtonLink href="/notre-approche" variant="secondary">
                {t("secondaryCta")}
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-5">
            <PlaceholderMedia />
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <p className="text-xs font-medium tracking-[0.08em] text-muted uppercase">
          {t("problemKicker")}
        </p>
        <h2 className="mt-4 max-w-3xl text-[36px] leading-11">{t("problemTitle")}</h2>
        <p className="mt-6 max-w-2xl text-copy">{t("problemBody")}</p>
      </Section>

      <Section>
        <p className="text-xs font-medium tracking-[0.08em] text-muted uppercase">
          {t("improveKicker")}
        </p>
        <h2 className="mt-4 max-w-2xl text-[36px] leading-11">{t("improveTitle")}</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-display text-[28px] leading-9 text-ink">
              {t("improveImageTitle")}
            </h3>
            <p className="mt-3 text-copy">{t("improveImageBody")}</p>
          </div>
          <div>
            <h3 className="font-display text-[28px] leading-9 text-ink">
              {t("improveWorkTitle")}
            </h3>
            <p className="mt-3 text-copy">{t("improveWorkBody")}</p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface">
        <p className="text-xs font-medium tracking-[0.08em] text-muted uppercase">
          {t("methodKicker")}
        </p>
        <h2 className="mt-4 max-w-2xl text-[36px] leading-11">{t("methodTitle")}</h2>
        <p className="mt-6 max-w-2xl text-copy">{t("methodBody")}</p>
        <div className="mt-8">
          <ButtonLink href="/notre-approche" variant="secondary">
            {t("methodCta")}
          </ButtonLink>
        </div>
      </Section>

      <Section>
        <p className="text-xs font-medium tracking-[0.08em] text-muted uppercase">
          {t("workKicker")}
        </p>
        <h2 className="mt-4 max-w-2xl text-[36px] leading-11">{t("workTitle")}</h2>
        <p className="mt-6 max-w-2xl text-copy">{t("workIntro")}</p>
        <div className="mt-8">
          <Link href="/realisations" className="text-[15px] font-medium text-ink">
            {t("workCta")} →
          </Link>
        </div>
      </Section>

      <Section className="bg-surface">
        <p className="text-xs font-medium tracking-[0.08em] text-muted uppercase">
          {t("whyKicker")}
        </p>
        <h2 className="mt-4 max-w-2xl text-[36px] leading-11">{t("whyTitle")}</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {whyKeys.map((key) => (
            <div key={key}>
              <h3 className="font-display text-[22px] leading-8 text-ink">
                {t(`whyItems.${key}.title`)}
              </h3>
              <p className="mt-2 text-copy">{t(`whyItems.${key}.body`)}</p>
            </div>
          ))}
        </div>
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
