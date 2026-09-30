import Image from "next/image";
import { t, type Locale } from "@/lib/i18n";
import type { Project } from "@/content/projects";
import { projectDetailLabels as L } from "@/content/project-detail";
import { Breadcrumb } from "@/components/PageHeader";
import { Icon } from "@/components/Icon";

/**
 * Project hero — full-bleed photo with ink gradient (Figma 34:1239, 1440×680;
 * mobile 40:1990, 390×520). Breadcrumb (desktop), tag + date chips, display title;
 * mobile adds the title in the other language underneath.
 */
export function ProjectHero({ project, locale }: { project: Project; locale: Locale }) {
  const other: Locale = locale === "ar" ? "en" : "ar";
  return (
    <section className="relative isolate flex h-[520px] items-end overflow-hidden bg-ink text-white lg:h-[680px]">
      <Image src={project.image} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-ink/10 from-20% to-ink/96 lg:to-ink/95" />

      <div className="container-site pb-6 lg:pb-[121px]">
        <div className="flex max-w-[900px] flex-col items-start gap-3 lg:gap-5">
          <div className="hidden lg:block">
            <Breadcrumb
              locale={locale}
              trail={[{ label: t(L.crumbWork, locale), path: "/work" }, { label: t(project.title, locale) }]}
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5 lg:gap-2">
            <span className="t-body-s rounded-full bg-purple px-[10px] py-[5px] lg:t-label lg:px-3.5 lg:py-[7px]">
              {t(project.tag, locale)}
            </span>
            {project.date && (
              <span className="t-body-s inline-flex items-center gap-1.5 rounded-full bg-white/14 px-[10px] py-[5px] lg:t-label lg:px-3.5 lg:py-[7px]">
                <Icon name="calendar" size={14} className="size-3 lg:size-3.5" />
                <span>{t(project.date, locale)}</span>
              </span>
            )}
          </div>
          <h1 className="t-display">{t(project.title, locale)}</h1>
          <p
            lang={other}
            dir={other === "ar" ? "rtl" : "ltr"}
            className={`text-[18px] leading-[1.3] text-lilac lg:hidden ${other === "en" ? "t-serif-italic" : "font-medium"}`}
          >
            {t(project.title, other)}
          </p>
        </div>
      </div>
    </section>
  );
}
