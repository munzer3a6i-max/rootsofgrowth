import { href, t, type Locale } from "@/lib/i18n";
import { contact, site } from "@/content/site";
import { Mark } from "./Brand";
import { Button } from "./Button";
import { Icon } from "./Icon";

/** Site/CTA band + Site/Mobile/CTA band — closing call to action on every page. */
export function CtaBand({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-hidden bg-purple text-white">
      <Mark
        size={420}
        className="absolute -top-[138px] -start-[40px] hidden rotate-180 opacity-10 lg:block"
      />
      <Mark size={360} className="absolute top-[240px] -end-20 hidden opacity-10 lg:block" />
      <Mark size={260} className="absolute -top-[60px] -start-[90px] opacity-10 lg:hidden" />

      <div className="container-site relative flex flex-col items-center gap-[18px] py-[72px] text-center lg:gap-[26px] lg:py-[110px]">
        <Mark size={56} className="h-auto w-11 lg:w-14" />
        <h2 className="max-w-[1200px] text-[30px] leading-[1.35] font-bold whitespace-pre-line lg:text-[60px] lg:leading-[1.25] lg:tracking-[-0.5px]">
          <span className="lg:hidden">{t(site.cta.titleMobile, locale)}</span>
          <span className="hidden lg:inline">{t(site.cta.title, locale)}</span>
        </h2>
        <div className="flex w-full flex-col items-center gap-[14px] sm:w-auto sm:flex-row">
          <Button href={href(locale, "/contact")} variant="light" className="w-full sm:w-auto">
            {t(site.cta.button, locale)}
          </Button>
          <a
            href={contact.phoneHref}
            className="t-button hidden items-center gap-[10px] rounded-full border-[1.5px] border-white/50 px-[26px] py-[15px] transition-colors hover:bg-white/10 sm:inline-flex"
          >
            <span dir="ltr">{contact.phoneLocal}</span>
            <Icon name="phone" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
