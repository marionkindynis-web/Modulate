import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { PageIntro, Section } from "@/components/Section";
import { resolveLocale } from "@/lib/locale";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = await resolveLocale(params);
  return buildPageMetadata(locale, "/contact", "Contact");
}

export default async function ContactPage({ params }: Props) {
  await resolveLocale(params);
  const t = await getTranslations("Contact");

  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <PageIntro kicker={t("kicker")} title={t("title")} intro={t("intro")} />
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
