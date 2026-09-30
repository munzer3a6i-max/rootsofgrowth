import { Fragment } from "react";
import { t, type Locale } from "@/lib/i18n";
import { home } from "@/content/home";
import { getProject } from "@/content/projects";

/** "فخورون بصناعة لحظات في" — Figma 16:386 (desktop row) / 18:265 (mobile pills). */
export function ProjectsStrip({ locale }: { locale: Locale }) {
  const items = home.strip.items.map((i) => {
    const p = getProject(i.slug)!;
    return { slug: i.slug, full: t(p.title, locale), short: i.short ? t(i.short, locale) : t(p.title, locale) };
  });
  return (
    <section className="bg-white">
      <div className="container-site flex flex-col items-center gap-[14px] py-7 lg:gap-4 lg:pt-[30px] lg:pb-[34px]">
        <p className="text-[13px] leading-[1.4] font-medium text-muted lg:text-[14px]">{t(home.strip.title, locale)}</p>

        {/* Desktop: names separated by ✦ */}
        <ul
          className={`hidden flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:flex ${
            locale === "ar" ? "min-[1400px]:w-max min-[1400px]:flex-nowrap min-[1400px]:gap-x-[26px]" : ""
          }`}
        >
          {items.map((it, i) => (
            <Fragment key={it.slug}>
              {i > 0 && (
                <li aria-hidden="true" className="text-[12px] leading-[1.4] font-medium text-purple">
                  ✦
                </li>
              )}
              <li className="text-[16px] leading-[1.4] font-medium whitespace-nowrap text-ink/75 min-[1400px]:text-[18px]">{it.full}</li>
            </Fragment>
          ))}
        </ul>

        {/* Mobile: pills */}
        <ul className="flex max-w-[350px] flex-wrap justify-center gap-[10px] lg:hidden">
          {items.map((it) => (
            <li key={it.slug} className="rounded-full bg-canvas px-3 py-[7px] text-[13px] leading-[1.4] font-medium text-ink">
              {it.short}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
