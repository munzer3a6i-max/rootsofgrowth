import { t, type Locale } from "@/lib/i18n";
import { about } from "@/content/about";
import { Mark } from "@/components/Brand";
import { Icon, type IconName } from "@/components/Icon";
import { SectionHead } from "./SectionHead";

/** About · Vision & Mission (Figma 30:582 desktop / 38:1657 mobile). */
export function VisionMission({ locale }: { locale: Locale }) {
  const c = about.visionMission;
  return (
    <section className="relative overflow-hidden bg-ink">
      <Mark size={560} className="absolute top-[300px] -end-[140px] hidden opacity-[0.04] lg:block" />
      <div className="container-site section-y relative flex flex-col gap-5 lg:gap-14">
        <SectionHead
          tone="dark"
          eyebrow={t(c.eyebrow, locale)}
          title={
            <>
              {t(c.title, locale)} <span className="text-lilac">{t(c.titleAccent, locale)}</span>
            </>
          }
          side={{ text: t(c.side, locale), className: "max-w-[440px]" }}
        />
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          <Card
            index={0}
            featured
            icon="target"
            title={t(c.vision.title, locale)}
            tag={c.vision.tag}
            body={t(c.vision.body, locale)}
          />
          <Card index={1} icon="check" title={t(c.mission.title, locale)} tag={c.mission.tag} body={t(c.mission.body, locale)} />
        </div>
      </div>
    </section>
  );
}

function Card({
  index,
  featured,
  icon,
  title,
  tag,
  body,
}: {
  /** Reveal stagger step. */
  index: number;
  featured?: boolean;
  icon: IconName;
  title: string;
  tag: string;
  body: string;
}) {
  return (
    <article
      data-reveal
      style={{ "--i": index } as React.CSSProperties}
      className={`flex flex-col gap-[14px] rounded-[24px] p-6 lg:gap-[26px] lg:rounded-[32px] lg:p-12 ${
        featured ? "bg-purple text-white" : "bg-white text-ink"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <h3 className="text-[22px] leading-[1.45] font-medium lg:text-[46px] lg:leading-[1.5] lg:font-bold">{title}</h3>
          <span
            lang="en"
            className={`t-serif-italic text-[15px] leading-[1.3] lg:hidden ${featured ? "text-lilac" : "text-purple"}`}
          >
            {tag}
          </span>
        </div>
        <span
          className={`flex shrink-0 items-center justify-center rounded-full p-[11px] lg:p-4 ${
            featured ? "bg-white/14 text-white" : "bg-lilac-soft text-purple"
          }`}
        >
          <Icon name={icon} size={30} className="size-[22px] lg:size-[30px]" />
        </span>
      </div>
      <p className="text-[16px] leading-[1.8] font-light lg:max-w-[512px] lg:text-[21px] lg:leading-[1.5] lg:font-medium">
        {body}
      </p>
    </article>
  );
}
