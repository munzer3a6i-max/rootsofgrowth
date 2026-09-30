import type { Metadata } from "next";
import { locales, type Locale } from "./i18n";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** Per-page metadata with canonical + hreflang alternates for ar/en. */
export function pageMetadata({
  locale,
  path = "/",
  title,
  description,
  image = "/images/hero_masmak.jpg",
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const suffix = path === "/" ? "" : path;
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}${suffix}`]));
  return {
    title,
    description,
    alternates: { canonical: `/${locale}${suffix}`, languages: { ...languages, "x-default": `/ar${suffix}` } },
    openGraph: {
      title,
      description,
      url: `/${locale}${suffix}`,
      siteName: locale === "ar" ? "جذور النمو" : "Roots of Growth",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
      images: [{ url: image }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
