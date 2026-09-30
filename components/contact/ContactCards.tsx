import { t, type Locale } from "@/lib/i18n";
import { contact } from "@/content/site";
import { contactPage } from "@/content/contact";
import { Icon, type IconName } from "@/components/Icon";

/**
 * Contact cards (Figma 35:1433, mobile 40:2177): email · phone · address.
 * Desktop: 3 tall cards with an action link. Mobile: compact horizontal rows.
 * Each whole card is the link (mailto:, tel:, #map).
 */
export function ContactCards({ locale }: { locale: Locale }) {
  const c = contactPage.cards;
  const cards: { icon: IconName; label: string; value: string; action: string; href: string; ltr?: boolean }[] = [
    { icon: "mail", label: t(c.email.label, locale), value: contact.email, action: t(c.email.action, locale), href: `mailto:${contact.email}`, ltr: true },
    { icon: "phone", label: t(c.phone.label, locale), value: contact.phoneDisplay, action: t(c.phone.action, locale), href: contact.phoneHref, ltr: true },
    { icon: "pin", label: t(c.address.label, locale), value: t(contact.address, locale), action: t(c.address.action, locale), href: "#map" },
  ];

  return (
    <section className="bg-canvas pt-16 lg:pt-[90px] lg:pb-5">
      <ul className="container-site grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-6">
        {cards.map((card, i) => (
          <li key={card.icon} data-reveal style={{ "--i": i } as React.CSSProperties}>
            {/* Hover lift sits on the link, press scale on the inner surface, so
                the two transitions never override each other. */}
            <a
              href={card.href}
              className="group lift block h-full rounded-[18px] focus-visible:outline-2 focus-visible:outline-purple lg:rounded-[24px]"
            >
              <span className="press flex h-full items-center gap-3 rounded-[18px] bg-white px-4 py-[14px] lg:flex-col lg:items-start lg:gap-[14px] lg:rounded-[24px] lg:p-[30px]">
                <span className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-purple text-white lg:size-[50px]">
                  <Icon name={card.icon} size={22} className="size-[18px] lg:size-[22px]" />
                </span>
                <span className="flex min-w-0 flex-col gap-0.5 lg:gap-[14px]">
                  <span className="t-body-s text-muted">{card.label}</span>
                  <span
                    dir={card.ltr ? "ltr" : undefined}
                    className="t-label break-words text-ink rtl:text-end lg:text-[19px] lg:leading-[1.5] xl:text-[21px]"
                  >
                    {card.value}
                  </span>
                </span>
                <span className="t-label hidden items-center gap-[6px] text-purple lg:inline-flex">
                  <span className="group-hover:underline group-hover:underline-offset-4">{card.action}</span>
                  <Icon name="arrow-left" size={16} className="nudge" />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
