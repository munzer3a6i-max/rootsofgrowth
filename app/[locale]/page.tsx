import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { home } from "@/content/home";
import { PageShell } from "@/components/PageShell";
import { CtaBand } from "@/components/CtaBand";
import { Hero } from "@/components/home/Hero";
import { ProjectsStrip } from "@/components/home/ProjectsStrip";
import { About } from "@/components/home/About";
import { VisionMission } from "@/components/home/VisionMission";
import { Services } from "@/components/home/Services";
import { Marquee } from "@/components/home/Marquee";
import { WorkShowcase } from "@/components/home/WorkShowcase";
import { Values } from "@/components/home/Values";
import { Team } from "@/components/home/Team";
import { Contact } from "@/components/home/Contact";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    ...pageMetadata({
      locale,
      path: "/",
      title: t(home.meta.title, locale),
      description: t(home.meta.description, locale),
    }),
    // The home title is complete on its own — skip the "%s | site" template.
    title: { absolute: t(home.meta.title, locale) },
  };
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    // In the Home design the CTA band sits *before* the Contact section,
    // so the shell's own band is turned off and rendered in place here.
    <PageShell locale={locale} active="home" cta={false}>
      <Hero locale={locale} />
      <ProjectsStrip locale={locale} />
      <About locale={locale} />
      <VisionMission locale={locale} />
      <Services locale={locale} />
      <Marquee locale={locale} />
      <WorkShowcase locale={locale} />
      <Values locale={locale} />
      <Team locale={locale} />
      <CtaBand locale={locale} />
      <Contact locale={locale} />
    </PageShell>
  );
}
