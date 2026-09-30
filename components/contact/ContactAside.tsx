import { t, type Locale } from "@/lib/i18n";
import { contact } from "@/content/site";
import { contactPage } from "@/content/contact";
import { Mark } from "@/components/Brand";
import { Icon, type IconName } from "@/components/Icon";

/**
 * "What happens next" (Figma 35:1549 desktop card / 40:2246 full-width mobile band)
 * + "Follow us" card (35:1575, desktop only).
 */
export function ContactAside({ locale }: { locale: Locale }) {
  const n = contactPage.next;
  const socials: { name: IconName; url: string; label: string }[] = [
    { name: "instagram", url: contact.social.instagram, label: "Instagram" },
    { name: "x-social", url: contact.social.x, label: "X" },
    { name: "linkedin", url: contact.social.linkedin, label: "LinkedIn" },
  ];

  return (
    <aside className="-mx-5 flex flex-col gap-6 md:-mx-10 lg:mx-0 lg:w-[392px] lg:shrink-0">
      <div className="relative flex flex-col gap-4 overflow-hidden bg-ink px-5 py-16 md:px-10 lg:gap-[22px] lg:rounded-[28px] lg:p-[34px]">
        <Mark size={240} className="absolute top-[260px] -end-[70px] hidden opacity-[0.06] lg:block" />
        <p className="t-label relative inline-flex items-center gap-[10px] text-lilac lg:gap-3">
          <span aria-hidden="true" className="h-[2px] w-7 bg-current lg:w-9" />
          <span>{t(n.eyebrow, locale)}</span>
        </p>
        <ol className="relative flex flex-col gap-4 lg:gap-[22px]">
          {n.steps.map((step, i) => (
            <li key={i} data-reveal style={{ "--i": i } as React.CSSProperties} className="flex items-start gap-[14px] lg:gap-4">
              <span
                aria-hidden="true"
                className="font-serif flex size-[38px] shrink-0 items-center justify-center rounded-full bg-purple text-[18px] leading-[1.1] tracking-[-0.5px] text-white lg:size-11 lg:text-[20px]"
              >
                {i + 1}
              </span>
              <div className="flex flex-col gap-0.5 lg:max-w-[240px] lg:gap-1">
                <h3 className="t-label text-white lg:text-[21px] lg:leading-[1.5]">{t(step.title, locale)}</h3>
                <p className="t-body-s text-on-dark-muted">
                  <span className="lg:hidden">{t(step.textMobile, locale)}</span>
                  <span className="hidden lg:inline">{t(step.text, locale)}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="hidden flex-col gap-4 rounded-[28px] bg-white p-[30px] lg:flex">
        <h3 className="text-[21px] leading-[1.5] font-medium text-ink">{t(contactPage.follow, locale)}</h3>
        <ul className="flex gap-[10px]">
          {socials.map((s) => (
            <li key={s.name}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="press flex size-[42px] items-center justify-center rounded-full bg-lilac-soft text-purple hover:bg-purple hover:text-white"
              >
                <Icon name={s.name} size={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
