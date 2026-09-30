import { t, type Locale } from "@/lib/i18n";
import { home } from "@/content/home";
import { contact } from "@/content/site";
import { services } from "@/content/services";
import { Eyebrow } from "@/components/Eyebrow";
import { Icon, type IconName } from "@/components/Icon";
import { HomeContactForm } from "./HomeContactForm";

/** Home "Contact" — Figma 16:819 (desktop: info + 700px form card) / 19:404 (mobile: stacked). */
export function Contact({ locale }: { locale: Locale }) {
  const c = home.contact;
  const f = c.form;
  const rows: { icon: IconName; label: string; value: string; href?: string; ltr?: boolean }[] = [
    { icon: "mail", label: t(c.emailLabel, locale), value: contact.email, href: `mailto:${contact.email}` },
    { icon: "phone", label: t(c.phoneLabel, locale), value: contact.phoneDisplay, href: contact.phoneHref, ltr: true },
    { icon: "pin", label: t(c.addressLabel, locale), value: t(contact.address, locale) },
  ];

  const labels = {
    title: t(f.title, locale),
    subtitle: t(f.subtitle, locale),
    name: t(f.name, locale),
    namePh: t(f.namePh, locale),
    company: t(f.company, locale),
    companyPh: t(f.companyPh, locale),
    phone: t(f.phone, locale),
    phonePh: f.phonePh,
    email: t(f.email, locale),
    emailPh: f.emailPh,
    service: t(f.service, locale),
    servicePh: t(f.servicePh, locale),
    date: t(f.date, locale),
    datePh: t(f.datePh, locale),
    message: t(f.message, locale),
    messagePh: t(f.messagePh, locale),
    messagePhMobile: t(f.messagePhMobile, locale),
    privacy: t(f.privacy, locale),
    submit: t(f.submit, locale),
    sending: t(f.sending, locale),
    successTitle: t(f.successTitle, locale),
    successText: t(f.successText, locale),
    again: t(f.again, locale),
    errors: Object.fromEntries(Object.entries(f.errors).map(([k, v]) => [k, t(v, locale)])),
  };
  const serviceOptions = [
    ...services.map((s) => ({ value: s.slug, label: t(s.title, locale) })),
    { value: "other", label: t(f.otherService, locale) },
  ];

  return (
    <section id="contact" className="bg-canvas">
      <div className="container-site flex flex-col items-start gap-4 py-[72px] lg:flex-row lg:justify-between lg:gap-12 lg:py-[130px] xl:gap-20">
        <div className="flex w-full flex-col items-start gap-4 lg:max-w-[460px] lg:gap-7">
          <Eyebrow>{t(c.eyebrow, locale)}</Eyebrow>
          <h2 className="t-h2">
            <span className="lg:block">{t(c.titleLine1, locale)}</span>{" "}
            <span className="lg:block">{t(c.titleLine2, locale)}</span>
          </h2>
          <p className="t-body-m hidden text-muted lg:block">{t(c.lead, locale)}</p>
          <ul className="flex w-full flex-col gap-4 lg:gap-7">
            {rows.map((r) => {
              const inner = (
                <>
                  <span className="flex shrink-0 rounded-full bg-lilac-soft p-[10px] text-purple lg:p-[13px]">
                    <Icon name={r.icon} size={22} className="size-[18px] lg:size-[22px]" />
                  </span>
                  <span className="flex min-w-0 flex-col items-start gap-[2px]">
                    <span className="text-[12px] leading-[1.7] text-muted lg:text-[13px]">{r.label}</span>
                    <span
                      dir={r.ltr ? "ltr" : undefined}
                      className="text-[15px] leading-[1.4] font-medium [overflow-wrap:anywhere] text-ink lg:text-[18px] lg:leading-[1.5]"
                    >
                      {r.value}
                    </span>
                  </span>
                </>
              );
              const cls =
                "flex w-full items-center gap-3 rounded-[18px] bg-white px-4 py-[14px] lg:gap-4 lg:rounded-[20px] lg:px-5 lg:py-[18px]";
              return (
                <li key={r.icon}>
                  {r.href ? (
                    <a href={r.href} className={`${cls} transition-shadow hover:shadow-[0_12px_30px_rgba(31,26,77,0.08)]`}>
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <HomeContactForm locale={locale} labels={labels} services={serviceOptions} />
      </div>
    </section>
  );
}
