import Image from "next/image";
import { ViewTransition } from "react";
import Link from "next/link";
import { href, t, type Locale } from "@/lib/i18n";
import { home } from "@/content/home";
import { getProject, type Project } from "@/content/projects";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Icon } from "@/components/Icon";

/**
 * Home "Work showcase" — Figma 16:668 (desktop: 816+400 row, then three equal
 * cards) / 19:283 (mobile: three stacked cards, pager, full-width button).
 */
export function WorkShowcase({ locale }: { locale: Locale }) {
  const c = home.work;
  const get = (slug: string) => getProject(slug)!;
  const mobileSet = new Set(c.mobile);
  return (
    <section className="bg-ink text-white">
      <div className="container-site flex flex-col gap-[18px] py-[72px] lg:gap-14 lg:py-[130px]">
        <div className="flex items-end justify-between gap-10">
          <div data-reveal className="flex flex-col items-start gap-[18px] lg:gap-[22px]">
            <Eyebrow tone="dark">{t(c.eyebrow, locale)}</Eyebrow>
            <h2 className="t-h2 lg:max-w-[600px]">
              <span className="lg:block">{t(c.titleLine1, locale)}</span>{" "}
              <span className="lg:block">{t(c.titleLine2, locale)}</span>
            </h2>
          </div>
          <div className="hidden shrink-0 lg:block">
            <Button href={href(locale, "/work")} variant="outlineDark">
              {t(c.cta, locale)}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-[816fr_400fr] lg:gap-6">
          {c.row1.map((slug, i) => (
            <ProjectTile
              key={slug}
              project={get(slug)}
              locale={locale}
              size={i === 0 ? "wide" : "tall"}
              index={i}
              className={i === 0 ? "h-[420px] md:col-span-2 lg:col-span-1 lg:h-[540px]" : "h-[300px] lg:h-[540px]"}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {c.row2.map((slug, i) => (
            <ProjectTile
              key={slug}
              project={get(slug)}
              locale={locale}
              size="regular"
              index={i}
              className={`h-[300px] lg:h-[460px] ${mobileSet.has(slug) ? "" : "hidden md:block"}`}
            />
          ))}
        </div>

        {/* Mobile pager (decorative) + full-width button */}
        <div aria-hidden="true" className="flex items-center gap-[6px] self-start md:hidden">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="size-2 rounded-[4px] bg-white/25" />
          ))}
          <span className="h-2 w-[22px] rounded-[4px] bg-lilac" />
        </div>
        <Button href={href(locale, "/work")} variant="outlineDark" className="w-full lg:hidden">
          {t(c.cta, locale)}
        </Button>
      </div>
    </section>
  );
}

function ProjectTile({
  project,
  locale,
  size,
  index,
  className,
}: {
  project: Project;
  locale: Locale;
  size: "wide" | "tall" | "regular";
  /** Position in its row, for the reveal stagger. */
  index: number;
  className: string;
}) {
  const wide = size === "wide";
  // Morphs into the project page hero on navigation (same name as ProjectHero).
  return (
    <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
    <Link
      href={href(locale, `/work/${project.slug}`)}
      data-reveal
      style={{ "--i": index } as React.CSSProperties}
      className={`group relative block overflow-hidden rounded-[22px] bg-ink-soft lg:rounded-[24px] ${className}`}
    >
      <Image
        src={project.image}
        alt=""
        fill
        sizes={wide ? "(min-width: 1024px) 816px, 100vw" : "(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"}
        className="media-zoom object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-ink/0 from-30% to-ink/92 lg:from-35%"
      />
      <div className="absolute start-5 end-5 bottom-5 flex flex-col items-start gap-[10px] lg:start-8 lg:end-[104px] lg:bottom-8 lg:gap-3">
        <div className="flex flex-wrap gap-[6px] lg:gap-2">
          <span className="rounded-full bg-purple px-[10px] py-[5px] text-[11px] leading-[1.4] font-medium lg:px-3 lg:py-[6px] lg:text-[13px]">
            {t(project.tag, locale)}
          </span>
          {wide && project.date && (
            <span className="inline-flex items-center gap-[6px] rounded-full bg-white/14 px-[10px] py-[5px] text-[11px] leading-[1.4] font-medium lg:px-3 lg:py-[6px] lg:text-[13px]">
              <Icon name="calendar" size={14} className="size-3 lg:size-[14px]" />
              {t(project.date, locale)}
            </span>
          )}
        </div>
        <h3
          className={`text-[22px] leading-[1.45] font-medium ${
            wide ? "lg:max-w-[520px] lg:text-[34px]" : "lg:max-w-[280px] lg:text-[24px]"
          }`}
        >
          {t(project.title, locale)}
        </h3>
      </div>
      <span className="absolute end-8 bottom-8 hidden rounded-full bg-white p-[14px] text-ink transition-colors group-hover:bg-purple group-hover:text-white lg:flex">
        <Icon name="arrow-up-left" size={20} className="nudge" />
      </span>
    </Link>
    </ViewTransition>
  );
}
