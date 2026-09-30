import { PageShell } from "@/components/PageShell";
import { PageHeader } from "@/components/PageHeader";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <PageShell locale={locale} active="home">
      <PageHeader locale={locale} trail={[{ label: "من نحن" }]} title="جذور متينة…" titleAccent="لأثرٍ ينمو" lead="شريكك الاستراتيجي في تطوير المبادرات الثقافية والسياحية برؤية وطنية مستدامة." image="/images/hero_masmak.jpg" />
    </PageShell>
  );
}
