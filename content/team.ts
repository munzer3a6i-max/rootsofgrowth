import type { L } from "@/lib/i18n";
import type { IconName } from "@/components/Icon";
import { contact } from "@/content/site";

/**
 * Team page copy (Figma "Team — فريقنا" desktop 41:2163 / mobile 42:2375).
 * Where the mobile frame uses shorter wording, it lives in a `…Mobile` field.
 *
 * Add `photo` to a person when their portrait is available (otherwise a
 * branded placeholder shows). Department filters with no members are hidden
 * automatically (TeamGrid).
 */

export type Department = "executive" | "design" | "operations" | "media";

export const departments: { key: Department | "all"; label: L; labelMobile: L }[] = [
  { key: "all", label: { ar: "الكل", en: "All" }, labelMobile: { ar: "الكل", en: "All" } },
  {
    key: "executive",
    label: { ar: "الإدارة التنفيذية", en: "Executive management" },
    labelMobile: { ar: "الإدارة", en: "Management" },
  },
  { key: "design", label: { ar: "التصميم", en: "Design" }, labelMobile: { ar: "التصميم", en: "Design" } },
  {
    key: "operations",
    label: { ar: "التشغيل الميداني", en: "On-site operations" },
    labelMobile: { ar: "التشغيل", en: "Operations" },
  },
  {
    key: "media",
    label: { ar: "الإعلام والتسويق", en: "Media & marketing" },
    labelMobile: { ar: "الإعلام", en: "Media" },
  },
];

export type Person = {
  name: L;
  role: L;
  /** Photo path; omitted → branded placeholder. */
  photo?: string;
  linkedin?: string;
  email?: string;
};

export type Leader = Person;
export type Member = Person & { department: Department };

const mohsen: Person = {
  name: { ar: "محسن الشيباني", en: "Mohsen Alshaibani" },
  role: { ar: "المدير التنفيذي", en: "Chief Executive Officer" },
  photo: "/images/portrait.jpg",
  linkedin: contact.social.linkedin,
  email: contact.email,
};

const mohammed: Person = {
  name: { ar: "محمد أبو الذيب", en: "Mohammed Abu Al-Theyeb" },
  role: { ar: "مدير العمليات", en: "Operations Manager" },
};

const sultan: Person = {
  name: { ar: "سلطان مسيفر", en: "Sultan Musaifer" },
  role: { ar: "مدير المشاريع", en: "Project Manager" },
};

/** Leadership — reading order (rightmost in the RTL frame first). */
export const leaders: Leader[] = [mohsen, mohammed, sultan];

/** Team grid — reading order. */
export const members: Member[] = [
  { ...mohsen, department: "executive" },
  { ...mohammed, department: "operations" },
  { ...sultan, department: "executive" },
  {
    name: { ar: "نورة العتيبي", en: "Noura Al-Otaibi" },
    role: { ar: "أخصائية التسويق", en: "Marketing Specialist" },
    department: "media",
  },
  {
    name: { ar: "مشعل الدوسري", en: "Mishal Al-Dosari" },
    role: { ar: "أخصائي التصوير", en: "Photography Specialist" },
    department: "media",
  },
];

export const team = {
  meta: {
    title: { ar: "فريقنا", en: "Our team" } as L,
    description: {
      ar: "مدراء تنفيذيون ومصممون محترفون وفرق ميدانية، يعملون بروح الفريق الواحد لتقديم أفضل النتائج وتحقيق رضا العملاء.",
      en: "Executive managers, professional designers and field teams working as one to deliver the best results and complete client satisfaction.",
    } as L,
  },

  header: {
    crumb: { ar: "فريقنا", en: "Our team" } as L,
    title: { ar: "نخبة تعمل", en: "One elite team," } as L,
    titleAccent: { ar: "بروح واحدة", en: "one spirit" } as L,
    lead: {
      ar: "مدراء تنفيذيون ومصممون محترفون وفرق ميدانية، يعملون بروح الفريق الواحد لتقديم أفضل النتائج وتحقيق رضا العملاء.",
      en: "Executive managers, professional designers and field teams working as one to deliver the best results and complete client satisfaction.",
    } as L,
    leadMobile: {
      ar: "مدراء تنفيذيون ومصممون محترفون وفرق ميدانية، يعملون بروح الفريق الواحد.",
      en: "Executive managers, professional designers and field teams, working as one.",
    } as L,
    primary: { ar: "تحدّث مع فريقنا", en: "Talk to our team" } as L,
    secondary: { ar: "انضم إلى فريقنا", en: "Join our team" } as L,
    imageAlt: { ar: "فريق جذور النمو في اجتماع عمل", en: "The Roots of Growth team at a work meeting" } as L,
  },

  intro: {
    eyebrow: { ar: "من نحن كفريق", en: "Who we are as a team" } as L,
    titleLead: { ar: "خلف كل تجربة", en: "Behind every great experience" } as L,
    titleMid: { ar: "ناجحة", en: "is" } as L,
    titleAccent: { ar: "فريق واحد", en: "one team" } as L,
    side: {
      ar: "يتكون فريقنا من نخبة من المدراء التنفيذيين والمصممين المحترفين، يعملون بروح الفريق الواحد لتقديم أفضل النتائج وتحقيق رضا العملاء.",
      en: "Our team brings together seasoned executives and professional designers who work as one to deliver the best results and complete client satisfaction.",
    } as L,
    pillars: [
      {
        icon: "users" as IconName,
        title: { ar: "المدراء التنفيذيون", en: "Executive managers" } as L,
        text: {
          ar: "قيادة المشاريع وإدارة العلاقة مع العميل من التخطيط حتى الإغلاق.",
          en: "Leading projects and managing the client relationship from planning to close-out.",
        } as L,
        textMobile: {
          ar: "قيادة المشاريع وإدارة العلاقة مع العميل.",
          en: "Leading projects and managing the client relationship.",
        } as L,
        featured: false,
      },
      {
        icon: "sparkle" as IconName,
        title: { ar: "المصممون المحترفون", en: "Professional designers" } as L,
        text: {
          ar: "هويات بصرية وأجنحة وديكورات تعكس روح كل حدث.",
          en: "Visual identities, booths and décor that capture the spirit of every event.",
        } as L,
        textMobile: {
          ar: "هويات وأجنحة وديكورات تعكس روح الحدث.",
          en: "Identities, booths and décor that capture each event’s spirit.",
        } as L,
        featured: true,
      },
      {
        icon: "pin" as IconName,
        title: { ar: "فرق التشغيل الميداني", en: "On-site operations teams" } as L,
        text: {
          ar: "إدارة الموقع والحشود والمواقف وخدمة صف السيارات يوم الحدث.",
          en: "Site, crowd and parking management plus valet service on event day.",
        } as L,
        textMobile: {
          ar: "إدارة الموقع والحشود يوم الحدث.",
          en: "Site and crowd management on event day.",
        } as L,
        featured: false,
      },
    ],
  },

  leadership: {
    eyebrow: { ar: "القيادة", en: "Leadership" } as L,
    title: { ar: "فريق القيادة", en: "Leadership team" } as L,
    side: {
      ar: "تقود فريقنا خبرات في تنظيم الفعاليات وإدارة المشاريع السياحية داخل المملكة.",
      en: "Our team is led by seasoned expertise in event organization and tourism project management across the Kingdom.",
    } as L,
  },

  grid: {
    eyebrow: { ar: "أعضاء الفريق", en: "Team members" } as L,
    title: { ar: "وجوه تصنع الفرق", en: "The faces that make the difference" } as L,
    filterLabel: { ar: "تصفية حسب القسم", en: "Filter by department" } as L,
    showMore: { ar: "عرض المزيد", en: "Show more" } as L,
  },

  quote: {
    text: {
      ar: "نؤمن بأن الجودة والاحترافية هما أساس النجاح، ونعمل بشغف على تطوير حلول إبداعية تلبي تطلعات عملائنا.",
      en: "We believe quality and professionalism are the foundation of success, and we work passionately to develop creative solutions that meet our clients’ ambitions.",
    } as L,
    author: { ar: "فريق جذور النمو", en: "The Roots of Growth team" } as L,
  },

  careers: {
    eyebrow: { ar: "انضم إلينا", en: "Join us" } as L,
    title: { ar: "هل تريد أن تكون جزءاً من الفريق؟", en: "Want to be part of the team?" } as L,
    text: {
      ar: "نبحث دائماً عن مواهب شغوفة في تنظيم الفعاليات والتصميم والتشغيل الميداني.",
      en: "We’re always looking for passionate talent in event organization, design and on-site operations.",
    } as L,
    button: { ar: "أرسل سيرتك الذاتية", en: "Send your CV" } as L,
  },

  a11y: {
    linkedin: { ar: "لينكدإن", en: "LinkedIn" } as L,
    email: { ar: "البريد الإلكتروني", en: "Email" } as L,
  },
};
