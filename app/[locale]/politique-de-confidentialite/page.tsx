import { getTranslations } from "next-intl/server";
import { PageIntro, Section } from "@/components/Section";
import { resolveLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  return buildPageMetadata(locale, "/politique-de-confidentialite", "Privacy");
}

export default async function PrivacyPage({ params }: Props) {
  await resolveLocale(params);
  const t = await getTranslations("Privacy");

  const blocks = [
    ["controllerTitle", "controllerBody"],
    ["purposeTitle", "purposeBody"],
    ["legalTitle", "legalBody"],
    ["retentionTitle", "retentionBody"],
    ["recipientsTitle", "recipientsBody"],
    ["rightsTitle", "rightsBody"],
    ["cookiesTitle", "cookiesBody"],
  ] as const;

  return (
    <Section>
      <PageIntro kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      <div className="mt-12 max-w-3xl space-y-8">
        {blocks.map(([title, body]) => (
          <section key={title} className="border-t border-line pt-6">
            <h2 className="text-[28px] leading-9">{t(title)}</h2>
            <p className="mt-3">{t(body)}</p>
          </section>
        ))}
      </div>
    </Section>
  );
}
