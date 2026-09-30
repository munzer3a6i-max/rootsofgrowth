import { notFound } from "next/navigation";
import { isLocale, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { servicesPage } from "@/content/services-page";
import { QuickLinks } from "@/components/services/QuickLinks";
import { ServicesList } from "@/components/services/ServicesList";
import { HowWeWork } from "@/components/services/HowWeWork";
import { ServicesFaq } from "@/components/services/ServicesFaq";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/services",
    title: t(servicesPage.meta.title, locale),
    description: t(servicesPage.meta.description, locale),
    image: "/images/svc_exhibitions.jpg",
  });
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const h = servicesPage.header;
  return (
    <PageShell locale={locale} active="services">
      <PageHeader
        locale={locale}
        trail={[{ label: t(h.crumb, locale) }]}
        title={t(h.title, locale)}
        titleAccent={t(h.titleAccent, locale)}
        lead={t(h.lead, locale)}
        image="/images/svc_exhibitions.jpg"
        imageAlt={t(h.imageAlt, locale)}
      />
      <QuickLinks locale={locale} />
      <ServicesList locale={locale} />
      <HowWeWork locale={locale} />
      <ServicesFaq locale={locale} />
    </PageShell>
  );
}
