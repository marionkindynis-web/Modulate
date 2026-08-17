import { getTranslations } from "next-intl/server";

export async function PlaceholderMedia({ label }: { label?: string }) {
  const t = await getTranslations("Common");

  return (
    <div
      className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border border-line bg-surface"
      role="img"
      aria-label={label ?? t("imageAltPlaceholder")}
    >
      <span className="brand-gradient absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 opacity-70" />
      <span className="relative text-xs font-medium tracking-[0.08em] text-muted uppercase">
        {t("placeholder")}
      </span>
    </div>
  );
}
