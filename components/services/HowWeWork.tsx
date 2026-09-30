import { t, type Locale } from "@/lib/i18n";
import { servicesPage } from "@/content/services-page";
import { Eyebrow } from "@/components/Eyebrow";
import { Icon } from "@/components/Icon";

/** Figma 31:1047 "How we work" (desktop) + 38:2018 (mobile). */
export function HowWeWork({ locale }: { locale: Locale }) {
  const c = servicesPage.howWeWork;
  return (
    <section className="bg-ink py-16 text-white lg:py-[120px]">
      <div className="container-site flex flex-col gap-4 lg:gap-14">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="flex flex-col items-start gap-4 lg:gap-[22px]">
            <Eyebrow tone="dark">{t(c.eyebrow, locale)}</Eyebrow>
            <h2 className="t-h2 max-w-[640px]">
              {t(c.title, locale)}
              <span className="text-lilac">{t(c.titleAccent, locale)}</span>
            </h2>
          </div>
          <p className="t-body-m hidden max-w-[420px] text-on-dark-muted lg:block">{t(c.lead, locale)}</p>
        </div>

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {c.steps.map((s) => (
            <li
              key={s.number}
              className="flex items-start gap-[14px] rounded-[20px] bg-ink-soft p-[18px] lg:flex-col lg:gap-[18px] lg:rounded-[24px] lg:p-[30px]"
            >
              <div className="flex shrink-0 items-center justify-between lg:w-full">
                <span className="font-serif text-[30px] leading-[1.1] tracking-[-0.5px] text-lilac lg:text-[48px]">
                  {s.number}
                </span>
                <span className="hidden rounded-full bg-purple p-[13px] text-white lg:block">
                  <Icon name={s.icon} size={22} />
                </span>
              </div>
              <div className="flex flex-col gap-1 lg:gap-[18px]">
                <h3 className="t-label text-white lg:text-[21px] lg:leading-[1.5]">{t(s.title, locale)}</h3>
                <p className="t-body-s text-on-dark-muted">
                  <span className="lg:hidden">{t(s.textMobile, locale)}</span>
                  <span className="hidden lg:inline">{t(s.text, locale)}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
