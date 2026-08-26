import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/Button";
import { Link } from "@/i18n/navigation";

/** Hero Accueil — canvas clair, hiérarchie charte, un CTA primaire. */
export async function HomeHero() {
  const t = await getTranslations("Home");

  return (
    <section
      id="home-hero"
      className="relative bg-canvas pb-16 pt-10 md:pb-24 md:pt-16 lg:pb-28 lg:pt-20"
    >
      <div className="container-site">
        <div className="max-w-2xl">
          <span className="accent-rule" />
          <h1 className="type-display-xl mt-6 text-ink">{t("title")}</h1>
          <p className="type-body mt-5 max-w-xl text-copy">{t("intro")}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href="/contact" variant="primary">
              {t("primaryCta")}
            </ButtonLink>
            <Link
              href="/notre-approche"
              className="link-arrow type-nav inline-flex min-h-11 items-center font-medium text-ink"
            >
              {t("secondaryCta")}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
