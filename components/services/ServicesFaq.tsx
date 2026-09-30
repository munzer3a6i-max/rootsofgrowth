import { href, t, type Locale } from "@/lib/i18n";
import { servicesPage } from "@/content/services-page";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Icon } from "@/components/Icon";

/** Figma 31:1092 "FAQ" (desktop) + 38:2043 (mobile). Native <details> accordion, first item open. */
export function ServicesFaq({ locale }: { locale: Locale }) {
  const c = servicesPage.faq;
  return (
    <section className="bg-canvas py-16 lg:py-[120px]">
      <div className="container-site flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-20">
        <div data-reveal className="flex flex-col items-start gap-3 lg:w-[400px] lg:shrink-0 lg:gap-[22px]">
          <Eyebrow>{t(c.eyebrow, locale)}</Eyebrow>
          <h2 className="t-h2 text-ink">
            <span className="block">{t(c.title, locale)}</span>
            <span className="hidden lg:block">{t(c.titleSecond, locale)}</span>
          </h2>
          <p className="t-body-m hidden text-muted lg:block">{t(c.lead, locale)}</p>
          <div className="hidden lg:block">
            <Button href={href(locale, "/contact")}>{t(c.button, locale)}</Button>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          {c.items.map((item, i) => (
            <details
              key={i}
              open={i === 0}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="group rounded-[18px] border border-line p-[18px] open:border-transparent open:bg-white lg:rounded-[20px] lg:px-7 lg:py-6"
            >
              <summary className="group/q flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                <span className="t-label text-ink transition-colors duration-150 group-hover/q:text-purple lg:text-[21px] lg:leading-[1.5]">
                  {t(item.q, locale)}
                </span>
                <span className="shrink-0 rounded-full bg-lilac-soft p-1.5 text-purple transition-colors duration-200 group-open:bg-purple group-open:text-white lg:p-2">
                  <Icon
                    name="chevron-down"
                    size={16}
                    className="size-[14px] transition-transform duration-200 ease-out group-open:rotate-180 lg:size-4"
                  />
                </span>
              </summary>
              <p className="t-body-s mt-[10px] text-muted lg:mt-[14px] lg:max-w-[640px] lg:text-[17px] lg:leading-[1.85] lg:font-light">
                {t(item.a, locale)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
