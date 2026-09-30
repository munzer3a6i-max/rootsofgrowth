import { t, type Locale } from "@/lib/i18n";
import { home } from "@/content/home";
import { Mark } from "@/components/Brand";
import { Eyebrow } from "@/components/Eyebrow";
import { Icon, type IconName } from "@/components/Icon";

/** "Vision & Mission" — Figma 16:447 (desktop) / 18:322 (mobile). */
export function VisionMission({ locale }: { locale: Locale }) {
  const c = home.vision;
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <Mark size={520} className="absolute top-[240px] -end-[120px] hidden h-auto w-[520px] opacity-[0.04] lg:block" />
      <div className="container-site relative flex flex-col items-start gap-5 py-[72px] lg:flex-row lg:items-center lg:gap-16 lg:py-[130px]">
        <div className="flex flex-col items-start gap-5 lg:w-[360px] lg:shrink-0 lg:gap-[26px]">
          <Eyebrow tone="dark">{t(c.eyebrow, locale)}</Eyebrow>
          <h2 className="text-[30px] leading-[1.35] font-bold lg:text-[60px] lg:leading-[1.25] lg:tracking-[-0.5px]">
            <span className="lg:block">{t(c.title, locale)}</span>{" "}
            <span className="text-lilac lg:block">{t(c.titleAccent, locale)}</span>
          </h2>
          <p className="t-body-m hidden text-on-dark-muted lg:block">{t(c.lead, locale)}</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:flex-1 lg:gap-6">
          <Card
            locale={locale}
            tone="purple"
            icon="target"
            title={t(c.visionTitle, locale)}
            sub="Vision"
            text={t(c.visionText, locale)}
          >
            <span className="inline-flex items-center gap-[6px] rounded-full bg-white/14 px-[14px] py-[7px] text-[13px] leading-[1.4] font-medium">
              <Icon name="pin" size={14} />
              {t(c.visionTag, locale)}
            </span>
          </Card>
          <Card
            locale={locale}
            tone="white"
            icon="check"
            title={t(c.missionTitle, locale)}
            sub="Mission"
            text={t(c.missionText, locale)}
          >
            {c.missionTags.map((tag) => (
              <span
                key={tag.ar}
                className="rounded-full bg-lilac-soft px-[14px] py-[7px] text-[13px] leading-[1.4] font-medium text-purple"
              >
                {t(tag, locale)}
              </span>
            ))}
          </Card>
        </div>
      </div>
    </section>
  );
}

function Card({
  locale,
  tone,
  icon,
  title,
  sub,
  text,
  children,
}: {
  locale: Locale;
  tone: "purple" | "white";
  icon: IconName;
  title: string;
  sub: string;
  text: string;
  children: React.ReactNode;
}) {
  const purple = tone === "purple";
  return (
    <article
      className={`flex flex-col items-start gap-4 rounded-[24px] p-[26px] lg:min-h-[470px] lg:gap-[26px] lg:rounded-[28px] lg:p-10 ${
        purple ? "bg-purple text-white lg:shadow-[0_30px_60px_-10px_rgba(94,77,194,0.35)]" : "bg-white text-ink"
      }`}
    >
      <div className="flex w-full items-center justify-between gap-4 lg:justify-start">
        <div className="order-1 flex flex-col items-start lg:order-2">
          <h3 className="text-[22px] leading-[1.45] font-medium lg:text-[32px]">{title}</h3>
          {locale === "ar" && (
            <p className={`t-serif-italic text-[15px] leading-[1.3] lg:hidden ${purple ? "text-lilac" : "text-purple"}`}>{sub}</p>
          )}
        </div>
        <span
          className={`order-2 flex rounded-full p-[11px] lg:order-1 lg:p-[14px] ${
            purple ? "bg-white/14 text-white" : "bg-lilac-soft text-purple"
          }`}
        >
          <Icon name={icon} size={26} className="size-[22px] lg:size-[26px]" />
        </span>
      </div>
      <span aria-hidden="true" className={`hidden h-px w-full lg:block ${purple ? "bg-white/20" : "bg-line"}`} />
      <p className="text-[16px] leading-[1.8] font-light lg:text-[19px] lg:leading-[1.85]">{text}</p>
      <div className="hidden flex-wrap gap-2 lg:flex">{children}</div>
    </article>
  );
}
