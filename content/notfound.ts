import type { L } from "@/lib/i18n";

/** 404 copy (Figma "404 — الصفحة غير موجودة" 35:1674 / mobile 40:2321). */
export const notFoundPage = {
  metaTitle: { ar: "الصفحة غير موجودة", en: "Page not found" } as L,
  title: { ar: "يبدو أنك ضللت الطريق", en: "Looks like you’ve lost your way" } as L,
  lead: {
    ar: "الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها.",
    en: "The page you’re looking for doesn’t exist or may have been moved.",
  } as L,
  /** Desktop only (second sentence). */
  leadMore: { ar: "لنعدك إلى المسار الصحيح.", en: "Let’s get you back on track." } as L,
  home: { ar: "العودة إلى الرئيسية", en: "Back to home" } as L,
  contact: { ar: "تواصل معنا", en: "Contact us" } as L,
  /** Quick links (desktop only), in reading order. */
  links: [
    { path: "/about", label: { ar: "من نحن", en: "About" } as L },
    { path: "/services", label: { ar: "خدماتنا", en: "Services" } as L },
    { path: "/work", label: { ar: "أعمالنا", en: "Our Work" } as L },
  ],
};
