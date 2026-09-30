import { notFound } from "next/navigation";
import { isLocale, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { about } from "@/content/about";
import { OurStory } from "@/components/about/OurStory";
import { FactsStrip } from "@/components/about/FactsStrip";
import { VisionMission } from "@/components/about/VisionMission";
import { Values } from "@/components/about/Values";
import { Sectors } from "@/components/about/Sectors";
import { TeamTeaser } from "@/components/about/TeamTeaser";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/about",
    title: t(about.meta.title, locale),
    description: t(about.meta.description, locale),
    image: "/images/about_building.jpg",
  });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const h = about.header;
  return (
    <PageShell locale={locale} active="about">
      <PageHeader
        locale={locale}
        trail={[{ label: t(h.crumb, locale) }]}
        title={t(h.title, locale)}
        titleAccent={t(h.titleAccent, locale)}
        lead={t(h.lead, locale)}
        image="/images/hero_masmak.jpg"
        imageAlt={t(h.imageAlt, locale)}
      />
      <OurStory locale={locale} />
      <FactsStrip locale={locale} />
      <VisionMission locale={locale} />
      <Values locale={locale} />
      <Sectors locale={locale} />
      <TeamTeaser locale={locale} />
    </PageShell>
  );
}
