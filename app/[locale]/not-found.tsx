import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";

export default async function NotFoundPage() {
  const t = await getTranslations("NotFound");

  return (
    <Section>
      <h1 className="type-display-xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-xl">{t("body")}</p>
      <div className="mt-8">
        <ButtonLink href="/">{t("cta")}</ButtonLink>
      </div>
    </Section>
  );
}
