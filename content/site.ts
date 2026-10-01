import type { L } from "@/lib/i18n";

/** Company contact details — edit here and every page updates. */
export const contact = {
  email: "info@rootsofgrowth.com.sa",
  phoneDisplay: "+966 55 792 8248",
  phoneLocal: "055 792 8248",
  phoneHref: "tel:+966557928248",
  whatsappHref: "https://wa.me/966557928248",
  address: {
    ar: "الرياض، المملكة العربية السعودية",
    en: "Riyadh, Kingdom of Saudi Arabia",
  } as L,
  mapQuery: "Riyadh, Saudi Arabia",
  social: {
    linkedin: "https://www.linkedin.com/",
    x: "https://x.com/",
    instagram: "https://www.instagram.com/",
  },
};

export type NavKey = "home" | "about" | "services" | "work" | "team" | "contact";

export const nav: { key: NavKey; path: string; label: L }[] = [
  { key: "home", path: "/", label: { ar: "الرئيسية", en: "Home" } },
  { key: "about", path: "/about", label: { ar: "من نحن", en: "About" } },
  { key: "services", path: "/services", label: { ar: "خدماتنا", en: "Services" } },
  { key: "work", path: "/work", label: { ar: "أعمالنا", en: "Our Work" } },
  { key: "team", path: "/team", label: { ar: "فريقنا", en: "Our Team" } },
  { key: "contact", path: "/contact", label: { ar: "تواصل معنا", en: "Contact" } },
];

export const site = {
  name: { ar: "جذور النمو التجارية", en: "Roots of Growth" } as L,
  tagline: {
    ar: "شريكك الاستراتيجي في تطوير المبادرات الثقافية والسياحية برؤية وطنية مستدامة.",
    en: "Your strategic partner in developing cultural and tourism initiatives with a sustainable national vision.",
  } as L,
  metaDescription: {
    ar: "جذور النمو التجارية — تنظيم الفعاليات والمعارض وإدارة الوجهات السياحية في المملكة العربية السعودية.",
    en: "Roots of Growth — events & exhibitions management and tourism destination operations in Saudi Arabia.",
  } as L,
  bookConsultation: { ar: "احجز استشارة", en: "Book a consultation" } as L,
  announcement: {
    text: {
      ar: "هل تخطط لفعاليتك القادمة؟ دعنا نحوّل فكرتك إلى تجربة لا تُنسى",
      en: "Planning your next event? Let’s turn your idea into an unforgettable experience",
    } as L,
    cta: { ar: "تواصل معنا", en: "Contact us" } as L,
  },
  cta: {
    title: {
      ar: "في جذور النمو، لا نكتفي برؤية الفرص،\nبل نصنعها.",
      en: "At Roots of Growth, we don’t just see opportunities —\nwe create them.",
    } as L,
    titleMobile: {
      ar: "في جذور النمو، لا نكتفي برؤية الفرص… بل نصنعها.",
      en: "At Roots of Growth, we don’t just see opportunities… we create them.",
    } as L,
    button: { ar: "ابدأ مشروعك الآن", en: "Start your project now" } as L,
  },
  footer: {
    contactTitle: { ar: "تواصل", en: "Contact" } as L,
    servicesTitle: { ar: "خدماتنا", en: "Services" } as L,
    linksTitle: { ar: "روابط سريعة", en: "Quick links" } as L,
    terms: { ar: "الشروط والأحكام", en: "Terms & Conditions" } as L,
    privacy: { ar: "سياسة الخصوصية", en: "Privacy Policy" } as L,
    rights: {
      ar: "© 2026 جذور النمو التجارية. جميع الحقوق محفوظة.",
      en: "© 2026 Roots of Growth. All rights reserved.",
    } as L,
  },
  menu: { open: { ar: "فتح القائمة", en: "Open menu" } as L, close: { ar: "إغلاق القائمة", en: "Close menu" } as L },
  breadcrumbHome: { ar: "الرئيسية", en: "Home" } as L,
  languageName: { ar: "العربية", en: "English" } as L,
};
