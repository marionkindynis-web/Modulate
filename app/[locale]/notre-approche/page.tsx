import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/Button";
import { PageIntro, Section } from "@/components/Section";
import { resolveLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const stepKeys = [
  "observe",
  "listen",
  "understand",
  "question",
  "identify",
  "prioritize",
  "build",
  "improve",
] as const;

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  return buildPageMetadata(locale, "/notre-approche", "Approach");
}

export default async function ApproachPage({ params }: Props) {
  await resolveLocale(params);
  const t = await getTranslations("Approach");

  return (
    <>
      <Section>
        <PageIntro kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      </Section>

      <Section className="bg-surface">
        <p className="text-xs font-medium tracking-[0.08em] text-muted uppercase">
          {t("methodKicker")}
        </p>
        <h2 className="mt-4 max-w-2xl text-[36px] leading-11">{t("methodTitle")}</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-2">
          {stepKeys.map((key, index) => (
            <li key={key} className="flex gap-4">
              <span className="font-display text-[22px] text-muted tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-[22px] leading-8 text-ink">
                  {t(`steps.${key}.title`)}
                </h3>
                <p className="mt-2 text-copy">{t(`steps.${key}.body`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <p className="text-xs font-medium tracking-[0.08em] text-muted uppercase">
          {t("keepKicker")}
        </p>
        <h2 className="mt-4 max-w-3xl text-[36px] leading-11">{t("keepTitle")}</h2>
        <p className="mt-6 max-w-2xl text-copy">{t("keepBody")}</p>
      </Section>

      <Section className="bg-surface">
        <h2 className="max-w-2xl text-[36px] leading-11">{t("ctaTitle")}</h2>
        <div className="mt-8">
          <ButtonLink href="/contact">{t("ctaButton")}</ButtonLink>
        </div>
      </Section>
    </>
  );
}
