import { t, type Locale } from "@/lib/i18n";
import { team } from "@/content/team";
import { contact } from "@/content/site";
import { Mark } from "@/components/Brand";
import { Button } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { EyebrowR } from "@/components/about/SectionHead";

/** Team · Careers card (#careers) (Figma 41:2523 desktop / 42:2548 mobile). */
export function Careers({ locale }: { locale: Locale }) {
  const c = team.careers;
  const mailto = `mailto:${contact.email}`;
  return (
    <section id="careers" className="bg-canvas">
      <div className="container-site py-16 lg:py-[110px]">
        <div className="relative flex flex-col gap-3 overflow-hidden rounded-[24px] bg-white p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:rounded-[32px] lg:px-14 lg:py-[52px]">
          <Mark variant="purple" size={300} className="absolute top-10 -end-10 hidden opacity-[0.06] lg:block" />
          <div className="relative flex flex-col items-start gap-3 lg:max-w-[640px] lg:gap-[14px]">
            <EyebrowR>{t(c.eyebrow, locale)}</EyebrowR>
            <h2 className="text-[22px] leading-[1.45] font-medium text-ink lg:text-[46px] lg:leading-[1.5] lg:font-bold">
              {t(c.title, locale)}
            </h2>
            <p className="t-body-s text-muted lg:text-[17px] lg:leading-[1.85] lg:font-light">{t(c.text, locale)}</p>
          </div>
          <div className="relative flex flex-col items-stretch gap-3 lg:items-end">
            <Button href={mailto} className="w-full lg:w-auto">
              {t(c.button, locale)}
            </Button>
            <a
              href={mailto}
              dir="ltr"
              className="t-label hidden items-center gap-2 text-muted transition-colors hover:text-purple lg:flex"
            >
              <span>{contact.email}</span>
              <Icon name="mail" size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
