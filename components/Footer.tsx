import Link from "next/link";
import { href, t, type Locale } from "@/lib/i18n";
import { contact, nav, site } from "@/content/site";
import { footerServiceSlugs, services } from "@/content/services";
import { Logo } from "./Brand";
import { Icon, type IconName } from "./Icon";

const socials: { name: IconName; url: string; label: string }[] = [
  { name: "instagram", url: contact.social.instagram, label: "Instagram" },
  { name: "x-social", url: contact.social.x, label: "X" },
  { name: "linkedin", url: contact.social.linkedin, label: "LinkedIn" },
];

function Socials({ size }: { size: "sm" | "lg" }) {
  return (
    <ul className="flex gap-[10px]">
      {socials.map((s) => (
        <li key={s.name}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className={`press flex rounded-full border border-white/25 text-white hover:border-white hover:bg-white/10 ${
              size === "lg" ? "p-[11px]" : "p-[10px]"
            }`}
          >
            <Icon name={s.name} size={size === "lg" ? 18 : 16} />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Site/Footer + Site/Mobile/Footer (mobile columns collapse into accordions). */
export function Footer({ locale }: { locale: Locale }) {
  const columns = [
    {
      title: t(site.footer.linksTitle, locale),
      links: nav.map((n) => ({ label: t(n.label, locale), href: href(locale, n.path) })),
    },
    {
      title: t(site.footer.servicesTitle, locale),
      links: footerServiceSlugs.map((slug) => {
        const s = services.find((x) => x.slug === slug)!;
        return { label: t(s.short, locale), href: href(locale, `/services/${s.slug}`) };
      }),
    },
    {
      title: t(site.footer.contactTitle, locale),
      links: [
        { label: contact.email, href: `mailto:${contact.email}` },
        { label: contact.phoneDisplay, href: contact.phoneHref, ltr: true },
        { label: t(contact.address, locale) },
      ],
    },
  ] as { title: string; links: { label: string; href?: string; ltr?: boolean }[] }[];

  const linkClass = "t-body-s text-on-dark-muted transition-colors hover:text-white";
  const renderLink = (l: { label: string; href?: string; ltr?: boolean }) =>
    l.href ? (
      l.href.startsWith("/") ? (
        <Link href={l.href} className={linkClass}>
          {l.label}
        </Link>
      ) : (
        <a href={l.href} className={linkClass} dir={l.ltr ? "ltr" : undefined}>
          {l.label}
        </a>
      )
    ) : (
      <span className="t-body-s text-on-dark-muted">{l.label}</span>
    );

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="container-site">
        {/* ——— Desktop ——— */}
        <div className="hidden lg:block">
          <div className="flex items-start justify-between gap-10 pt-[100px] pb-[70px]">
            <div className="flex flex-col items-start gap-6">
              <Logo variant="white" width={180} className="h-auto w-[180px]" />
              <p className="t-body-s w-[320px] text-on-dark-muted">{t(site.tagline, locale)}</p>
              <Socials size="lg" />
            </div>
            <div className="flex items-start gap-16 xl:gap-20">
              {columns.map((col) => (
                <div key={col.title} className="flex flex-col items-start gap-[14px]">
                  <p className="mb-1 text-[21px] leading-[1.5] font-medium">{col.title}</p>
                  {col.links.map((l) => (
                    <div key={l.label}>{renderLink(l)}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="h-px bg-white/12" />
          <div className="t-body-s flex items-center justify-between py-[26px] text-on-dark-muted">
            <p>{t(site.footer.rights, locale)}</p>
            <div className="flex gap-6">
              <span>{t(site.footer.privacy, locale)}</span>
              <span>{t(site.footer.terms, locale)}</span>
            </div>
          </div>
          <div aria-hidden="true" className="relative h-[260px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo-white-mono.svg"
              alt=""
              className="absolute top-[10px] left-0 h-auto w-full max-w-[1240px] opacity-5"
            />
          </div>
        </div>

        {/* ——— Mobile ——— */}
        <div className="flex flex-col items-start gap-[22px] pt-14 pb-7 lg:hidden">
          <Logo variant="white" width={140} className="h-auto w-[140px]" />
          <p className="t-body-s text-on-dark-muted">{t(site.tagline, locale)}</p>
          <div className="w-full">
            {columns.map((col) => (
              <details key={col.title} className="group border-t border-white/12">
                <summary className="t-label flex cursor-pointer list-none items-center justify-between py-4 text-white [&::-webkit-details-marker]:hidden">
                  <span>{col.title}</span>
                  <Icon
                    name="chevron-down"
                    size={18}
                    className="text-on-dark-muted transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="flex flex-col items-start gap-3 pb-5">
                  {col.links.map((l) => (
                    <div key={l.label}>{renderLink(l)}</div>
                  ))}
                </div>
              </details>
            ))}
          </div>
          <Socials size="sm" />
          <p className="t-body-s text-on-dark-muted">{t(site.footer.rights, locale)}</p>
        </div>
      </div>
    </footer>
  );
}
