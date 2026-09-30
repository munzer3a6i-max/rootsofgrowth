import { notFound } from "next/navigation";
import { href, isLocale, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { getService, services, type Service } from "@/content/services";
import { brochurePath, getServiceDetail, serviceDetailLabels as L } from "@/content/service-detail";
import { DetailMain } from "@/components/services/DetailMain";
import { DetailSidebar } from "@/components/services/DetailSidebar";
import { RelatedServices } from "@/components/services/RelatedServices";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/services/[slug]">) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!isLocale(locale) || !service) return {};
  return pageMetadata({
    locale,
    path: `/services/${slug}`,
    title: t(service.title, locale),
    description: t(service.summary, locale),
    image: service.image,
  });
}

export default async function ServiceDetailPage({ params }: PageProps<"/[locale]/services/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const service = getService(slug);
  const detail = getServiceDetail(slug);
  if (!service || !detail) notFound();

  const [line1, line2] = t(detail.titleLines, locale);
  const related = detail.related.map(getService).filter((s): s is Service => Boolean(s));

  return (
    <PageShell locale={locale} active="services">
      <PageHeader
        locale={locale}
        trail={[{ label: t(L.servicesCrumb, locale), path: "/services" }, { label: t(service.title, locale) }]}
        title={line1}
        titleAccent={line2}
        lead={t(service.summary, locale)}
        image={service.image}
        imageAlt={t(service.title, locale)}
      >
        <div className="flex w-full flex-col gap-[10px] sm:w-auto sm:flex-row sm:gap-3">
          <Button href={href(locale, `/contact?service=${slug}`)}>{t(L.requestQuote, locale)}</Button>
          <Button href={href(locale, brochurePath)} variant="outlineDark" icon={false}>
            {t(L.downloadProfile, locale)}
          </Button>
        </div>
      </PageHeader>

      <section className="bg-canvas pt-16 pb-14 lg:py-[110px]">
        <div className="container-site flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-12">
          <DetailMain locale={locale} service={service} detail={detail} />
          <DetailSidebar locale={locale} slug={slug} />
        </div>
      </section>

      <RelatedServices locale={locale} items={related} />
    </PageShell>
  );
}
