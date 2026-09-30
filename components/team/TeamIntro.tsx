import { t, type Locale } from "@/lib/i18n";
import { team } from "@/content/team";
import { Icon } from "@/components/Icon";
import { SectionHead } from "@/components/about/SectionHead";

/** Team · Intro + pillars (Figma 41:2240 desktop / 42:2409 mobile). */
export function TeamIntro({ locale }: { locale: Locale }) {
  const c = team.intro;
  return (
    <section className="bg-canvas">
      <div className="container-site flex flex-col gap-[14px] py-16 lg:gap-14 lg:py-[120px]">
        <SectionHead
          eyebrow={t(c.eyebrow, locale)}
          title={
            <>
              {t(c.titleLead, locale)}
              <br className="hidden lg:block" /> {t(c.titleMid, locale)}{" "}
              <span className="text-purple">{t(c.titleAccent, locale)}</span>
            </>
          }
          side={{
            text: t(c.side, locale),
            className: "max-w-[520px] text-ink! font-normal! lg:text-[20px]! lg:leading-[1.85]!",
          }}
        />
        <ul className="grid gap-[14px] lg:grid-cols-3 lg:gap-6">
          {c.pillars.map((p, i) => (
            <li
              key={p.icon}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className={`flex items-center gap-[14px] rounded-[20px] p-[18px] lg:flex-col lg:items-start lg:gap-4 lg:rounded-[28px] lg:p-8 ${
                p.featured ? "bg-purple" : "bg-white"
              }`}
            >
              <span
                className={`flex shrink-0 items-center justify-center rounded-full p-[11px] lg:p-[14px] ${
                  p.featured ? "bg-white/15 text-white" : "bg-lilac-soft text-purple"
                }`}
              >
                <Icon name={p.icon} size={24} className="size-5 lg:size-6" />
              </span>
              <div className="flex flex-col gap-[2px] lg:gap-4">
                <h3
                  className={`text-[15px] leading-[1.4] font-medium lg:text-[28px] lg:leading-[1.45] ${
                    p.featured ? "text-white" : "text-ink"
                  }`}
                >
                  {t(p.title, locale)}
                </h3>
                <p
                  className={`text-[15px] leading-[1.7] font-normal lg:text-[17px] lg:leading-[1.85] lg:font-light ${
                    p.featured ? "text-lilac-soft" : "text-muted"
                  }`}
                >
                  <span className="lg:hidden">{t(p.textMobile, locale)}</span>
                  <span className="hidden lg:inline">{t(p.text, locale)}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
