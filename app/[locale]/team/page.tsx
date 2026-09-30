import { notFound } from "next/navigation";
import { href, isLocale, t } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/Button";
import { team } from "@/content/team";
import { TeamIntro } from "@/components/team/TeamIntro";
import { Leadership } from "@/components/team/Leadership";
import { TeamGrid } from "@/components/team/TeamGrid";
import { TeamQuote } from "@/components/team/TeamQuote";
import { Careers } from "@/components/team/Careers";

export async function generateMetadata({ params }: PageProps<"/[locale]/team">) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata({
    locale,
    path: "/team",
    title: t(team.meta.title, locale),
    description: t(team.meta.description, locale),
    image: "/images/team.jpg",
  });
}

export default async function TeamPage({ params }: PageProps<"/[locale]/team">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const h = team.header;
  return (
    <PageShell locale={locale} active="team">
      <PageHeader
        locale={locale}
        trail={[{ label: t(h.crumb, locale) }]}
        title={t(h.title, locale)}
        titleAccent={t(h.titleAccent, locale)}
        image="/images/team.jpg"
        imageAlt={t(h.imageAlt, locale)}
      >
        {/* Lead is passed as children: the mobile frame uses a shorter sentence. */}
        <p className="t-body-l max-w-[600px] text-on-dark-muted lg:font-normal">
          <span className="lg:hidden">{t(h.leadMobile, locale)}</span>
          <span className="hidden lg:inline">{t(h.lead, locale)}</span>
        </p>
        <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
          <Button href={href(locale, "/contact")} className="w-full sm:w-auto">
            {t(h.primary, locale)}
          </Button>
          <div className="hidden sm:block">
            <Button href="#careers" variant="outlineDark" icon={false}>
              {t(h.secondary, locale)}
            </Button>
          </div>
        </div>
      </PageHeader>
      <TeamIntro locale={locale} />
      <Leadership locale={locale} />
      <TeamGrid locale={locale} />
      <TeamQuote locale={locale} />
      <Careers locale={locale} />
    </PageShell>
  );
}
