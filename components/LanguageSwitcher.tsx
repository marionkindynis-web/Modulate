"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      role="group"
      aria-label={t("language")}
      className="flex items-center rounded-md border border-line bg-surface p-0.5"
    >
      {routing.locales.map((item) => {
        const active = item === locale;
        return (
          <button
            key={item}
            type="button"
            className={`min-h-10 min-w-10 rounded-[5px] text-xs font-medium tracking-[0.06em] uppercase transition-colors duration-200 ${
              active ? "bg-ink text-white" : "text-muted hover:text-ink"
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
