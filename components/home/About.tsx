import Image from "next/image";
import { href, t, type Locale } from "@/lib/i18n";
import { home } from "@/content/home";
import { Mark } from "@/components/Brand";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Icon } from "@/components/Icon";

/**
 * Home "About" — Figma 16:399 (desktop: copy + 560×640 collage) / 18:278 (mobile:
 * collage sits between the lead and the feature list). The copy wrapper is
 * `display: contents` on mobile so its children can be re-ordered around the collage.
 */
export function About({ locale }: { locale: Locale }) {
  const c = home.about;
  return (
    <section className="bg-canvas">
      <div className="container-site flex flex-col items-start gap-[22px] py-[72px] lg:flex-row lg:items-center lg:justify-between lg:gap-[60px] lg:py-[130px] xl:gap-[90px]">
        <div className="contents lg:flex lg:min-w-0 lg:max-w-[590px] lg:flex-1 lg:flex-col lg:items-start lg:gap-7">
          <Eyebrow className="order-1 lg:order-none">{t(c.eyebrow, locale)}</Eyebrow>
          <h2 className="t-h2 order-2 lg:order-none">{t(c.title, locale)}</h2>
          <p className="t-body-l order-3 lg:order-none lg:font-normal">{t(c.lead, locale)}</p>
          <p className="t-body-m hidden text-muted lg:block">{t(c.body, locale)}</p>
          <ul className="order-5 grid grid-cols-1 gap-3 lg:order-none lg:grid-cols-2 xl:grid-cols-[auto_auto] xl:justify-start lg:gap-x-6 lg:gap-y-4">
            {c.features.map((f) => (
              <li key={f.ar} className="flex items-center gap-[10px] text-[15px] leading-[1.4] font-medium lg:gap-3 xl:whitespace-nowrap">
                <span className="flex rounded-full bg-lilac-soft p-[5px] text-purple lg:p-[6px]">
                  <Icon name="check" size={16} className="size-[14px] lg:size-4" />
                </span>
                <span>{t(f, locale)}</span>
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="hidden h-px w-full bg-line lg:block" />
          <Button href={href(locale, "/services")} variant="outlineLight" className="order-6 lg:order-none">
            {t(c.cta, locale)}
          </Button>
        </div>

        {/* Collage — same 7:8 ratio on both breakpoints (350×400 / 560×640). */}
        <div className="relative order-4 mx-auto aspect-[350/400] w-full max-w-[350px] sm:max-w-[460px] lg:order-none lg:mx-0 lg:max-w-[560px] lg:shrink-0 lg:basis-[45%]">
          <div className="absolute start-0 top-0 h-[90%] w-[68.57%] overflow-hidden rounded-t-[120px] rounded-b-[20px] lg:h-[87.5%] lg:w-[67.86%] lg:rounded-t-[190px] lg:rounded-b-[24px]">
            <Image
              src="/images/about_building.jpg"
              alt={t(c.buildingAlt, locale)}
              fill
              sizes="(min-width: 1024px) 380px, 240px"
              className="object-cover"
            />
          </div>
          <div className="absolute end-0 top-[6.25%] hidden aspect-square w-[44.64%] overflow-hidden rounded-full border-[10px] border-canvas lg:block">
            <Image
              src="/images/svc_events.jpg"
              alt={t(c.eventAlt, locale)}
              fill
              sizes="250px"
              className="object-cover"
            />
          </div>
          <div className="absolute end-0 top-1/2 flex flex-col items-start gap-[6px] rounded-[22px] bg-purple p-[22px] text-white shadow-[0_18px_36px_rgba(31,26,77,0.25)] lg:end-[3.57%] lg:top-[54.7%] lg:gap-[10px] lg:rounded-[28px] lg:p-8 lg:shadow-[0_24px_48px_rgba(31,26,77,0.25)]">
            <Mark size={44} className="hidden h-auto w-11 opacity-90 lg:block" />
            <p className="font-serif text-[60px] leading-[1.1] lg:text-[84px]">{c.statNumber}</p>
            <p className="w-[150px] text-[13px] leading-[1.7] text-lilac-soft lg:hidden">{t(c.statMobile, locale)}</p>
            <p className="t-body-m hidden w-[236px] whitespace-pre-line text-lilac-soft lg:block">{t(c.stat, locale)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
