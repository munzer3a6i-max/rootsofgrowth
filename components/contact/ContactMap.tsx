import { t, type Locale } from "@/lib/i18n";
import { contact } from "@/content/site";
import { contactPage } from "@/content/contact";
import { Button } from "@/components/Button";

/**
 * Map (Figma 35:1590 / mobile 40:2268) — slot "map_riyadh" → Google Maps embed.
 * Desktop: floating "Map card" on the end-bottom corner. Mobile: button below the map.
 */
export function ContactMap({ locale }: { locale: Locale }) {
  const q = encodeURIComponent(contact.mapQuery);
  const embed = `https://www.google.com/maps?q=${q}&hl=${locale}&z=11&output=embed`;
  const open = `https://www.google.com/maps/search/?api=1&query=${q}`;
  const m = contactPage.map;

  return (
    <section id="map" className="scroll-mt-6 bg-canvas py-16 lg:pt-0 lg:pb-[110px]">
      <div className="container-site flex flex-col gap-[14px]">
        <div className="relative h-[260px] overflow-hidden rounded-[24px] bg-[#e4e1ee] lg:h-[440px] lg:rounded-[32px]">
          <iframe
            src={embed}
            title={t(m.iframeTitle, locale)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
          <div className="absolute end-10 bottom-10 hidden flex-col items-start gap-3 rounded-[24px] bg-white p-7 shadow-[0_20px_40px_rgba(31,26,77,0.15)] lg:flex">
            <p className="t-body-s text-muted">{t(m.label, locale)}</p>
            <p className="text-[21px] leading-[1.5] font-medium text-ink">{t(contact.address, locale)}</p>
            <Button href={open} variant="outlineLight">
              {t(m.button, locale)}
            </Button>
          </div>
        </div>
        <Button href={open} variant="outlineLight" className="w-full lg:hidden">
          {t(m.button, locale)}
        </Button>
      </div>
    </section>
  );
}
