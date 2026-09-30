import Image from "next/image";
import Link from "next/link";
import { href, t, type Locale } from "@/lib/i18n";
import { home } from "@/content/home";
import { services } from "@/content/services";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Icon } from "@/components/Icon";

/**
 * Home "Services" — Figma 16:485 (desktop: 4×2 photo cards) / 18:347 (mobile:
 * compact list rows with a 96px thumbnail).
 */
export function Services({ locale }: { locale: Locale }) {
  const c = home.services;
  return (
    <section className="bg-canvas">
      <div className="container-site flex flex-col gap-4 py-[72px] lg:gap-14 lg:py-[130px]">
        <div className="flex flex-col items-start gap-4 pb-[6px] lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:pb-0">
          <div className="flex flex-col items-start gap-4 lg:gap-[22px]">
            <Eyebrow>{t(c.eyebrow, locale)}</Eyebrow>
            <h2 className="t-h2 lg:max-w-[620px]">
              <span className="lg:block">{t(c.titleLine1, locale)}</span>{" "}
              <span className="lg:block">{t(c.titleLine2, locale)}</span>
            </h2>
          </div>
          <div className="hidden flex-col items-end gap-5 lg:flex">
            <p className="t-body-m w-[420px] text-muted">{t(c.lead, locale)}</p>
            <Button href={href(locale, "/contact")} variant="outlineLight">
              {t(c.cta, locale)}
            </Button>
          </div>
        </div>

        {/* Desktop / tablet grid */}
        <ul className="hidden gap-x-6 gap-y-14 md:grid md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.slug} className="flex">
              <Link
                href={href(locale, `/services/${s.slug}`)}
                className="group flex w-full flex-col gap-[18px] rounded-[24px] bg-white px-3 pt-3 pb-[26px] transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(31,26,77,0.10)]"
              >
                <div className="relative h-[200px] overflow-hidden rounded-[16px]">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 268px, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-[10px] px-[14px]">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-[30px] leading-[1.1] tracking-[-0.5px] text-purple">{s.number}</span>
                    <span className="flex rounded-full border border-line p-[9px] text-ink transition-colors group-hover:border-purple group-hover:bg-purple group-hover:text-white">
                      <Icon name="arrow-up-left" size={16} />
                    </span>
                  </div>
                  <h3 className="text-[19px] leading-[1.5] font-medium">{t(s.title, locale)}</h3>
                  <p className="text-[14px] leading-[1.7] text-muted">{t(c.blurbs[s.slug], locale)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile list */}
        <ul className="flex flex-col gap-4 md:hidden">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={href(locale, `/services/${s.slug}`)}
                className="flex items-center gap-[14px] rounded-[20px] bg-white p-[10px]"
              >
                <div className="relative size-24 shrink-0 overflow-hidden rounded-[14px]">
                  <Image src={s.image} alt="" fill sizes="96px" className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
                  <span className="font-serif text-[20px] leading-[1.1] tracking-[-0.5px] text-purple">{s.number}</span>
                  <h3 className="max-w-[180px] text-[15px] leading-[1.4] font-medium">
                    {t(c.mobileTitle[s.slug] ?? s.title, locale)}
                  </h3>
                  {locale === "ar" && (
                    <span className="t-serif-italic text-[13px] leading-[1.3] text-muted" lang="en">
                      {c.mobileSub[s.slug]}
                    </span>
                  )}
                </div>
                <span className="flex shrink-0 rounded-full border border-line p-2 text-ink">
                  <Icon name="arrow-up-left" size={14} />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="lg:hidden">
          <Button href={href(locale, "/contact")} variant="outlineLight">
            {t(c.cta, locale)}
          </Button>
        </div>
      </div>
    </section>
  );
}
