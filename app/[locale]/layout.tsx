import type { Metadata, Viewport } from "next";
import { Alexandria, DM_Serif_Display } from "next/font/google";
import { notFound } from "next/navigation";
import { dirOf, isLocale, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/metadata";
import { site } from "@/content/site";
import "../globals.css";

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-alexandria",
  display: "swap",
  // Fallback only — Thmanyah Sans (self-hosted, see app/globals.css) is the primary face.
  preload: false,
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const l = isLocale(locale) ? locale : "ar";
  return {
    metadataBase: new URL(siteUrl),
    title: { default: site.name[l], template: `%s | ${site.name[l]}` },
    description: site.metaDescription[l],
    icons: { icon: "/icon.svg" },
  };
}

export const viewport: Viewport = { themeColor: "#1e1b2e" };

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} dir={dirOf(locale)} className={`${alexandria.variable} ${dmSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
