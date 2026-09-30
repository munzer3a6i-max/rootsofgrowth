import Image from "next/image";
import { href, t, type Locale } from "@/lib/i18n";
import { home } from "@/content/home";
import { Mark } from "@/components/Brand";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";

/**
 * Home hero — Figma 16:358 (desktop, 1440×800) / 18:228 (mobile).
 * Copy on the start side, arch photo on the end side with the purple
 * roots badge overlapping the arch edge that faces the copy.
 */
export function Hero({ locale }: { locale: Locale }) {
  const c = home.hero;
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* Purple glow (end side) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[420px] -end-[160px] size-[420px] rounded-full bg-purple/45 blur-[120px] lg:top-[80px] lg:-end-[120px] lg:size-[700px] lg:blur-[200px]"
      />
      {/* Faint roots watermark (start side) */}
      <Mark
        size={760}
        className="absolute top-[260px] -start-[220px] hidden h-auto w-[760px] opacity-[0.04] lg:block"
      />

      <div className="container-site relative flex flex-col gap-6 pt-10 pb-14 lg:min-h-[800px] lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:pt-[70px] lg:pb-[70px]">
        {/* ——— Copy ——— */}
        <div className="contents lg:flex lg:max-w-[660px] lg:flex-1 lg:flex-col lg:items-start lg:gap-[30px] lg:pt-10">
          <p className="inline-flex items-center gap-2 self-start rounded-full border border-lilac/40 px-[14px] py-2 text-[12px] leading-[1.4] font-medium text-lilac lg:gap-[10px] lg:px-[18px] lg:py-[10px] lg:text-[14px]">
            <Icon name="sparkle" size={16} className="size-[14px] lg:size-4" />
            <span className="lg:hidden">{t(c.chipMobile, locale)}</span>
            <span className="hidden lg:inline">{t(c.chip, locale)}</span>
          </p>

          <h1
            className={`t-display ${
              locale === "ar" ? "lg:whitespace-nowrap lg:max-xl:text-[60px]" : "lg:text-[64px] lg:leading-[1.2] xl:text-[72px]"
            }`}
          >
            <span className="block">{t(c.titleLine1, locale)}</span>
            <span className="block">
              <span className="text-lilac">{t(c.titleAccent, locale)}</span>{" "}
              <br className="lg:hidden" />
              {t(c.titleRest, locale)}
            </span>
          </h1>

          <p className="t-body-l text-on-dark-muted lg:max-w-[600px] lg:font-normal">
            <span className="lg:hidden">{t(c.leadMobile, locale)}</span>
            <span className="hidden lg:inline">{t(c.lead, locale)}</span>
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:gap-[14px]">
            <Button href={href(locale, "/contact")} className="w-full sm:w-auto">
              {t(c.primary, locale)}
            </Button>
            <Button href={href(locale, "/work")} variant="outlineDark" icon={false} className="w-full sm:w-auto">
              {t(c.secondary, locale)}
            </Button>
          </div>

          {/* Meta (desktop: location | kinds; mobile: location only, under the photo) */}
          <div className="order-last flex items-center gap-7 text-on-dark-muted lg:order-none">
            <p className="inline-flex items-center gap-2 text-[13px] leading-[1.7] lg:text-[15px]">
              <Icon name="pin" size={18} className="size-4 lg:size-[18px]" />
              <span>{t(c.metaLocation, locale)}</span>
            </p>
            <span aria-hidden="true" className="hidden h-5 w-px bg-on-dark-muted/40 lg:block" />
            <p className="hidden items-center gap-2 text-[15px] leading-[1.7] lg:inline-flex">
              <Icon name="calendar" size={18} />
              <span>{t(c.metaKinds, locale)}</span>
            </p>
          </div>
        </div>

        {/* ——— Arch photo + badge ——— */}
        <div className="relative w-full max-w-[350px] self-center pb-5 sm:max-w-[420px] lg:w-[40%] lg:max-w-[500px] lg:shrink-0 lg:self-start lg:pb-0">
          <div className="relative me-[50px] aspect-[300/420] overflow-hidden rounded-t-[150px] rounded-b-[22px] lg:me-0 lg:aspect-[500/660] lg:rounded-t-[250px] lg:rounded-b-[28px]">
            <Image
              src="/images/hero_masmak.jpg"
              alt={t(c.imageAlt, locale)}
              fill
              priority
              sizes="(min-width: 1024px) 500px, 300px"
              className="object-cover"
            />
          </div>
          <div className="absolute end-[10px] bottom-[28px] flex size-[112px] items-center justify-center rounded-full border-[6px] border-ink bg-purple lg:end-auto lg:-start-[84px] lg:bottom-[2px] lg:size-[168px] lg:border-8">
            <Mark size={92} className="h-auto w-[60px] lg:w-[92px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
