"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { navCta, navItems } from "@/lib/site";

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/85 backdrop-blur-md">
      <div className="container-site flex h-[4.25rem] items-center justify-between gap-6 lg:h-[4.75rem]">
        <Logo priority />
        <nav aria-label={t("mainNav")} className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`type-nav inline-flex min-h-10 items-center px-3 transition-colors duration-200 ${
                      active ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              );
            })}
            <li className="ml-4 pl-4 border-l border-line">
              <Link
                href={navCta.href}
                className="inline-flex min-h-10 items-center rounded-sm bg-ink px-4 text-[0.875rem] font-medium text-white transition-colors duration-200 hover:bg-[#12122a]"
              >
                {t(navCta.key)}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-sm border border-line bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
            <span className="flex h-3.5 w-4 flex-col justify-between" aria-hidden>
              <span className="block h-px bg-ink" />
              <span className="block h-px bg-ink" />
              <span className="block h-px bg-ink" />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          aria-label={t("mainNav")}
          className="border-t border-line bg-canvas lg:hidden"
        >
          <ul className="container-site flex flex-col py-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center text-[0.9375rem] text-ink"
                  onClick={() => setOpen(false)}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={navCta.href}
                className="mt-3 flex min-h-11 items-center justify-center rounded-sm bg-ink text-[0.875rem] font-medium text-white"
                onClick={() => setOpen(false)}
              >
                {t(navCta.key)}
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
