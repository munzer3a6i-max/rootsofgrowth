"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, href, isLocale, t, type Locale } from "@/lib/i18n";
import { site } from "@/content/site";
import { notFoundPage as c } from "@/content/notfound";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/Button";
import { Mark } from "@/components/Brand";
import { Icon } from "@/components/Icon";

/** Locale from the URL ("/en/foo" → "en"); not-found.tsx receives no params. */
export function useLocaleFromPath(): Locale {
  const first = (usePathname() ?? "").split("/")[1] ?? "";
  return isLocale(first) ? first : defaultLocale;
}

/** 404 section (Figma 35:1721 / mobile 40:2333). */
export function NotFoundSection({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-5 mx-auto size-[380px] rounded-full bg-purple/45 blur-[110px] lg:top-10 lg:size-[700px] lg:blur-[180px]"
      />
      <div className="container-site relative flex flex-col items-center gap-[22px] py-[90px] text-center lg:gap-[30px] lg:py-[130px]">
        <p className="flex items-center gap-[10px] lg:gap-[18px]" dir="ltr" aria-label="404">
          <span aria-hidden="true" className="font-serif text-[120px] leading-[1.1] tracking-[-0.5px] lg:text-[220px]">
            4
          </span>
          <span
            aria-hidden="true"
            className="flex size-[110px] items-center justify-center rounded-full bg-purple lg:size-[200px]"
          >
            <Mark size={110} className="h-auto w-[60px] lg:w-[110px]" />
          </span>
          <span aria-hidden="true" className="font-serif text-[120px] leading-[1.1] tracking-[-0.5px] lg:text-[220px]">
            4
          </span>
        </p>

        <h1 className="text-[30px] leading-[1.35] font-bold lg:text-[60px] lg:leading-[1.25] lg:tracking-[-0.5px]">
          {t(c.title, locale)}
        </h1>
        <p className="t-body-l max-w-[640px] text-on-dark-muted lg:font-normal">
          {t(c.lead, locale)}
          <span className="hidden lg:inline"> {t(c.leadMore, locale)}</span>
        </p>

        <div className="flex w-full flex-col items-stretch gap-[22px] sm:w-auto lg:flex-row lg:items-center lg:gap-[14px]">
          <Button href={href(locale)} variant="primary">
            {t(c.home, locale)}
          </Button>
          <Button href={href(locale, "/contact")} variant="outlineDark" icon={false}>
            {t(c.contact, locale)}
          </Button>
        </div>

        <nav aria-label={t(site.footer.linksTitle, locale)} className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {c.links.map((l) => (
              <li key={l.path}>
                <Link
                  href={href(locale, l.path)}
                  className="t-label inline-flex items-center gap-[6px] text-lilac hover:text-white"
                >
                  <span>{t(l.label, locale)}</span>
                  <Icon name="arrow-left" size={14} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

/** Full 404 page: nav + 404 section + footer (no CTA band — as in Figma). */
export function NotFoundView() {
  const locale = useLocaleFromPath();
  return (
    <>
      <title>{`${t(c.metaTitle, locale)} | ${t(site.name, locale)}`}</title>
      <meta name="robots" content="noindex" />
      <PageShell locale={locale} cta={false}>
        <NotFoundSection locale={locale} />
      </PageShell>
    </>
  );
}
