import type { CSSProperties } from "react";
import Image from "next/image";
import { href, t, type Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/metadata";
import { contact } from "@/content/site";
import type { Project } from "@/content/projects";
import { projectDetailLabels as L, type ProjectDetail } from "@/content/project-detail";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/Button";
import { Mark } from "@/components/Brand";
import { Icon, type IconName } from "@/components/Icon";

/**
 * Project body (Figma 34:1302 / mobile 40:2040): main column (about, role
 * checklist, gallery) on the start side, sticky sidebar (similar-project card +
 * share) on the end side — sidebar is desktop only, as in the mobile design.
 */
export function ProjectBody({ project, detail, locale }: { project: Project; detail: ProjectDetail; locale: Locale }) {
  return (
    <section className="bg-canvas">
      <div className="container-site flex flex-col gap-16 pt-16 pb-16 lg:flex-row lg:items-start lg:py-[110px]">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-4 lg:gap-[26px]">
          <Eyebrow>{t(L.eyebrow, locale)}</Eyebrow>
          <h2 className="t-h2 text-ink">{t(detail.heading, locale)}</h2>
          <p className="t-body-l text-ink lg:font-normal">{t(detail.intro, locale)}</p>

          <h3 className="text-[22px] leading-[1.45] font-medium text-ink lg:text-[28px]">{t(L.roleTitle, locale)}</h3>
          <ul className="flex flex-col gap-4 lg:gap-3">
            {detail.roles.map((r) => (
              <li key={r.en} className="flex items-center gap-[10px] lg:gap-3">
                <span className="rounded-full bg-lilac-soft p-1 text-purple lg:p-[5px]">
                  <Icon name="check" size={14} className="size-3 lg:size-3.5" strokeWidth={2.2} />
                </span>
                <span className="text-[15px] leading-[1.7] font-light text-ink lg:text-[17px] lg:leading-[1.85]">
                  {t(r, locale)}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="text-[22px] leading-[1.45] font-medium text-ink lg:text-[28px]">{t(L.galleryTitle, locale)}</h3>
          <Gallery project={project} detail={detail} locale={locale} />
        </div>

        <aside className="hidden w-[360px] shrink-0 flex-col gap-6 lg:sticky lg:top-6 lg:flex">
          <SimilarCard locale={locale} />
          <ShareCard project={project} locale={locale} />
        </aside>
      </div>
    </section>
  );
}

function Gallery({ project, detail, locale }: { project: Project; detail: ProjectDetail; locale: Locale }) {
  const title = t(project.title, locale);
  return (
    <ul className="grid w-full grid-cols-2 gap-x-[10px] gap-y-4 lg:grid-cols-6 lg:gap-4">
      {detail.gallery.map((img, i) => {
        const size =
          i === 0
            ? "col-span-2 h-[240px] lg:col-span-3 lg:h-[300px]"
            : i === 1
              ? "aspect-square lg:col-span-3 lg:aspect-auto lg:h-[300px]"
              : "aspect-square lg:col-span-2 lg:aspect-auto lg:h-[220px]";
        const alt = img.alt ? t(img.alt, locale) : t(L.galleryAlt, locale).replace("{title}", title);
        return (
          <li key={img.src} data-reveal style={{ "--i": i } as CSSProperties} className={`relative overflow-hidden rounded-[20px] bg-ink-soft ${size}`}>
            <Image
              src={img.src}
              alt={alt}
              fill
              sizes={i < 2 ? "(min-width: 1024px) 400px, 100vw" : "(min-width: 1024px) 262px, 50vw"}
              className="object-cover"
            />
          </li>
        );
      })}
    </ul>
  );
}

function SimilarCard({ locale }: { locale: Locale }) {
  const c = L.similar;
  return (
    <div className="relative flex flex-col items-start gap-[18px] overflow-hidden rounded-[24px] bg-ink p-[30px] text-white">
      <Mark size={220} className="absolute top-[120px] -end-[60px] opacity-[0.07]" />
      <h2 className="relative text-[28px] leading-[1.45] font-medium">{t(c.title, locale)}</h2>
      <p className="t-body-s relative text-on-dark-muted">{t(c.lead, locale)}</p>
      <Button href={href(locale, c.href)} className="relative w-full">
        {t(c.cta, locale)}
      </Button>
    </div>
  );
}

function ShareCard({ project, locale }: { project: Project; locale: Locale }) {
  const url = `${siteUrl}${href(locale, `/work/${project.slug}`)}`;
  const text = t(project.title, locale);
  const links: { icon: IconName; label: string; href: string }[] = [
    { icon: "instagram", label: t(L.share.instagram, locale), href: contact.social.instagram },
    {
      icon: "x-social",
      label: t(L.share.x, locale),
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    },
    {
      icon: "linkedin",
      label: t(L.share.linkedin, locale),
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];
  return (
    <div className="flex items-center justify-between rounded-[24px] bg-white p-[22px]">
      <p className="t-label text-ink">{t(L.share.title, locale)}</p>
      <ul className="flex gap-2">
        {links.map((l) => (
          <li key={l.icon}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.label}
              className="press flex rounded-full border border-line p-[10px] text-ink hover:border-purple hover:text-purple"
            >
              <Icon name={l.icon} size={16} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
