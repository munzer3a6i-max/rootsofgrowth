import Link from "next/link";
import { href, t, type Locale } from "@/lib/i18n";
import { contact, nav, site, type NavKey } from "@/content/site";
import { Logo } from "./Brand";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileMenu } from "./MobileMenu";

/** Site/Announcement bar */
export function AnnouncementBar({ locale }: { locale: Locale }) {
  return (
    <div className="bg-purple text-white">
      <div className="container-site flex items-center justify-center gap-4 py-[10px] text-center lg:py-3">
        <p className="t-body-s hidden sm:block">{t(site.announcement.text, locale)}</p>
        <Link
          href={href(locale, "/contact")}
          className="t-label inline-flex shrink-0 items-center gap-[6px] underline-offset-4 hover:underline"
        >
          <span>{t(site.announcement.cta, locale)}</span>
          <Icon name="arrow-left" size={16} />
        </Link>
      </div>
    </div>
  );
}

/** Site/Navigation (desktop) + Site/Mobile/Navigation. */
export function Header({ locale, active }: { locale: Locale; active?: NavKey }) {
  const items = nav.map((item) => ({
    key: item.key,
    href: href(locale, item.path),
    label: t(item.label, locale),
  }));

  return (
    <header className="bg-ink">
      <div className="container-site flex items-center justify-between gap-6 py-4 lg:py-[22px]">
        <Link href={href(locale)} aria-label={t(site.name, locale)} className="shrink-0">
          <Logo variant="white" width={150} priority className="hidden h-auto w-[150px] lg:block" />
          <Logo variant="white" width={108} priority className="h-auto w-[108px] lg:hidden" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-9">
            {items.map((item) => {
              const isActive = item.key === active;
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`t-label group flex flex-col items-center gap-[6px] transition-colors ${
                      isActive ? "text-white" : "text-on-dark-muted hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      aria-hidden="true"
                      className={`h-[3px] w-[18px] rounded-[2px] bg-purple transition-opacity ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageSwitch locale={locale} />
          <Button href={href(locale, "/contact")}>{t(site.bookConsultation, locale)}</Button>
        </div>

        <div className="flex items-center gap-[10px] lg:hidden">
          <LanguageSwitch locale={locale} showGlobe={false} className="px-3" />
          <MobileMenu
            locale={locale}
            active={active}
            items={items}
            labels={{
              open: t(site.menu.open, locale),
              close: t(site.menu.close, locale),
              cta: t(site.bookConsultation, locale),
              ctaHref: href(locale, "/contact"),
              home: href(locale),
              name: t(site.name, locale),
            }}
            contact={{ phone: contact.phoneDisplay, phoneHref: contact.phoneHref, email: contact.email }}
          />
        </div>
      </div>
    </header>
  );
}
