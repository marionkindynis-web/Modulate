import { getTranslations } from "next-intl/server";
import { PageIntro, Section } from "@/components/Section";
import { resolveLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  return buildPageMetadata(locale, "/mentions-legales", "Legal");
}

export default async function LegalPage({ params }: Props) {
  await resolveLocale(params);
  const t = await getTranslations("Legal");

  const blocks = [
    ["publisher", "publisherBody"],
    ["identifier", "identifierBody"],
    ["director", "directorBody"],
    ["contact", "contactBody"],
    ["host", "hostBody"],
  ] as const;

  return (
    <Section>
      <PageIntro kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      <dl className="mt-12 max-w-3xl space-y-8">
        {blocks.map(([title, body]) => (
          <div key={title} className="border-t border-line pt-6">
            <dt className="text-xs font-medium tracking-[0.08em] text-muted uppercase">
              {t(title)}
            </dt>
            <dd className="mt-2">{t(body)}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
