import Image from "next/image";
import { href, t, type Locale } from "@/lib/i18n";
import { home } from "@/content/home";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Icon } from "@/components/Icon";

/**
 * Home "Team" — Figma 16:781 (desktop: copy + 580×520 photo with floating card)
 * / 19:374 (mobile: photo between title and paragraph).
 */
export function Team({ locale }: { locale: Locale }) {
  const c = home.team;
  return (
    <section className="bg-canvas">
      <div className="container-site flex flex-col items-start gap-5 py-[72px] lg:flex-row lg:items-center lg:justify-between lg:gap-[60px] lg:py-[130px] xl:gap-[90px]">
        <div className="contents lg:flex lg:max-w-[560px] lg:flex-1 lg:flex-col lg:items-start lg:gap-7">
          <div data-reveal className="order-1 flex flex-col items-start gap-5 lg:order-none lg:gap-7">
            <Eyebrow>{t(c.eyebrow, locale)}</Eyebrow>
            <h2 className="t-h2">
              <span className="lg:block">{t(c.titleLine1, locale)}</span>{" "}
              <span className="lg:block">{t(c.titleLine2, locale)}</span>
            </h2>
          </div>
          <p className="t-body-l order-4 lg:order-none lg:font-normal">{t(c.lead, locale)}</p>
          <ul className="hidden flex-wrap gap-[10px] lg:flex">
            {c.chips.map((chip) => (
              <li
                key={chip.ar}
                className="rounded-full border border-line bg-white px-4 py-[9px] text-[14px] leading-[1.4] font-medium"
              >
                {t(chip, locale)}
              </li>
            ))}
          </ul>
          <Button href={href(locale, "/team")} className="order-5 lg:order-none">
            {t(c.cta, locale)}
          </Button>
        </div>

        <div className="relative order-3 w-full lg:order-none lg:max-w-[580px] lg:shrink-0 lg:basis-[47%] lg:pb-10">
          <div className="relative aspect-[350/260] overflow-hidden rounded-[22px] lg:aspect-[580/520] lg:rounded-[28px]">
            <Image
              src="/images/team.jpg"
              alt={t(c.imageAlt, locale)}
              fill
              sizes="(min-width: 1024px) 580px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute start-8 bottom-[14px] hidden items-center gap-[14px] rounded-[20px] bg-white px-[22px] py-[18px] shadow-[0_20px_40px_rgba(31,26,77,0.18)] lg:flex">
            <span className="flex rounded-full bg-purple p-3 text-white">
              <Icon name="users" size={22} />
            </span>
            <div className="flex flex-col items-start gap-[2px] whitespace-nowrap">
              <p className="text-[17px] leading-[1.5] font-medium">{t(c.cardTitle, locale)}</p>
              <p className="text-[13px] leading-[1.7] text-muted">{t(c.cardText, locale)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
