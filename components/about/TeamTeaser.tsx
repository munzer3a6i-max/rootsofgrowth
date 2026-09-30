import Image from "next/image";
import { href, t, type Locale } from "@/lib/i18n";
import { about } from "@/content/about";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { SectionHead } from "./SectionHead";

/** About · Team (#team) (Figma 30:702 desktop / 38:1757 mobile). */
export function TeamTeaser({ locale }: { locale: Locale }) {
  const c = about.team;
  return (
    <section id="team" className="bg-canvas">
      <div className="container-site section-y flex flex-col gap-5 lg:gap-14">
        <SectionHead
          eyebrow={t(c.eyebrow, locale)}
          title={t(c.title, locale)}
          lead={t(c.lead, locale)}
          titleWidth="lg:max-w-[720px]"
          aside={
            <div className="hidden shrink-0 lg:block">
              <Button href={href(locale, "/team#careers")} variant="outlineLight">
                {t(c.button, locale)}
              </Button>
            </div>
          }
        />
        <div className="relative h-[240px] overflow-hidden rounded-[22px] sm:h-[360px] lg:h-[520px] lg:rounded-[32px]">
          <Image src="/images/team.jpg" alt={t(c.imageAlt, locale)} fill sizes="(min-width: 1440px) 1240px, 100vw" className="object-cover" />
        </div>
        <ul className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {c.roles.map((r) => (
            <li
              key={r.icon}
              className="flex items-center gap-3 rounded-[18px] bg-white p-4 lg:items-start lg:gap-[18px] lg:rounded-[24px] lg:p-7"
            >
              <span className="flex shrink-0 items-center justify-center rounded-full bg-purple p-[10px] text-white lg:p-[14px]">
                <Icon name={r.icon} size={22} className="size-[18px] lg:size-[22px]" />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-[15px] leading-[1.4] font-medium text-ink lg:text-[21px] lg:leading-[1.5]">
                  {t(r.title, locale)}
                </h3>
                <p className="t-body-s hidden text-muted lg:block">{t(r.text, locale)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
