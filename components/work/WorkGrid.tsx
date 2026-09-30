"use client";

import { startTransition, useId, useState, ViewTransition, type CSSProperties } from "react";
import { t, type Locale } from "@/lib/i18n";
import { projectCategories, projects, type ProjectCategory } from "@/content/projects";
import { work } from "@/content/work";
import { ProjectCard } from "./ProjectCard";
import { NextProjectCard } from "./NextProjectCard";

type FilterKey = ProjectCategory | "all";

function countFor(key: FilterKey) {
  return key === "all" ? projects.length : projects.filter((p) => p.categories.includes(key)).length;
}

/**
 * Figma "Filters" (33:1108 / 39:2061) + "Projects grid" (33:1129 / 39:2075).
 * Chips are toggle buttons (aria-pressed) that filter the grid client-side.
 * With an odd number of results the first card is the wide "featured" card,
 * so the two-column grid never leaves a gap.
 * Filtering runs in a transition, so cards crossfade and glide to their new
 * slots (<ViewTransition> per card) instead of teleporting.
 */
export function WorkGrid({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<FilterKey>("all");
  const gridId = useId();

  const visible = active === "all" ? projects : projects.filter((p) => p.categories.includes(active));
  const featureFirst = visible.length % 2 === 1;

  return (
    <>
      <section aria-label={t(work.filtersLabel, locale)} className="container-site pt-7 pb-2 lg:pt-[70px] lg:pb-[10px]">
        <div
          role="group"
          aria-label={t(work.filtersLabel, locale)}
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 lg:gap-[10px] [&::-webkit-scrollbar]:hidden"
        >
          {projectCategories.map((c) => {
            const pressed = active === c.key;
            return (
              <button
                key={c.key}
                type="button"
                aria-pressed={pressed}
                aria-label={`${t(c.label, locale)} (${countFor(c.key)})`}
                aria-controls={gridId}
                onClick={() => startTransition(() => setActive(c.key))}
                className={`t-label inline-flex shrink-0 cursor-pointer items-center gap-1.5 press rounded-full border px-3.5 py-[9px] whitespace-nowrap lg:gap-2 lg:px-[18px] lg:py-[11px] ${
                  pressed ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-purple"
                }`}
              >
                <span>{t(c.label, locale)}</span>
                <span
                  className={`rounded-full lg:px-2 lg:py-0.5 ${
                    pressed ? "text-lilac lg:bg-purple lg:text-white" : "text-purple lg:bg-lilac-soft"
                  }`}
                >
                  {countFor(c.key)}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="container-site pt-5 pb-16 lg:pt-[30px] lg:pb-[120px]">
        <p className="sr-only" role="status" aria-live="polite">
          {t(work.resultsStatus, locale).replace("{n}", String(visible.length))}
        </p>
        <ul id={gridId} className="grid gap-4 md:grid-cols-2 lg:gap-6">
          {visible.map((p, i) => {
            const featured = featureFirst && i === 0;
            return (
              <ViewTransition key={p.slug}>
                <li data-reveal style={{ "--i": i } as CSSProperties} className={featured ? "md:col-span-2" : undefined}>
                  <ProjectCard project={p} locale={locale} featured={featured} />
                </li>
              </ViewTransition>
            );
          })}
          <ViewTransition>
            <li data-reveal className="md:col-span-2">
              <NextProjectCard locale={locale} />
            </li>
          </ViewTransition>
        </ul>
      </section>
    </>
  );
}
