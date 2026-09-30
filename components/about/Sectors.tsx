import Image from "next/image";
import Link from "next/link";
import { href, t, type Locale } from "@/lib/i18n";
import { about } from "@/content/about";
import { SectionHead } from "./SectionHead";

/** About · Sectors we serve (Figma 30:663 desktop / 38:1722 mobile). Cards link to the portfolio. */
export function Sectors({ locale }: { locale: Locale }) {
  const c = about.sectors;
  return (
    <section className="bg-white">
      <div className="container-site flex flex-col gap-5 py-16 lg:gap-12 lg:py-[120px]">
        <SectionHead eyebrow={t(c.eyebrow, locale)} title={t(c.title, locale)} titleWidth="lg:max-w-[700px]" />
        <ul className="grid grid-cols-2 gap-x-3 gap-y-5 lg:grid-cols-4 lg:gap-6">
          {c.items.map((s) => (
            <li key={s.image}>
              <Link href={href(locale, "/work")} className="group flex flex-col gap-[10px] lg:gap-4">
                <div className="relative h-[150px] overflow-hidden rounded-[16px] lg:h-[240px] lg:rounded-[20px]">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 292px, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-[15px] leading-[1.4] font-medium text-ink transition-colors group-hover:text-purple lg:text-[21px] lg:leading-[1.5]">
                  {t(s.title, locale)}
                </h3>
                <p className="t-body-s hidden text-muted lg:block">{t(s.text, locale)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
