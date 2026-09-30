import { notFound } from "next/navigation";
import { isLocale, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { WorkGrid } from "@/components/work/WorkGrid";
import { work } from "@/content/work";

export async function generateMetadata({ params }: PageProps<"/[locale]/work">) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/work",
    title: t(work.meta.title, locale),
    description: t(work.meta.description, locale),
    image: work.header.image,
  });
}

/** Work (portfolio) — Figma "Work — Desktop 1440" (33:1038) / "Work — Mobile 390" (39:2031). */
export default async function WorkPage({ params }: PageProps<"/[locale]/work">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const h = work.header;
  return (
    <PageShell locale={locale} active="work">
      <PageHeader
        locale={locale}
        trail={[{ label: t(h.crumb, locale) }]}
        title={t(h.title, locale)}
        titleAccent={t(h.titleAccent, locale)}
        lead={t(h.lead, locale)}
        image={h.image}
      />
      <WorkGrid locale={locale} />
    </PageShell>
  );
}
