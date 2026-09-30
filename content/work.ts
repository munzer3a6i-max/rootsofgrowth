import type { L } from "@/lib/i18n";

/** Copy for the Work (portfolio) page — Figma "Work — Desktop 1440" (33:1038) / mobile (39:2031). */
export const work = {
  meta: {
    title: { ar: "أعمالنا", en: "Our Work" } as L,
    description: {
      ar: "مختارات من مشاريع جذور النمو في الثقافة والتراث، والمؤتمرات، والفعاليات الوطنية الكبرى.",
      en: "Selected Roots of Growth projects across culture and heritage, conferences and major national events.",
    } as L,
  },
  header: {
    crumb: { ar: "أعمالنا", en: "Our Work" } as L,
    title: { ar: "أعمال صنعت", en: "Work that made" } as L,
    titleAccent: { ar: "الأثر", en: "an impact" } as L,
    lead: {
      ar: "مختارات من مشاريعنا في الثقافة والتراث، والمؤتمرات، والفعاليات الوطنية الكبرى.",
      en: "A selection of our projects in culture and heritage, conferences and major national events.",
    } as L,
    image: "/images/work_diriyah.jpg",
  },
  filtersLabel: { ar: "تصفية المشاريع حسب التصنيف", en: "Filter projects by category" } as L,
  /** Screen-reader status after filtering, "{n}" = number of projects shown. */
  resultsStatus: { ar: "عدد المشاريع المعروضة: {n}", en: "{n} projects shown" } as L,
  empty: { ar: "لا توجد مشاريع في هذا التصنيف حالياً.", en: "No projects in this category yet." } as L,
  viewProject: { ar: "عرض المشروع", en: "View project" } as L,
  next: {
    title: { ar: "مشروعك القادم هنا", en: "Your next project here" } as L,
    lead: {
      ar: "شاركنا فكرتك، ولنصنع معاً قصة النجاح التالية في معرض أعمالنا.",
      en: "Share your idea, and let’s create the next success story in our portfolio together.",
    } as L,
    leadMobile: {
      ar: "شاركنا فكرتك، ولنصنع معاً قصة النجاح التالية.",
      en: "Share your idea, and let’s create the next success story together.",
    } as L,
    cta: { ar: "ابدأ مشروعك معنا", en: "Start your project with us" } as L,
    href: "/contact",
  },
};
