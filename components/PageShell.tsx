import { ViewTransition, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import type { NavKey } from "@/content/site";
import { AnnouncementBar, Header } from "./Header";
import { CtaBand } from "./CtaBand";
import { Footer } from "./Footer";

/**
 * Announcement bar + nav, page content, CTA band + footer.
 * Navigations animate the page body via <ViewTransition> (see "Page
 * transitions" in app/globals.css): a branded curtain sweep, or a quick
 * crossfade for photo-morph navigations.
 */
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
      {/* Own stacking layer (view-transition-name), so keep it above the page — the mobile menu lives inside. */}
      <div className="relative z-40" style={{ viewTransitionName: "site-header" }}>
        <AnnouncementBar locale={locale} />
        <Header locale={locale} active={active} />
      </div>
      <ViewTransition enter="page" exit="page" default="none">
        <div className="page-enter">
          <main id="main">{children}</main>
          {cta && <CtaBand locale={locale} />}
          <Footer locale={locale} />
        </div>
      </ViewTransition>
    </>
  );
}
