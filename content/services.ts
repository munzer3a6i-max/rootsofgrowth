import type { L } from "@/lib/i18n";

/**
 * The eight services. Used by Home (services grid), Services (list + quick
 * links), Service detail pages, Footer and the Contact form select.
 * Page-specific long-form copy for the detail template lives in
 * content/service-detail.ts.
 */
export type Service = {
  slug: string;
  number: string;
  image: string;
  title: L;
  /** Shorter label used in the footer. */
  short: L;
  summary: L;
  bullets: L<string[]>;
};

export const services: Service[] = [
  {
    slug: "exhibitions-events",
    number: "01",
    image: "/images/svc_exhibitions.jpg",
    title: { ar: "تنظيم المعارض والفعاليات", en: "Exhibitions & Events Organization" },
    short: { ar: "تنظيم المعارض والفعاليات", en: "Exhibitions & events" },
    summary: {
      ar: "تنظيم متكامل للمعارض والفعاليات بمختلف أحجامها، من تخطيط المساحات حتى إغلاق الحدث وتسليم الموقع.",
      en: "End-to-end organization of exhibitions and events of every size — from space planning to closing the event and handing over the venue.",
    },
    bullets: {
      ar: ["تخطيط المساحات وتوزيع الأجنحة", "إدارة العارضين وتجربة الزوار", "التشغيل اليومي والإغلاق"],
      en: ["Space planning & booth layout", "Exhibitor management & visitor experience", "Daily operations & close-out"],
    },
  },
  {
    slug: "event-planning",
    number: "02",
    image: "/images/svc_events.jpg",
    title: { ar: "تخطيط وإدارة الفعاليات", en: "Event Planning & Management" },
    short: { ar: "تخطيط وإدارة الفعاليات", en: "Event planning & management" },
    summary: {
      ar: "نحوّل الفكرة إلى خطة تشغيلية واضحة، وندير كل التفاصيل حتى يمر يوم الحدث بسلاسة.",
      en: "We turn the idea into a clear operational plan and manage every detail so event day runs smoothly.",
    },
    bullets: {
      ar: ["الخطة التشغيلية والجدول الزمني", "إدارة الموردين والميزانية", "إدارة يوم الحدث"],
      en: ["Operational plan & timeline", "Supplier & budget management", "Event-day management"],
    },
  },
  {
    slug: "visual-identity",
    number: "03",
    image: "/images/svc_identity.jpg",
    title: { ar: "تصميم وتنفيذ الهويات البصرية والديكورات", en: "Visual Identity & Décor Design and Build" },
    short: { ar: "الهويات البصرية والديكورات", en: "Visual identity & décor" },
    summary: {
      ar: "هويات بصرية وأجنحة وديكورات تعكس روح كل حدث، من التصميم حتى التركيب في الموقع.",
      en: "Visual identities, booths and décor that capture the spirit of every event — from design to on-site installation.",
    },
    bullets: {
      ar: ["هوية الفعالية والمطبوعات", "تصميم وتنفيذ الأجنحة", "الديكورات والشاشات والإضاءة"],
      en: ["Event identity & print", "Booth design & build", "Décor, screens & lighting"],
    },
  },
  {
    slug: "tourism-investment",
    number: "04",
    image: "/images/svc_consult.jpg",
    title: { ar: "استشارات الاستثمار السياحي", en: "Tourism Investment Consulting" },
    short: { ar: "استشارات الاستثمار السياحي", en: "Tourism investment consulting" },
    summary: {
      ar: "نساعد المستثمرين والجهات على قراءة الفرص في القطاع السياحي وتحويلها إلى مشاريع قابلة للتنفيذ.",
      en: "We help investors and organizations read opportunities in the tourism sector and turn them into viable projects.",
    },
    bullets: {
      ar: ["دراسات الجدوى", "تقييم الفرص والمواقع", "خطط التطوير والتشغيل"],
      en: ["Feasibility studies", "Opportunity & site assessment", "Development & operating plans"],
    },
  },
  {
    slug: "media-marketing",
    number: "05",
    image: "/images/svc_media.jpg",
    title: { ar: "التنسيق الإعلامي والتسويقي", en: "Media & Marketing Coordination" },
    short: { ar: "التنسيق الإعلامي والتسويقي", en: "Media & marketing" },
    summary: {
      ar: "ننسّق الحضور الإعلامي والتسويقي للحدث ليصل إلى جمهوره قبل الانطلاق وأثناءه وبعده.",
      en: "We coordinate the event’s media and marketing presence so it reaches its audience before, during and after launch.",
    },
    bullets: {
      ar: ["خطط الإطلاق والترويج", "التنسيق مع وسائل الإعلام", "التغطية والتوثيق"],
      en: ["Launch & promotion plans", "Media relations", "Coverage & documentation"],
    },
  },
  {
    slug: "tourism-facilities",
    number: "06",
    image: "/images/svc_facility.jpg",
    title: { ar: "إدارة المرافق السياحية", en: "Tourism Facilities Management" },
    short: { ar: "إدارة المرافق السياحية", en: "Tourism facilities management" },
    summary: {
      ar: "تشغيل وإدارة المرافق السياحية بمعايير احترافية تضمن تجربة زوار متميزة واستدامة التشغيل.",
      en: "Operating and managing tourism facilities to professional standards that ensure an outstanding visitor experience and sustainable operations.",
    },
    bullets: {
      ar: ["التشغيل اليومي", "تجربة الزوار", "الصيانة وضبط الجودة"],
      en: ["Daily operations", "Visitor experience", "Maintenance & quality control"],
    },
  },
  {
    slug: "camps-resorts",
    number: "07",
    image: "/images/svc_camps.jpg",
    title: { ar: "تطوير وتشغيل المخيمات والمنتجعات", en: "Camps & Resorts Development and Operation" },
    short: { ar: "المخيمات والمنتجعات", en: "Camps & resorts" },
    summary: {
      ar: "نطوّر ونشغّل المخيمات والمنتجعات بتجربة ضيافة تجمع بين الأصالة والراحة.",
      en: "We develop and operate camps and resorts with a hospitality experience that blends authenticity and comfort.",
    },
    bullets: {
      ar: ["التصميم والتجهيز", "التشغيل والضيافة", "البرامج والأنشطة"],
      en: ["Design & fit-out", "Operations & hospitality", "Programs & activities"],
    },
  },
  {
    slug: "logistics",
    number: "08",
    image: "/images/svc_logistics.jpg",
    title: { ar: "الخدمات اللوجستية والدعم الميداني", en: "Logistics & Field Support" },
    short: { ar: "الخدمات اللوجستية", en: "Logistics" },
    summary: {
      ar: "دعم ميداني متكامل يضمن انسيابية الحركة وسلامة الحضور من لحظة الوصول حتى المغادرة.",
      en: "Integrated field support that keeps movement flowing and attendees safe from arrival to departure.",
    },
    bullets: {
      ar: ["تنظيم مواقف السيارات", "خدمة صف السيارات", "إدارة الحشود"],
      en: ["Parking management", "Valet service", "Crowd management"],
    },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

/** Services shown in the footer column (Figma shows these five). */
export const footerServiceSlugs = [
  "exhibitions-events",
  "event-planning",
  "visual-identity",
  "tourism-facilities",
  "logistics",
];
