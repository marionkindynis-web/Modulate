import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Inter, Roboto } from "next/font/google";
import { ComingSoonFrame } from "@/components/ComingSoonFrame";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SkipLink } from "@/components/SkipLink";
import { ThirdPartyScripts } from "@/components/ThirdPartyScripts";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: "%s",
  },
  description:
    "Modulate améliore l’existant. Adapt. Optimize. Elevate.",
  openGraph: {
    type: "website",
    siteName: site.name,
    images: [{ url: "/brand/logo-standard.svg", alt: site.name }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  if (site.comingSoon) {
    return (
      <html lang={locale} className={`${inter.variable} ${roboto.variable}`}>
        <body className="font-sans antialiased">
          <NextIntlClientProvider messages={messages}>
            <ComingSoonFrame>{children}</ComingSoonFrame>
            <ThirdPartyScripts />
          </NextIntlClientProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang={locale} className={`${inter.variable} ${roboto.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <SkipLink />
          <Header />
          <main id="contenu" className="flex-1">
            {children}
          </main>
          <Footer />
          <ThirdPartyScripts />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
