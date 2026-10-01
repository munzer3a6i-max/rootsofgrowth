"use client";

import Image from "next/image";
import { addTransitionType, startTransition, useState, ViewTransition } from "react";
import { t, type Locale } from "@/lib/i18n";
import { departments, members, team, type Department } from "@/content/team";
import { SectionHead } from "@/components/about/SectionHead";
import { buttonClasses } from "@/components/Button";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { SocialLinks } from "./SocialLinks";

/** Mobile shows this many cards until "Show more" is pressed (Figma 42:2471). */
const MOBILE_INITIAL = 6;

/** Team · Team grid with department filter (Figma 41:2356 desktop / 42:2471 mobile). */
export function TeamGrid({ locale }: { locale: Locale }) {
  const c = team.grid;
  const [filter, setFilter] = useState<Department | "all">("all");
  const [expanded, setExpanded] = useState(false);
  // Members have no ids; their index in the full list is stable across filters,
  // so cards that stay visible keep their identity and move instead of remounting.
  const list = members
    .map((m, id) => ({ ...m, id }))
    .filter((m) => filter === "all" || m.department === filter);
  const deptLabel = (d: Department) => t(departments.find((x) => x.key === d)!.label, locale);
  const hasMore = !expanded && list.length > MOBILE_INITIAL;

  return (
    <section className="bg-canvas">
      <div className="container-site flex flex-col gap-[14px] py-16 lg:gap-10 lg:py-[120px]">
        <SectionHead eyebrow={t(c.eyebrow, locale)} title={t(c.title, locale)} titleWidth="lg:max-w-[700px]" />

        <div
          role="group"
          aria-label={t(c.filterLabel, locale)}
          className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] md:-mx-10 md:px-10 lg:mx-0 lg:flex-wrap lg:gap-[10px] lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {departments.filter((d) => d.key === "all" || members.some((m) => m.department === d.key)).map((d) => {
            const on = filter === d.key;
            return (
              <button
                key={d.key}
                type="button"
                aria-pressed={on}
                onClick={() =>
                  startTransition(() => {
                    addTransitionType("filter");
                    setFilter(d.key);
                    setExpanded(false);
                  })
                }
                className={`press t-label shrink-0 rounded-full border px-[14px] py-2 whitespace-nowrap lg:px-[18px] lg:py-[10px] ${
                  on ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"
                }`}
              >
                <span className="lg:hidden">{t(d.labelMobile, locale)}</span>
                <span className="hidden lg:inline">{t(d.label, locale)}</span>
              </button>
            );
          })}
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
          {list.map((m, i) => (
            <ViewTransition key={m.id}>
              <li
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
                className={`flex flex-col gap-[10px] rounded-[18px] bg-white px-2 pt-2 pb-[14px] lg:gap-[14px] lg:rounded-[24px] lg:px-3 lg:pt-3 lg:pb-[22px] ${
                  !expanded && i >= MOBILE_INITIAL ? "hidden lg:flex" : ""
                }`}
              >
                <div className="relative h-[180px] overflow-hidden rounded-[12px] lg:h-[280px] lg:rounded-[18px]">
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={t(m.name, locale)}
                      fill
                      sizes="(min-width: 1024px) 268px, 50vw"
                      className="object-cover object-top"
                    />
                  ) : (
                    <PhotoPlaceholder />
                  )}
                  <span className="t-body-s absolute start-[10px] top-[9px] hidden rounded-full bg-lilac-soft px-[10px] py-[5px] text-purple lg:block">
                    {deptLabel(m.department)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 px-1 lg:px-2">
                  <div className="flex min-w-0 flex-col gap-[2px]">
                    <h3 className="text-[15px] leading-[1.4] font-medium text-ink lg:text-[21px] lg:leading-[1.5]">
                      {t(m.name, locale)}
                    </h3>
                    <p className="t-body-s text-muted">{t(m.role, locale)}</p>
                  </div>
                  <div className="hidden lg:block">
                    <SocialLinks person={m} locale={locale} size="sm" email={false} />
                  </div>
                </div>
              </li>
            </ViewTransition>
          ))}
        </ul>

        {hasMore && (
          <button
            type="button"
            onClick={() => startTransition(() => { addTransitionType("filter"); setExpanded(true); })}
            className={buttonClasses("outlineLight", "w-full lg:hidden")}
          >
            {t(c.showMore, locale)}
          </button>
        )}
      </div>
    </section>
  );
}
