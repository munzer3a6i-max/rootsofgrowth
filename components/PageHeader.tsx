import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { href, t, type Locale } from "@/lib/i18n";
import { site } from "@/content/site";
import { Mark } from "./Brand";

export type Crumb = { label: string; path?: string };

/** Breadcrumb: "الرئيسية / … / current" (current in lilac). */
export function Breadcrumb({ locale, trail }: { locale: Locale; trail: Crumb[] }) {
  const all: Crumb[] = [{ label: t(site.breadcrumbHome, locale), path: "/" }, ...trail];
  return (
    <nav aria-label="Breadcrumb">
      <ol className="t-body-s flex flex-wrap items-center gap-2 lg:gap-[10px]">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={i} className="flex items-center gap-2 lg:gap-[10px]">
              {last || !c.path ? (
                <span className={last ? "text-lilac" : "text-on-dark-muted"} aria-current={last ? "page" : undefined}>
                  {c.label}
                </span>
              ) : (
                <Link href={href(locale, c.path)} className="text-on-dark-muted hover:text-white">
                  {c.label}
                </Link>
              )}
              {!last && <span className="text-on-dark-muted">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Inner-page "Page header" (About, Services, Work, Contact, Team, Service detail…).
 * Dark ink band, purple glow, faint roots mark, arch-shaped photo on the end side.
 * Figma: 1440×560 desktop (content 720w at top 90, arch 440×460 bottom-aligned),
 * mobile: stacked, arch 350×280.
 */
export function PageHeader({
  locale,
  trail,
  title,
  titleAccent,
  lead,
  image,
  imageAlt = "",
  children,
}: {
  locale: Locale;
  trail: Crumb[];
  /** First title line (white). */
  title: string;
  /** Second title line (lilac). */
  titleAccent?: string;
  lead?: string;
  image: string;
  imageAlt?: string;
  /** Optional extra content under the lead (buttons, meta…). */
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-[140px] top-[300px] size-[360px] rounded-full bg-purple/50 blur-[140px] lg:top-[120px] lg:size-[640px] lg:blur-[200px]"
      />
      <Mark size={620} className="absolute top-40 -start-[180px] hidden opacity-[0.04] lg:block" />

      <div className="container-site relative flex flex-col gap-6 pt-9 lg:min-h-[560px] lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:pt-[90px]">
        <div className="flex max-w-[720px] flex-col items-start gap-[18px] lg:gap-6">
          <div style={{ "--i": 0 } as CSSProperties} className="hero-fade">
            <Breadcrumb locale={locale} trail={trail} />
          </div>
          <h1 className="text-[42px] leading-[1.25] font-bold lg:text-[84px] lg:leading-[1.3] lg:tracking-[-1px]">
            <span style={{ "--i": 0 } as CSSProperties} className="hero-line block">{title}</span>
            {titleAccent && (
              <span style={{ "--i": 1 } as CSSProperties} className="hero-line block text-lilac">
                {titleAccent}
              </span>
            )}
          </h1>
          {lead && <p style={{ "--i": 1 } as CSSProperties} className="hero-fade t-body-l max-w-[600px] text-on-dark-muted lg:font-normal">{lead}</p>}
          {children && (
            <div style={{ "--i": 2 } as CSSProperties} className="hero-fade">
              {children}
            </div>
          )}
        </div>

        <div className="hero-arch relative mt-1.5 aspect-[350/280] w-full shrink-0 self-center overflow-hidden rounded-t-[999px] sm:max-w-[440px] lg:mt-[10px] lg:aspect-[440/460] lg:w-[440px] lg:self-end">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 440px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
