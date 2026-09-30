import { t, type Locale } from "@/lib/i18n";
import { home } from "@/content/home";
import { Eyebrow } from "@/components/Eyebrow";

/** "Why us / Values" — Figma 16:756 (desktop: 4 ruled columns) / 19:351 (mobile: 2×2 tiles). */
export function Values({ locale }: { locale: Locale }) {
  const c = home.values;
  return (
    <section className="bg-white">
      <div className="container-site flex flex-col gap-[18px] py-[72px] lg:gap-14 lg:py-[120px]">
        <div className="flex flex-col items-start gap-[18px] lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="flex flex-col items-start gap-[18px] lg:gap-[22px]">
            <Eyebrow>{t(c.eyebrow, locale)}</Eyebrow>
            <h2 className="t-h2 lg:max-w-[600px]">
              <span className="lg:block">{t(c.titleLine1, locale)}</span>{" "}
              <span className="lg:block">{t(c.titleLine2, locale)}</span>
            </h2>
          </div>
          <p className="t-body-m hidden w-[420px] text-muted lg:block">{t(c.lead, locale)}</p>
        </div>

        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-0">
          {c.items.map((v, i) => (
            <li
              key={v.number}
              className={`flex flex-col items-start gap-2 rounded-[20px] bg-canvas p-[18px] lg:gap-[14px] lg:rounded-none lg:bg-transparent lg:px-7 lg:py-2 ${
                i > 0 ? "lg:border-s lg:border-line" : ""
              }`}
            >
              <span className="font-serif text-[34px] leading-[1.1] tracking-[-0.5px] text-purple lg:text-[64px]">{v.number}</span>
              <h3 className="text-[15px] leading-[1.4] font-medium lg:text-[21px] lg:leading-[1.5]">{t(v.title, locale)}</h3>
              <p className="text-[13px] leading-[1.7] text-muted lg:text-[15px]">
                <span className="lg:hidden">{t(v.textMobile, locale)}</span>
                <span className="hidden lg:inline">{t(v.text, locale)}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
