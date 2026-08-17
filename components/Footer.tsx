import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/Logo";
import { legalItems, site } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-site grid gap-10 py-12 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 text-xs font-medium tracking-[0.08em] text-muted uppercase">
            {t("tagline")}
          </p>
        </div>
        <div className="md:col-span-4">
          <p className="text-xs font-medium tracking-[0.08em] text-muted uppercase">
            {t("host")}
          </p>
          <p className="mt-3 max-w-xs">
            {site.host.name}
            <br />
            {site.host.address}
          </p>
        </div>
        <nav className="md:col-span-3" aria-label={t("legal")}>
          <ul className="space-y-2">
            {legalItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[15px] font-medium text-ink hover:underline"
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-2 py-5 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
