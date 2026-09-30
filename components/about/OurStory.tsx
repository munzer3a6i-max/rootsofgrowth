import Image from "next/image";
import { t, type Locale } from "@/lib/i18n";
import { about } from "@/content/about";
import { Mark } from "@/components/Brand";
import { EyebrowR } from "./SectionHead";

/** About · "Our story" (Figma 30:532 desktop / 38:1628 mobile). */
export function OurStory({ locale }: { locale: Locale }) {
  const c = about.story;
  return (
    <section className="bg-canvas">
      <div className="container-site section-y flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-[90px]">
        {/* Text (start side) */}
        <div className="flex flex-col items-start gap-5 lg:max-w-[590px] lg:gap-[26px]">
          <div data-reveal className="flex flex-col items-start gap-5 lg:gap-[26px]">
            <EyebrowR>{t(c.eyebrow, locale)}</EyebrowR>
            <h2 className="t-h2 text-ink">{t(c.title, locale)}</h2>
          </div>
          <p className="t-body-l text-ink lg:font-normal">{t(c.lead, locale)}</p>
          <p className="t-body-m hidden text-muted lg:block">{t(c.body, locale)}</p>
          <div className="hidden items-center gap-[14px] lg:flex">
            <Mark variant="purple" size={40} />
            <span className="text-[21px] leading-[1.5] font-medium text-ink">{t(c.signature, locale)}</span>
          </div>
        </div>

        {/* Mobile collage: arch photo + quote card (350×380) */}
        <div className="relative h-[380px] w-full max-w-[350px] shrink-0 lg:hidden">
          <div className="absolute start-0 top-0 h-[340px] w-[220px] overflow-hidden rounded-t-[110px] rounded-b-[20px]">
            <Image src="/images/about_building.jpg" alt={t(c.buildingAlt, locale)} fill sizes="220px" className="object-cover" />
          </div>
          <QuoteCard locale={locale} className="end-0 top-[190px] w-[200px] gap-[6px] rounded-[20px] p-5" mobile />
        </div>

        {/* Desktop collage (560×600) */}
        <div className="relative hidden h-[600px] w-[560px] shrink-0 lg:block">
          <div className="absolute start-0 top-0 h-[480px] w-[330px] overflow-hidden rounded-t-[165px] rounded-b-[24px]">
            <Image src="/images/about_building.jpg" alt={t(c.buildingAlt, locale)} fill sizes="330px" className="object-cover" />
          </div>
          <div className="absolute end-0 top-[200px] h-[320px] w-[260px] overflow-hidden rounded-[24px] border-[10px] border-canvas">
            <Image src="/images/svc_events.jpg" alt={t(c.eventAlt, locale)} fill sizes="260px" className="object-cover" />
          </div>
          <QuoteCard
            locale={locale}
            className="start-[18px] top-[420px] w-[272px] gap-[10px] rounded-[22px] p-[26px] shadow-[0_24px_48px_rgba(31,26,77,0.25)]"
          />
        </div>
      </div>
    </section>
  );
}

function QuoteCard({ locale, className, mobile }: { locale: Locale; className: string; mobile?: boolean }) {
  return (
    <figure className={`absolute flex flex-col items-start bg-purple text-white ${className}`}>
      <span
        aria-hidden="true"
        className={`font-serif leading-[1.1] tracking-[-0.5px] text-lilac ${mobile ? "h-11 text-[40px]" : "h-[62px] text-[56px]"}`}
      >
        “
      </span>
      <blockquote className={mobile ? "text-[15px] leading-[1.4] font-medium" : "text-[21px] leading-[1.5] font-medium"}>
        {t(about.story.quote, locale)}
      </blockquote>
    </figure>
  );
}
