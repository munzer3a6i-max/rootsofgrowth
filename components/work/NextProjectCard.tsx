import { href, t, type Locale } from "@/lib/i18n";
import { work } from "@/content/work";
import { Button } from "@/components/Button";
import { Mark } from "@/components/Brand";

/** "مشروعك القادم هنا" dashed card closing the grid — Figma 33:1242 / 39:2161. */
export function NextProjectCard({ locale }: { locale: Locale }) {
  const c = work.next;
  return (
    <div className="flex flex-col items-start gap-3 rounded-[22px] border-2 border-dashed border-purple bg-lilac-soft p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:rounded-[28px] lg:px-14 lg:py-12">
      <div className="flex items-center gap-6">
        <Mark variant="purple" size={64} className="hidden lg:block" />
        <div className="flex flex-col items-start gap-3 lg:gap-2">
          <h2 className="text-[22px] leading-[1.45] font-medium text-ink lg:text-[46px] lg:leading-[1.5] lg:font-bold">
            {t(c.title, locale)}
          </h2>
          <p className="t-body-s text-muted lg:t-body-m lg:max-w-[560px]">
            <span className="lg:hidden">{t(c.leadMobile, locale)}</span>
            <span className="hidden lg:inline">{t(c.lead, locale)}</span>
          </p>
        </div>
      </div>
      <Button href={href(locale, c.href)} className="w-full lg:w-auto">
        {t(c.cta, locale)}
      </Button>
    </div>
  );
}
