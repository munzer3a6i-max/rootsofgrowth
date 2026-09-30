import { notFound } from "next/navigation";
import { isLocale, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { contactPage } from "@/content/contact";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { ContactCards } from "@/components/contact/ContactCards";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactAside } from "@/components/contact/ContactAside";
import { ContactMap } from "@/components/contact/ContactMap";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/contact",
    title: t(contactPage.meta.title, locale),
    description: t(contactPage.meta.description, locale),
    image: contactPage.header.image,
  });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const h = contactPage.header;
  const lead = "t-body-l max-w-[600px] text-on-dark-muted lg:font-normal";

  return (
    <PageShell locale={locale} active="contact" cta={false}>
      <PageHeader
        locale={locale}
        trail={[{ label: t(h.crumb, locale) }]}
        title={t(h.title, locale)}
        titleAccent={t(h.titleAccent, locale)}
        image={h.image}
        imageAlt={t(h.imageAlt, locale)}
      >
        <p className={`${lead} lg:hidden`}>{t(h.leadMobile, locale)}</p>
        <p className={`${lead} hidden lg:block`}>{t(h.lead, locale)}</p>
      </PageHeader>

      <ContactCards locale={locale} />

      <section className="bg-canvas pt-6 lg:pt-10 lg:pb-[110px]">
        <div className="container-site flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-12">
          <ContactForm locale={locale} className="min-w-0 flex-1" />
          <ContactAside locale={locale} />
        </div>
      </section>

      <ContactMap locale={locale} />
    </PageShell>
  );
}
