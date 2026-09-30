import { Fragment } from "react";
import { t, type Locale } from "@/lib/i18n";
import { about } from "@/content/about";

/** About · Facts strip (Figma 30:570 desktop / 38:1647 mobile). */
export function FactsStrip({ locale }: { locale: Locale }) {
  return (
    <section className="bg-white">
      {/* Mobile: stacked rows with dividers */}
      <div className="container-site flex flex-col py-8 lg:hidden">
        {about.facts.map((f) => (
          <div
            key={f.value}
            className="flex items-center justify-between gap-4 border-b border-line py-[14px] last:border-b-0"
          >
            <p className="font-serif text-[44px] leading-[1.1] tracking-[-0.5px] text-purple">{f.value}</p>
            <p className="w-[220px] text-[15px] leading-[1.7] font-normal text-muted">{t(f.labelMobile, locale)}</p>
          </div>
        ))}
      </div>

      {/* Desktop: one row, 1×72 dividers */}
      <div className="container-site hidden items-center justify-between py-14 lg:flex">
        {about.facts.map((f, i) => (
          <Fragment key={f.value}>
            {i > 0 && <span aria-hidden="true" className="h-[72px] w-px bg-line" />}
            <div className="flex items-center gap-5">
              <p className="font-serif text-[72px] leading-[1.1] tracking-[-0.5px] text-purple">{f.value}</p>
              <p className="w-[200px] text-[17px] leading-[1.85] font-light whitespace-pre-line text-muted">
                {t(f.label, locale)}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
