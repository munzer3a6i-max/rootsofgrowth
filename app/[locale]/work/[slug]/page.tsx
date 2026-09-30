import { notFound } from "next/navigation";
import { isLocale, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { getProject, projects } from "@/content/projects";
import { getProjectDetail } from "@/content/project-detail";
import { PageShell } from "@/components/PageShell";
import { ProjectHero } from "@/components/work/ProjectHero";
import { ProjectMeta } from "@/components/work/ProjectMeta";
import { ProjectBody } from "@/components/work/ProjectBody";
import { ProjectPager } from "@/components/work/ProjectPager";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  const detail = getProjectDetail(slug);
  if (!isLocale(locale) || !project || !detail) return {};
  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    title: t(project.title, locale),
    description: t(detail.intro, locale),
    image: project.image,
  });
}

/** Project detail template — Figma "Project detail — ليالي الدرعية" (34:1198) / mobile (40:1978). */
export default async function ProjectPage({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = getProject(slug);
  const detail = getProjectDetail(slug);
  if (!project || !detail) notFound();

  return (
    <PageShell locale={locale} active="work">
      <ProjectHero project={project} locale={locale} />
      <ProjectMeta project={project} detail={detail} locale={locale} />
      <ProjectBody project={project} detail={detail} locale={locale} />
      <ProjectPager slug={slug} locale={locale} />
    </PageShell>
  );
}
