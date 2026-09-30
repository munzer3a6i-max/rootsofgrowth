import { t, type Locale } from "@/lib/i18n";
import { about } from "@/content/about";
import { Icon } from "@/components/Icon";
import { SectionHead } from "./SectionHead";

/** About · Values (Figma 30:619 desktop / 38:1682 mobile). */
export function Values({ locale }: { locale: Locale }) {
  const c = about.values;
  return (
    <section className="bg-canvas">
      <div className="container-site section-y flex flex-col gap-5 lg:gap-14">
        <SectionHead
          eyebrow={t(c.eyebrow, locale)}
          title={t(c.title, locale)}
          side={{ text: t(c.side, locale), className: "max-w-[420px]" }}
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {c.items.map((v) => (
            <li
              key={v.number}
              className="flex items-center gap-[14px] rounded-[20px] bg-white p-[18px] lg:flex-col lg:items-stretch lg:gap-4 lg:rounded-[24px] lg:p-[30px]"
            >
              <div className="contents lg:flex lg:items-center lg:justify-between">
                <span className="flex shrink-0 items-center justify-center rounded-full bg-lilac-soft p-[10px] text-purple lg:p-3">
                  <Icon name={v.icon} size={22} className="size-[18px] lg:size-[22px]" />
                </span>
                <span
                  aria-hidden="true"
                  className="order-last font-serif text-[30px] leading-[1.1] tracking-[-0.5px] text-lilac lg:order-none lg:text-[40px]"
                >
                  {v.number}
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1 lg:gap-4">
                <h3 className="text-[15px] leading-[1.4] font-medium text-ink lg:text-[21px] lg:leading-[1.5]">
                  {t(v.title, locale)}
                </h3>
                <p className="t-body-s text-muted">
                  <span className="lg:hidden">{t(v.textMobile, locale)}</span>
                  <span className="hidden lg:inline">{t(v.text, locale)}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
