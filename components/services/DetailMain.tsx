import Image from "next/image";
import { t, type Locale } from "@/lib/i18n";
import type { Service } from "@/content/services";
import { serviceDetailLabels as L, type ServiceDetail } from "@/content/service-detail";
import { Eyebrow } from "@/components/Eyebrow";
import { Icon } from "@/components/Icon";

/** Figma 32:1003 "Main" (desktop) + 39:1850 "Overview" (mobile). */
export function DetailMain({
  locale,
  service,
  detail,
}: {
  locale: Locale;
  service: Service;
  detail: ServiceDetail;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-start gap-4 lg:gap-[30px]">
      <div className="relative hidden h-[440px] w-full overflow-hidden rounded-[28px] lg:block">
        <Image
          src={service.image}
          alt={t(service.title, locale)}
          fill
          sizes="(min-width: 1440px) 812px, 60vw"
          className="object-cover"
        />
      </div>

      <Eyebrow>{t(L.overview, locale)}</Eyebrow>
      <h2 className="t-h2 text-ink">{t(detail.overviewTitle, locale)}</h2>
      <p className="t-body-l text-ink lg:font-normal">{t(detail.intro, locale)}</p>
      <p className="t-body-m text-muted">{t(detail.body, locale)}</p>

      <h3 className="t-h3 font-medium text-ink">{t(L.included, locale)}</h3>
      <ul className="grid w-full gap-4 md:grid-cols-2">
        {detail.included.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-3 rounded-[18px] bg-white p-4 lg:items-start lg:gap-[14px] lg:rounded-[20px] lg:p-[22px]"
          >
            <span className="shrink-0 rounded-full bg-lilac-soft p-2 text-purple lg:p-[9px]">
              <Icon name="check" size={16} strokeWidth={2} className="size-[14px] lg:size-4" />
            </span>
            <div className="flex flex-col gap-0.5 lg:gap-1.5">
              <h4 className="t-label text-ink lg:text-[21px] lg:leading-[1.5]">{t(item.title, locale)}</h4>
              <p className="t-body-s text-muted">{t(item.text, locale)}</p>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="t-h3 font-medium text-ink">{t(L.stages, locale)}</h3>
      <ol className="flex w-full flex-col gap-4 lg:gap-0">
        {detail.stages.map((s, i) => {
          const last = i === detail.stages.length - 1;
          return (
            <li key={i} className="flex items-start gap-[14px] lg:gap-5">
              <div className="flex shrink-0 flex-col items-center self-stretch">
                <span
                  className={`flex size-[34px] items-center justify-center rounded-full border-2 border-purple font-serif text-[16px] leading-[1.1] tracking-[-0.5px] lg:size-10 lg:text-[18px] ${
                    i === 0 ? "bg-purple text-white" : "bg-white text-purple"
                  }`}
                >
                  {i + 1}
                </span>
                {!last && <span aria-hidden="true" className="hidden w-[2px] flex-1 bg-line lg:block" />}
              </div>
              <div className={`flex flex-col gap-0.5 lg:gap-1 ${last ? "" : "lg:pb-[30px]"}`}>
                <h4 className="t-label text-ink lg:text-[21px] lg:leading-[1.5]">{t(s.title, locale)}</h4>
                <p className="t-body-s text-muted">{t(s.text, locale)}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <h3 className="t-h3 hidden font-medium text-ink lg:block">{t(L.gallery, locale)}</h3>
      <ul className="grid w-full grid-cols-2 gap-[10px] lg:grid-cols-3 lg:gap-4">
        {detail.gallery.map((g, i) => (
          <li
            key={g.src}
            className={`relative h-[210px] overflow-hidden rounded-[16px] sm:h-[280px] lg:h-[320px] lg:rounded-[20px] ${
              i > 1 ? "hidden lg:block" : ""
            }`}
          >
            <Image src={g.src} alt={t(g.alt, locale)} fill sizes="(min-width: 1024px) 260px, 50vw" className="object-cover" />
          </li>
        ))}
      </ul>
    </div>
  );
}
