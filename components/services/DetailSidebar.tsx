import Link from "next/link";
import { href, t, type Locale } from "@/lib/i18n";
import { services } from "@/content/services";
import { contact } from "@/content/site";
import { brochurePath, serviceDetailLabels as L } from "@/content/service-detail";
import { Mark } from "@/components/Brand";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

/** Figma 32:938 "Sidebar" (desktop). On mobile only the help card shows (39:1935). */
export function DetailSidebar({ locale, slug }: { locale: Locale; slug: string }) {
  return (
    <aside className="flex flex-col gap-6 lg:w-[380px] lg:shrink-0">
      <nav
        aria-label={t(L.allServices, locale)}
        className="hidden flex-col gap-1.5 rounded-[24px] bg-white p-[26px] lg:flex"
      >
        <h2 className="t-h4 mb-2 font-medium text-ink">{t(L.allServices, locale)}</h2>
        {services.map((s) => {
          const active = s.slug === slug;
          return (
            <Link
              key={s.slug}
              href={href(locale, `/services/${s.slug}`)}
              aria-current={active ? "page" : undefined}
              className={`t-label flex items-center justify-between gap-3 rounded-[14px] px-4 py-[13px] transition-colors ${
                active ? "bg-purple text-white" : "bg-canvas text-ink hover:bg-lilac-soft"
              }`}
            >
              <span>{t(s.short, locale)}</span>
              <Icon name="arrow-left" size={16} className={active ? "" : "text-muted"} />
            </Link>
          );
        })}
      </nav>

      <div className="relative flex flex-col items-start gap-[14px] overflow-hidden rounded-[24px] bg-purple p-6 text-white lg:gap-4 lg:p-[30px]">
        <Mark size={200} className="absolute top-[150px] -end-[50px] hidden opacity-[0.12] lg:block" />
        <h2 className="relative text-[22px] leading-[1.45] font-medium lg:text-[28px]">{t(L.help.title, locale)}</h2>
        <p className="t-body-s relative text-lilac-soft">{t(L.help.text, locale)}</p>
        <a href={contact.phoneHref} className="t-label relative hidden items-center gap-[10px] hover:underline lg:flex">
          <span className="rounded-full bg-white/15 p-2">
            <Icon name="phone" size={16} />
          </span>
          <span dir="ltr">{contact.phoneDisplay}</span>
        </a>
        <a href={`mailto:${contact.email}`} className="t-label relative hidden items-center gap-[10px] hover:underline lg:flex">
          <span className="rounded-full bg-white/15 p-2">
            <Icon name="mail" size={16} />
          </span>
          <span dir="ltr">{contact.email}</span>
        </a>
        <Button href={href(locale, `/contact?service=${slug}`)} variant="light" className="relative w-full">
          {t(L.requestQuote, locale)}
        </Button>
      </div>

      <Link
        href={href(locale, brochurePath)}
        className="hidden items-center justify-between rounded-[24px] border border-line bg-white p-[22px] transition-colors hover:border-purple lg:flex"
      >
        <span className="t-h4 font-medium text-ink">{t(L.brochure, locale)}</span>
        <span className="rounded-full bg-lilac-soft p-3 text-purple">
          <Icon name="arrow-up-left" size={18} />
        </span>
      </Link>
    </aside>
  );
}
