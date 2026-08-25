import { getTranslations } from "next-intl/server";
import { ComingSoonForm } from "@/components/ComingSoonForm";

export async function ComingSoon() {
  const t = await getTranslations("ComingSoon");

  return (
    <div className="container-site grid flex-1 items-start gap-10 py-8 lg:grid-cols-2 lg:gap-14 lg:py-12">
      <div className="max-w-xl pt-2">
        <p className="text-xs font-medium tracking-[0.14em] text-muted uppercase">
          {t("kicker")}
        </p>
        <h1 className="type-display-xl mt-4">
          {t("title")}
          <br />
          <span className="brand-gradient-text">{t("brand")}</span>
        </h1>
        <p className="mt-6 text-[17px] leading-7 text-muted">{t("intro")}</p>
        <p className="mt-4 text-[17px] leading-7 text-muted">{t("introNext")}</p>
      </div>
      <ComingSoonForm />
    </div>
  );
}
