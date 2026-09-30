import Image from "next/image";
import Link from "next/link";
import { href, t, type Locale } from "@/lib/i18n";
import type { Service } from "@/content/services";
import { serviceDetailLabels as L } from "@/content/service-detail";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Icon } from "@/components/Icon";

/** Figma 32:1127 "Other services" (desktop cards) + 39:1943 (mobile rows). */
export function RelatedServices({ locale, items }: { locale: Locale; items: Service[] }) {
  return (
    <section className="bg-white py-16 lg:py-[110px]">
      <div className="container-site flex flex-col gap-4 lg:gap-10">
        <div className="flex items-end justify-between gap-6">
          <div className="flex flex-col items-start gap-[14px] lg:gap-[22px]">
            <Eyebrow>{t(L.related.eyebrow, locale)}</Eyebrow>
            <h2 className="t-h2 text-ink">{t(L.related.title, locale)}</h2>
          </div>
          <div className="hidden shrink-0 lg:block">
            <Button href={href(locale, "/services")} variant="outlineLight">
              {t(L.allServices, locale)}
            </Button>
          </div>
        </div>

        <ul className="grid gap-[14px] md:grid-cols-3 lg:gap-6">
          {items.map((s) => (
            <li key={s.slug}>
              <Link
                href={href(locale, `/services/${s.slug}`)}
                className="group flex h-full items-center gap-[14px] rounded-[18px] bg-canvas p-[10px] transition-colors hover:bg-lilac-soft md:flex-col md:items-stretch md:gap-4 md:rounded-[24px] md:px-3 md:pt-3 md:pb-6"
              >
                <div className="relative size-[84px] shrink-0 overflow-hidden rounded-[12px] md:h-[220px] md:w-full md:rounded-[16px]">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 380px, 84px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5 md:gap-2 md:px-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-[18px] leading-[1.1] tracking-[-0.5px] text-purple md:text-[30px]">
                      {s.number}
                    </span>
                    <ArrowChip className="hidden md:block" />
                  </div>
                  <h3 className="t-label text-ink md:text-[21px] md:leading-[1.5]">{t(s.title, locale)}</h3>
                </div>
                <ArrowChip className="md:hidden" small />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ArrowChip({ className = "", small }: { className?: string; small?: boolean }) {
  return (
    <span className={`shrink-0 rounded-full border border-line text-ink ${small ? "p-2" : "p-[9px]"} ${className}`}>
      <Icon name="arrow-up-left" size={small ? 14 : 16} />
    </span>
  );
}
