import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import type { NavKey } from "@/content/site";
import { AnnouncementBar, Header } from "./Header";
import { CtaBand } from "./CtaBand";
import { Footer } from "./Footer";

/** Announcement bar + nav, page content, CTA band + footer. */
export function PageShell({
  locale,
  active,
  children,
  cta = true,
}: {
  locale: Locale;
  active?: NavKey;
  children: ReactNode;
  /** Show the closing CTA band (all designed pages have it except 404). */
  cta?: boolean;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        {locale === "ar" ? "تخطَّ إلى المحتوى" : "Skip to content"}
      </a>
      <AnnouncementBar locale={locale} />
      <Header locale={locale} active={active} />
      <main id="main">{children}</main>
      {cta && <CtaBand locale={locale} />}
      <Footer locale={locale} />
    </>
  );
}
