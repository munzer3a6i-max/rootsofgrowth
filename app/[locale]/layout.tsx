import type { Metadata, Viewport } from "next";
import { DM_Serif_Display } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { dirOf, isLocale, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/metadata";
import { site } from "@/content/site";
import { MotionObserver } from "@/components/MotionObserver";
import "../globals.css";

/**
 * Thmanyah Sans — the typeface of the Figma design. The files live outside
 * /public on purpose: next/font compiles them into the build (hashed,
 * packaged assets) instead of serving them as downloadable font files,
 * as the Thmanyah font licence requires. Only the weights the design uses.
 */
const thmanyah = localFont({
  src: [
    { path: "../../fonts/thmanyah-sans/thmanyahsans-Light.otf", weight: "300", style: "normal" },
    { path: "../../fonts/thmanyah-sans/thmanyahsans-Regular.otf", weight: "400", style: "normal" },
    { path: "../../fonts/thmanyah-sans/thmanyahsans-Medium.otf", weight: "500", style: "normal" },
    { path: "../../fonts/thmanyah-sans/thmanyahsans-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-thmanyah",
  display: "swap",
  fallback: ["system-ui", "Tahoma", "sans-serif"],
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
    <html lang={locale} dir={dirOf(locale)} className={`${thmanyah.variable} ${dmSerif.variable}`}>
      <body>
        {children}
        <MotionObserver />
      </body>
    </html>
  );
}
