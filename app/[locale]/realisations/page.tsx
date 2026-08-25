import { getTranslations } from "next-intl/server";
import { PlaceholderMedia } from "@/components/PlaceholderMedia";
import { PageIntro, Section } from "@/components/Section";
import { resolveLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const caseKeys = ["one", "two", "three"] as const;
const fieldKeys = [
  "context",
  "problem",
  "understood",
  "decision",
  "solution",
  "result",
] as const;

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
      <p className="mt-4 max-w-2xl text-sm text-muted">{t("structureNote")}</p>
      <div className="mt-12 grid gap-12">
        {caseKeys.map((key) => (
          <article
            key={key}
            className="grid gap-6 border-t border-line pt-10 lg:grid-cols-12"
          >
            <div className="lg:col-span-5">
              <PlaceholderMedia />
            </div>
            <div className="lg:col-span-7">
              <p className="text-xs font-medium tracking-[0.08em] text-muted uppercase">
                {t(`items.${key}.kicker`)}
              </p>
              <h2 className="mt-3 font-display text-[28px] leading-9 text-ink">
                {t(`items.${key}.title`)}
              </h2>
              <dl className="mt-6 space-y-4">
                {fieldKeys.map((field) => (
                  <div key={field}>
                    <dt className="sr-only">{field}</dt>
                    <dd className="text-copy">{t(`items.${key}.${field}`)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
