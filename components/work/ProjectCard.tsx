import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { href, t, type Locale } from "@/lib/i18n";
import type { Project } from "@/content/projects";
import { work } from "@/content/work";
import { Icon } from "@/components/Icon";

/**
 * Portfolio card — Figma "Project / …" (33:1130 featured, 33:1157 regular; mobile 39:2076).
 * Full-bleed photo, bottom ink gradient, tag chips + title on the start side,
 * white "عرض المشروع" pill on the end side (desktop only).
 */
export function ProjectCard({
  project,
  locale,
  featured = false,
}: {
  project: Project;
  locale: Locale;
  featured?: boolean;
}) {
  // The card morphs into the project page hero (same view-transition name).
  return (
    <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
    <Link
      href={href(locale, `/work/${project.slug}`)}
      transitionTypes={["morph"]}
      className={`group relative block overflow-hidden rounded-[22px] bg-ink lg:rounded-[28px] ${
        featured ? "h-[440px] lg:h-[600px]" : "h-[320px] md:h-[400px] lg:h-[520px]"
      }`}
    >
      <Image
        src={project.image}
        alt=""
        fill
        sizes={featured ? "(min-width: 1440px) 1240px, 100vw" : "(min-width: 1440px) 608px, (min-width: 768px) 50vw, 100vw"}
        className="media-zoom object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-ink/0 from-30% to-ink/94" />

      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-6 lg:inset-x-9 lg:bottom-9">
        <div className={`flex flex-col items-start gap-[10px] lg:gap-3 ${featured ? "lg:max-w-[620px]" : "lg:max-w-[352px]"}`}>
          <div className="flex flex-wrap items-center gap-1.5 lg:gap-2">
            <span className="t-body-s rounded-full bg-purple px-[10px] py-[5px] text-white lg:t-label lg:px-3 lg:py-1.5">
              {t(project.tag, locale)}
            </span>
            {project.date && (
              <span className="t-body-s inline-flex items-center gap-1.5 rounded-full bg-white/14 px-[10px] py-[5px] text-white lg:t-label lg:px-3 lg:py-1.5">
                <Icon name="calendar" size={14} className="size-3 lg:size-3.5" />
                <span>{t(project.date, locale)}</span>
              </span>
            )}
          </div>
          <h2
            className={`text-[22px] leading-[1.45] font-medium text-white ${
              featured ? "lg:text-[60px] lg:leading-[1.25] lg:font-bold lg:tracking-[-0.5px]" : "lg:text-[28px]"
            }`}
          >
            {t(project.title, locale)}
          </h2>
        </div>

        <span className="t-label hidden shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3.5 text-ink transition-colors duration-200 group-hover:bg-lilac-soft lg:inline-flex">
          <span>{t(work.viewProject, locale)}</span>
          <Icon name="arrow-up-left" size={18} className="nudge" />
        </span>
      </div>
    </Link>
    </ViewTransition>
  );
}
