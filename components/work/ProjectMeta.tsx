import { Fragment } from "react";
import { t, type L as Lang, type Locale } from "@/lib/i18n";
import type { Project } from "@/content/projects";
import { projectDetailLabels as L, type ProjectDetail } from "@/content/project-detail";
import { Icon, type IconName } from "@/components/Icon";

/**
 * Project meta strip (Figma 34:1267 desktop row with dividers; 40:2012 mobile list).
 * Reading order: service, location, period, sector. Items without data are skipped.
 */
export function ProjectMeta({ project, detail, locale }: { project: Project; detail: ProjectDetail; locale: Locale }) {
  const items = (
    [
      { icon: "sparkle", label: L.meta.service, value: detail.service },
      { icon: "pin", label: L.meta.location, value: project.location },
      { icon: "calendar", label: L.meta.period, value: project.date },
      { icon: "globe", label: L.meta.sector, value: detail.sector },
    ] as { icon: IconName; label: Lang; value?: Lang }[]
  ).filter((i): i is { icon: IconName; label: Lang; value: Lang } => Boolean(i.value));

  return (
    <section className="bg-white">
      <div className="container-site py-3 lg:flex lg:items-center lg:justify-between lg:py-9">
        {items.map((item, i) => (
          <Fragment key={item.icon}>
            {i > 0 && <div aria-hidden="true" className="hidden h-12 w-px bg-line lg:block" />}
            <div className="flex items-center justify-between gap-4 border-b border-line py-3.5 last:border-b-0 lg:justify-start lg:gap-3.5 lg:border-b-0 lg:py-0">
              <div className="flex items-center gap-[10px] lg:contents">
                <span className="text-purple lg:rounded-full lg:bg-lilac-soft lg:p-3">
                  <Icon name={item.icon} size={20} className="size-[18px] lg:size-5" />
                </span>
                <span className="t-body-s text-muted lg:hidden">{t(item.label, locale)}</span>
              </div>
              <div className="flex flex-col items-end lg:items-start lg:gap-0.5">
                <span className="t-body-s hidden text-muted lg:block">{t(item.label, locale)}</span>
                <span className="t-label text-ink lg:text-[21px] lg:leading-[1.5]">{t(item.value, locale)}</span>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
