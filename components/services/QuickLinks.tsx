import { t, type Locale } from "@/lib/i18n";
import { services } from "@/content/services";
import { servicesPage } from "@/content/services-page";

/** Figma 31:734 "Service quick links" — anchor chips to each service block (desktop/tablet only). */
export function QuickLinks({ locale }: { locale: Locale }) {
  return (
    <nav aria-label={t(servicesPage.quickLinksLabel, locale)} className="hidden bg-white md:block">
      <ul className="container-site flex flex-wrap items-center justify-center gap-[10px] py-[26px]">
        {services.map((s) => (
          <li key={s.slug}>
            <a
              href={`#${s.slug}`}
              className="press flex items-center gap-2 rounded-full border border-line px-4 py-[9px] text-[15px] hover:border-purple hover:bg-lilac-soft"
            >
              <span className="t-serif-italic leading-[1.3] text-purple">{s.number}</span>
              <span className="leading-[1.4] font-medium text-ink">{t(s.title, locale)}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
