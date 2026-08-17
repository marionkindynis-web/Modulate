import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";
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
  const services = await getTranslations("Services");
  const common = await getTranslations("Common");

  return (
    <>
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <PageIntro kicker={t("kicker")} title={t("title")} intro={t("intro")} />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/devis">{t("primaryCta")}</ButtonLink>
              <ButtonLink href="/services" variant="secondary">
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
          {t("servicesKicker")}
        </p>
        <h2 className="mt-4 max-w-2xl text-[36px] leading-11">{t("servicesTitle")}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {(["adapt", "optimize", "elevate"] as const).map((key) => (
            <Card
              key={key}
              kicker={services(`items.${key}.kicker`)}
              title={services(`items.${key}.title`)}
              action={
                <Link href="/services" className="text-[15px] font-medium text-ink">
                  {common("learnMore")} →
                </Link>
              }
            >
              <p>{services(`items.${key}.body`)}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-xl border border-line bg-ink px-6 py-10 text-white md:px-12 md:py-14">
          <h2 className="text-[36px] leading-11 text-white">{t("ctaTitle")}</h2>
          <p className="mt-4 max-w-2xl text-white/80">{t("ctaBody")}</p>
          <div className="mt-8">
            <ButtonLink href="/devis" variant="secondary">
              {t("ctaButton")}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
