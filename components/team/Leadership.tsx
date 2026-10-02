import Image from "next/image";
import { t, type Locale } from "@/lib/i18n";
import { leaders, team, type Leader } from "@/content/team";
import { SectionHead } from "@/components/about/SectionHead";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { ScrollDots } from "./ScrollDots";

/** Team · Leadership (Figma 41:2275 desktop / 42:2437 mobile — horizontal scroller). */
export function Leadership({ locale }: { locale: Locale }) {
  const c = team.leadership;
  return (
    <section className="overflow-hidden bg-white">
      <div className="container-site flex flex-col gap-4 py-16 lg:gap-14 lg:py-[120px]">
        <SectionHead
          eyebrow={t(c.eyebrow, locale)}
          title={t(c.title, locale)}
          side={{ text: t(c.side, locale), className: "max-w-[420px]" }}
        />

        {/* Mobile / tablet: snap scroller */}
        <div className="lg:hidden">
          <ul
            id="leaders-scroller"
            className="-mx-5 flex snap-x snap-mandatory gap-[14px] overflow-x-auto scroll-px-5 px-5 [scrollbar-width:none] md:-mx-10 md:scroll-px-10 md:px-10 [&::-webkit-scrollbar]:hidden"
          >
            {leaders.map((l, i) => (
              <li key={i} className="flex w-[260px] shrink-0 snap-start flex-col gap-[10px]">
                <Photo leader={l} locale={locale} className="h-[320px] rounded-t-[130px] rounded-b-[20px]" sizes="260px" />
                <div className="flex flex-col gap-[10px]">
                  <h3 className="text-[22px] leading-[1.45] font-medium text-ink">{t(l.name, locale)}</h3>
                  <p className="t-body-s text-purple">{t(l.role, locale)}</p>
                </div>
              </li>
            ))}
          </ul>
          <ScrollDots targetId="leaders-scroller" count={leaders.length} className="mt-4" />
        </div>

        {/* Desktop: three columns */}
        <ul className="hidden grid-cols-3 gap-6 lg:grid">
          {leaders.map((l, i) => (
            <li key={i} data-reveal style={{ "--i": i } as React.CSSProperties} className="flex flex-col gap-[18px]">
              <Photo
                leader={l}
                locale={locale}
                className="aspect-[397/440] rounded-t-[999px] rounded-b-[24px]"
                sizes="(min-width: 1440px) 397px, 30vw"
              />
              <div className="flex flex-col gap-1">
                <h3 className="t-h3 font-medium text-ink">{t(l.name, locale)}</h3>
                <p className="t-body-m text-purple">{t(l.role, locale)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Photo({
  leader,
  locale,
  className,
  sizes,
}: {
  leader: Leader;
  locale: Locale;
  className: string;
  sizes: string;
}) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {leader.photo ? (
        <Image src={leader.photo} alt={t(leader.name, locale)} fill sizes={sizes} className="object-cover object-top" />
      ) : (
        <PhotoPlaceholder />
      )}
    </div>
  );
}
