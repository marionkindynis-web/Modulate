import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { PageIntro, Section } from "@/components/Section";
import { site } from "@/lib/site";
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
          <p className="mt-8 text-sm text-muted">{t("location")}</p>
          <p className="mt-2 text-sm text-copy">
            {t("emailLabel")}{" "}
            <a
              href={`mailto:${site.comingSoonEmail}`}
              className="font-medium text-ink hover:underline"
            >
              {site.comingSoonEmail}
            </a>
          </p>
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
