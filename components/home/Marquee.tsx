import { t, type Locale, type L } from "@/lib/i18n";
import { home } from "@/content/home";
import { Icon } from "@/components/Icon";

/**
 * Two crossed, slightly tilted ticker bands — Figma 16:609 (desktop, 150px tall)
 * / 18:461 (mobile: purple band only, 90px). Content is rendered twice for a
 * seamless `animate-marquee` loop.
 */
export function Marquee({ locale }: { locale: Locale }) {
  return (
    <section aria-label={home.marquee.purple.map((w) => t(w, locale)).join(" · ")} className="relative h-[90px] overflow-hidden bg-canvas lg:h-[150px]">
      <Band
        words={home.marquee.dark}
        locale={locale}
        className="top-[-7px] hidden rotate-[-2.2deg] bg-ink lg:block"
      />
      <Band
        words={home.marquee.purple}
        locale={locale}
        className="top-[35px] rotate-2 bg-purple lg:top-[69px] lg:rotate-[1.5deg]"
      />
    </section>
  );
}

function Band({ words, locale, className }: { words: L[]; locale: Locale; className: string }) {
  // Two repetitions per half so each half is wider than the viewport.
  const half = [...words, ...words];
  return (
    <div aria-hidden="true" dir="ltr" className={`absolute -start-[120px] -end-[120px] overflow-hidden ${className}`}>
      {/* Band + track are LTR-anchored so the shared `marquee` keyframes (translateX -50%) loop
          seamlessly in both locales; rows are reversed so Arabic still reads right-to-left. */}
      <div className="animate-marquee flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className={`flex shrink-0 items-center ${locale === "ar" ? "flex-row-reverse" : ""} gap-5 px-[10px] py-4 lg:gap-[34px] lg:px-[17px] lg:py-[22px]`}>
            {half.map((w, i) => (
              <li key={i} className={`flex items-center gap-5 lg:gap-[34px] ${locale === "ar" ? "flex-row-reverse" : ""}`}>
                <Icon name="sparkle" size={22} className="size-4 text-lilac lg:size-[22px]" />
                <span className="text-[20px] leading-[1.45] font-semibold whitespace-nowrap text-white lg:text-[30px] lg:font-medium">
                  {t(w, locale)}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
