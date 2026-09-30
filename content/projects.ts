import type { L } from "@/lib/i18n";

/**
 * Portfolio projects. Used by Home (work showcase), Work (grid + filters),
 * Project detail pages and About (sectors). Long-form copy for the detail
 * template lives in content/project-detail.ts.
 */
export type ProjectCategory = "organization" | "screens" | "conferences" | "culture";

export const projectCategories: { key: ProjectCategory | "all"; label: L }[] = [
  { key: "all", label: { ar: "الكل", en: "All" } },
  { key: "organization", label: { ar: "التنظيم والرعاية", en: "Organization & sponsorship" } },
  { key: "screens", label: { ar: "تركيب الشاشات", en: "Screen installation" } },
  { key: "conferences", label: { ar: "المؤتمرات", en: "Conferences" } },
  { key: "culture", label: { ar: "الثقافة والتراث", en: "Culture & heritage" } },
];

export type Project = {
  slug: string;
  image: string;
  title: L;
  /** Short tag shown on cards, e.g. "التنظيم والرعاية". */
  tag: L;
  categories: ProjectCategory[];
  date?: L;
  location?: L;
};

export const projects: Project[] = [
  {
    slug: "diriyah-nights",
    image: "/images/work_diriyah.jpg",
    title: { ar: "ليالي الدرعية", en: "Diriyah Nights" },
    tag: { ar: "التنظيم والرعاية", en: "Organization & sponsorship" },
    categories: ["organization", "culture"],
    date: { ar: "1 يناير – 22 فبراير", en: "1 Jan – 22 Feb" },
    location: { ar: "الدرعية، الرياض", en: "Diriyah, Riyadh" },
  },
  {
    slug: "world-cup-digital-city",
    image: "/images/work_wc_city.jpg",
    title: { ar: "المدينة الرقمية · كأس العالم 2034", en: "Digital City · FIFA World Cup 2034" },
    tag: { ar: "تركيب شاشات", en: "Screen installation" },
    categories: ["screens"],
    location: { ar: "الرياض", en: "Riyadh" },
  },
  {
    slug: "bait-issa",
    image: "/images/work_baitissa.jpg",
    title: { ar: "بيت عيسى", en: "Bait Issa" },
    tag: { ar: "التنظيم والرعاية", en: "Organization & sponsorship" },
    categories: ["organization", "culture"],
    location: { ar: "الرياض", en: "Riyadh" },
  },
  {
    slug: "giftedness-conference",
    image: "/images/work_giftedness.jpg",
    title: {
      ar: "المؤتمر العالمي للموهبة والإبداع",
      en: "Global Conference on Giftedness & Creativity",
    },
    tag: { ar: "تركيب شاشات", en: "Screen installation" },
    categories: ["screens", "conferences"],
    location: { ar: "الرياض", en: "Riyadh" },
  },
  {
    slug: "gosh-conference",
    image: "/images/work_globe.jpg",
    title: {
      ar: "المؤتمر الدولي السابع للسلامة والصحة المهنية",
      en: "7th International Conference on Occupational Safety & Health",
    },
    tag: { ar: "شاشات بتصميم كروي", en: "Spherical screen design" },
    categories: ["screens", "conferences"],
    location: { ar: "الرياض", en: "Riyadh" },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
