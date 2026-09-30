import Image from "next/image";
import Link from "next/link";
import { href, t, type Locale } from "@/lib/i18n";
import { services, type Service } from "@/content/services";
import { servicesPage } from "@/content/services-page";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Icon } from "@/components/Icon";

/** Figma 31:759 "Services list" (desktop) + 38:1885 (mobile). */
export function ServicesList({ locale }: { locale: Locale }) {
  const c = servicesPage.list;
  return (
    <section className="bg-canvas py-16 lg:py-[110px]">
      <div className="container-site flex flex-col gap-4 lg:gap-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="flex flex-col items-start gap-4 lg:gap-[22px]">
            <Eyebrow>{t(c.eyebrow, locale)}</Eyebrow>
            <h2 className="t-h2 text-ink">{t(c.title, locale)}</h2>
          </div>
          <p className="t-body-m hidden max-w-[440px] text-muted lg:block">{t(c.lead, locale)}</p>
        </div>

        <ul className="flex flex-col gap-4 lg:gap-8">
          {services.map((s, i) => (
            <li key={s.slug} id={s.slug} className="scroll-mt-28">
              <ServiceBlock locale={locale} service={s} alt={i % 2 === 1} priority={i === 0} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceBlock({
  locale,
  service: s,
  alt,
  priority,
}: {
  locale: Locale;
  service: Service;
  /** Even-numbered blocks: lilac background, image on the start side. */
  alt: boolean;
  priority?: boolean;
}) {
  const c = servicesPage.list;
  const mobile = servicesPage.mobile[s.slug];
  const detail = href(locale, `/services/${s.slug}`);
  return (
    <article
      className={`flex flex-col gap-3 overflow-hidden rounded-[22px] px-3 pt-3 pb-5 lg:flex-row lg:items-center lg:gap-16 lg:rounded-[32px] lg:p-6 ${
        alt ? "bg-lilac-soft" : "bg-white"
      }`}
    >
      <div
        className={`relative h-[180px] w-full shrink-0 overflow-hidden rounded-[14px] sm:h-[280px] lg:h-[380px] lg:w-[46%] lg:max-w-[520px] lg:rounded-[22px] ${
          alt ? "" : "lg:order-2"
        }`}
      >
        <Image
          src={s.image}
          alt={t(s.title, locale)}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 520px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start gap-2 px-1.5 lg:gap-[18px] lg:px-0">
        <div className="flex items-center gap-[10px]">
          <span className="font-serif text-[28px] leading-[1.1] tracking-[-0.5px] text-purple lg:text-[44px]">
            {s.number}
          </span>
          {mobile && (
            <span className="t-serif-italic text-[14px] leading-[1.3] text-muted lg:hidden" dir="ltr">
              {mobile.tag}
            </span>
          )}
        </div>
        <h3 className="text-[22px] leading-[1.45] font-medium text-ink lg:max-w-[560px] lg:text-[28px]">
          {t(s.title, locale)}
        </h3>
        <p className="t-body-s text-muted lg:hidden">{mobile ? t(mobile.summary, locale) : t(s.summary, locale)}</p>
        <p className="t-body-m hidden max-w-[560px] text-muted lg:block">{t(s.summary, locale)}</p>

        <ul className="hidden flex-col gap-[10px] lg:flex">
          {t(s.bullets, locale).map((b) => (
            <li key={b} className="flex items-center gap-[10px]">
              <span className="rounded-full bg-lilac-soft p-1 text-purple">
                <Icon name="check" size={14} strokeWidth={2} />
              </span>
              <span className="t-label text-ink">{b}</span>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href={detail}>{t(c.details, locale)}</Button>
          <Button href={href(locale, `/contact?service=${s.slug}`)} variant="outlineLight" icon={false}>
            {t(c.request, locale)}
          </Button>
        </div>

        <Link href={detail} className="t-label flex items-center gap-1.5 text-purple lg:hidden">
          <span>{t(c.details, locale)}</span>
          <Icon name="arrow-left" size={16} />
        </Link>
      </div>
    </article>
  );
}
