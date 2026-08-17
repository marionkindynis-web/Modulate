import { getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { SkipLink } from "@/components/SkipLink";
import { site } from "@/lib/site";

export async function ComingSoonFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  const comingSoon = await getTranslations("ComingSoon");
  const year = new Date().getFullYear();

  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden">
      <div
        className="pointer-events-none absolute top-[-20%] right-[-8%] z-0 aspect-square w-[min(55vw,640px)] opacity-85 blur-3xl"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 40% 40%, #ebe4da 0%, #f5f2ec 45%, transparent 70%)",
        }}
      />
      <SkipLink />
      <header className="relative z-10">
        <div className="container-site flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Logo priority />
          <LanguageSwitcher />
        </div>
      </header>
      <main id="contenu" className="relative z-10 flex flex-1 flex-col">
        {children}
      </main>
      <footer className="relative z-10 border-t border-line">
        <div className="container-site flex flex-col gap-3 py-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            {comingSoon("location")} ·{" "}
            <a
              href={`mailto:${site.comingSoonEmail}`}
              className="font-medium text-ink hover:underline"
            >
              {site.comingSoonEmail}
            </a>
          </p>
          <p className="text-[#b8b8b4]">
            © {year} {site.name}
          </p>
        </div>
      </footer>
    </div>
  );
}
