"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

export function LanguageSwitcher({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={`flex items-center rounded-sm border p-0.5 ${
        tone === "dark"
          ? "border-white/25 bg-white/5"
          : "border-line bg-surface"
      }`}
    >
      {routing.locales.map((item) => {
        const active = item === locale;
        return (
          <button
            key={item}
            type="button"
            className={`min-h-10 min-w-10 rounded-[4px] text-xs font-medium tracking-[0.06em] uppercase transition-colors duration-200 ${
              active
                ? tone === "dark"
                  ? "bg-white text-ink"
                  : "bg-ink text-white"
                : tone === "dark"
                  ? "text-white/55 hover:text-white"
                  : "text-muted hover:text-ink"
            }`}
            aria-pressed={active}
            onClick={() => {
              if (item === locale) return;
              router.replace(pathname, { locale: item as AppLocale });
            }}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
