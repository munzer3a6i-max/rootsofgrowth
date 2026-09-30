import Link from "next/link";
import { href, t, type Locale } from "@/lib/i18n";
import { projects, type Project } from "@/content/projects";
import { getProjectDetail, projectDetailLabels as L } from "@/content/project-detail";
import { Icon } from "@/components/Icon";

/** Previous / next neighbours, cycling through content/projects.ts order. */
export function neighbours(slug: string): { prev: Project; next: Project } {
  const i = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  return { prev: projects[(i - 1 + n) % n], next: projects[(i + 1) % n] };
}

/** Prev / Next strip — Figma 34:1406 (desktop) / 40:2088 (mobile). */
export function ProjectPager({ slug, locale }: { slug: string; locale: Locale }) {
  const { prev, next } = neighbours(slug);
  const short = (p: Project) => t(getProjectDetail(p.slug)?.shortTitle ?? p.title, locale);

  return (
    <nav aria-label={t(L.pager, locale)} className="border-b border-line bg-white">
      <div className="container-site flex items-center justify-between gap-4 py-5 lg:py-11">
        <Link href={href(locale, `/work/${prev.slug}`)} rel="prev" className="group flex min-w-0 items-center gap-4">
          <span className="hidden rounded-full border border-line p-3.5 text-ink transition-colors group-hover:border-purple group-hover:text-purple lg:flex">
            <Icon name="arrow-left" size={20} className="rotate-180" />
          </span>
          <span className="flex min-w-0 flex-col items-start lg:gap-0.5">
            <span className="t-body-s text-muted">
              <span className="lg:hidden">{t(L.prevShort, locale)}</span>
              <span className="hidden lg:inline">{t(L.prev, locale)}</span>
            </span>
            <span className="t-label text-ink transition-colors duration-200 group-hover:text-purple lg:text-[21px] lg:leading-[1.5]">
              <span className="lg:hidden">{short(prev)}</span>
              <span className="hidden lg:inline">{t(prev.title, locale)}</span>
            </span>
          </span>
        </Link>

        <Link href={href(locale, "/work")} className="t-label hidden shrink-0 text-purple transition-colors duration-200 hover:text-purple-deep lg:block">
          {t(L.all, locale)}
        </Link>

        <Link href={href(locale, `/work/${next.slug}`)} rel="next" className="group flex min-w-0 items-center gap-[10px] lg:gap-4">
          <span className="flex min-w-0 flex-col items-start lg:gap-0.5">
            <span className="t-body-s text-muted">
              <span className="lg:hidden">{t(L.nextShort, locale)}</span>
              <span className="hidden lg:inline">{t(L.next, locale)}</span>
            </span>
            <span className="t-label text-ink transition-colors duration-200 group-hover:text-purple lg:text-[21px] lg:leading-[1.5]">
              <span className="lg:hidden">{short(next)}</span>
              <span className="hidden lg:inline">{t(next.title, locale)}</span>
            </span>
          </span>
          <span className="flex rounded-full bg-purple p-[10px] text-white transition-colors group-hover:bg-purple-deep lg:p-3.5">
            <Icon name="arrow-left" size={20} className="nudge size-4 lg:size-5" />
          </span>
        </Link>
      </div>
    </nav>
  );
}
