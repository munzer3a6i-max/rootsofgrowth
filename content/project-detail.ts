import type { L } from "@/lib/i18n";

/**
 * Long-form copy for the project detail template (Figma 34:1198 / 40:1978).
 *
 * DRAFT COPY: the Figma body text is marked "[نص تجريبي — يُستبدل بوصف المشروع
 * من العميل]" (placeholder, to be replaced by the client's project description).
 * Everything in `projectDetails` except the Diriyah Nights role list (verbatim
 * from Figma) is draft copy written for the build and must be reviewed.
 */

export const projectDetailLabels = {
  crumbWork: { ar: "أعمالنا", en: "Our Work" } as L,
  eyebrow: { ar: "عن المشروع", en: "About the project" } as L,
  roleTitle: { ar: "دورنا في المشروع", en: "Our role in the project" } as L,
  galleryTitle: { ar: "معرض الصور", en: "Photo gallery" } as L,
  meta: {
    sector: { ar: "القطاع", en: "Sector" } as L,
    period: { ar: "الفترة", en: "Period" } as L,
    location: { ar: "الموقع", en: "Location" } as L,
    service: { ar: "الخدمة", en: "Service" } as L,
  },
  similar: {
    title: { ar: "لديك مشروع مشابه؟", en: "Have a similar project?" } as L,
    lead: {
      ar: "نساعدك في تنظيم فعاليتك الثقافية أو السياحية من الفكرة حتى الإغلاق.",
      en: "We help you organise your cultural or tourism event, from the first idea to the final wrap-up.",
    } as L,
    cta: { ar: "تحدّث مع فريقنا", en: "Talk to our team" } as L,
    href: "/contact",
  },
  share: {
    title: { ar: "شارك المشروع", en: "Share the project" } as L,
    linkedin: { ar: "شارك على لينكدإن", en: "Share on LinkedIn" } as L,
    x: { ar: "شارك على إكس", en: "Share on X" } as L,
    instagram: { ar: "جذور النمو على إنستغرام", en: "Roots of Growth on Instagram" } as L,
  },
  prev: { ar: "المشروع السابق", en: "Previous project" } as L,
  next: { ar: "المشروع التالي", en: "Next project" } as L,
  prevShort: { ar: "السابق", en: "Previous" } as L,
  nextShort: { ar: "التالي", en: "Next" } as L,
  all: { ar: "جميع المشاريع", en: "All projects" } as L,
  pager: { ar: "التنقل بين المشاريع", en: "Project navigation" } as L,
  galleryAlt: { ar: "صورة من مشروع {title}", en: "Photo from {title}" } as L,
};

export type GalleryImage = { src: string; alt?: L };

export type ProjectDetail = {
  /** Short title for tight spots (mobile prev/next). */
  shortTitle: L;
  sector: L;
  service: L;
  heading: L;
  intro: L;
  roles: L[];
  /** 5 photos: 2 large (first = start side) + 3 small. First is the project's own photo. */
  gallery: GalleryImage[];
};

export const projectDetails: Record<string, ProjectDetail> = {
  "diriyah-nights": {
    shortTitle: { ar: "ليالي الدرعية", en: "Diriyah Nights" },
    sector: { ar: "الثقافة والتراث", en: "Culture & heritage" },
    service: { ar: "التنظيم والرعاية", en: "Organization & sponsorship" },
    heading: { ar: "ليالٍ تحتفي بروح الدرعية", en: "Nights that celebrate the spirit of Diriyah" },
    intro: {
      ar: "شاركت جذور النمو في تنظيم ورعاية ليالي الدرعية، موسمٌ يمتد من 1 يناير حتى 22 فبراير ويجمع الزوار في أجواء تحتفي بتراث الدرعية وضيافتها.",
      en: "Roots of Growth helped organise and sponsor Diriyah Nights, a season running from 1 January to 22 February that brings visitors together in an atmosphere celebrating Diriyah’s heritage and hospitality.",
    },
    roles: [
      { ar: "التنظيم والإدارة التشغيلية للفعاليات", en: "Event organisation and operational management" },
      { ar: "الرعاية والتنسيق مع الجهات المشاركة", en: "Sponsorship and coordination with participating entities" },
      { ar: "تجربة الزوار والتجهيزات في الموقع", en: "Visitor experience and on-site set-up" },
      { ar: "الدعم اللوجستي والميداني", en: "Logistics and field support" },
    ],
    gallery: [
      { src: "/images/work_diriyah.jpg" },
      { src: "/images/hero_masmak.jpg", alt: { ar: "قصر المصمك التاريخي في الرياض", en: "The historic Masmak Fortress in Riyadh" } },
      { src: "/images/work_baitissa.jpg", alt: { ar: "مبانٍ طينية تراثية", en: "Traditional mud-brick buildings" } },
      { src: "/images/svc_events.jpg", alt: { ar: "جمهور في فعالية", en: "Audience at an event" } },
      { src: "/images/svc_facility.jpg", alt: { ar: "فريق العمل الميداني", en: "The on-site team at work" } },
    ],
  },
  "world-cup-digital-city": {
    shortTitle: { ar: "المدينة الرقمية", en: "Digital City" },
    sector: { ar: "الفعاليات الوطنية الكبرى", en: "Major national events" },
    service: { ar: "تركيب الشاشات", en: "Screen installation" },
    heading: { ar: "شاشات تروي حلم كأس العالم 2034", en: "Screens that tell the World Cup 2034 story" },
    intro: {
      ar: "نفّذت جذور النمو تركيب الشاشات الرقمية في المدينة الرقمية ضمن فعاليات ملف استضافة المملكة لكأس العالم 2034، لتقديم محتوى بصري يعكس طموح المملكة ويستقبل الزوار بتجربة تفاعلية حديثة.",
      en: "Roots of Growth installed the digital screens at the Digital City, part of the activities supporting Saudi Arabia’s FIFA World Cup 2034 bid, delivering visual content that reflects the Kingdom’s ambition and welcomes visitors with a modern, interactive experience.",
    },
    roles: [
      { ar: "توريد وتركيب الشاشات الرقمية", en: "Supplying and installing digital screens" },
      { ar: "تصميم الهياكل وتجهيز مواقع العرض", en: "Structure design and display-site preparation" },
      { ar: "تشغيل المحتوى والدعم الفني", en: "Content playback and technical support" },
      { ar: "الصيانة والمتابعة طوال فترة الفعالية", en: "Maintenance and monitoring throughout the event" },
    ],
    gallery: [
      { src: "/images/work_wc_city.jpg" },
      { src: "/images/work_wc_booth.jpg", alt: { ar: "جناح ملف كأس العالم 2034", en: "The FIFA World Cup 2034 bid booth" } },
      { src: "/images/svc_media.jpg", alt: { ar: "تصوير وتغطية إعلامية", en: "Filming and media coverage" } },
      { src: "/images/svc_identity.jpg", alt: { ar: "تصميم جناح عرض", en: "Exhibition booth design" } },
      { src: "/images/svc_exhibitions.jpg", alt: { ar: "زوار في مساحة عرض", en: "Visitors in an exhibition space" } },
    ],
  },
  "bait-issa": {
    shortTitle: { ar: "بيت عيسى", en: "Bait Issa" },
    sector: { ar: "الثقافة والتراث", en: "Culture & heritage" },
    service: { ar: "التنظيم والرعاية", en: "Organization & sponsorship" },
    heading: { ar: "تراثٌ يُروى بين جدران بيت عيسى", en: "Heritage told within the walls of Bait Issa" },
    intro: {
      ar: "تولّت جذور النمو تنظيم ورعاية فعاليات بيت عيسى، حيث تحوّلت المباني الطينية العريقة إلى مساحة حيّة تستضيف الزوار وتعرّفهم بالموروث المحلي وأصالة الضيافة السعودية.",
      en: "Roots of Growth organised and sponsored the events at Bait Issa, turning its historic mud-brick buildings into a living space that welcomes visitors and introduces them to local heritage and the warmth of Saudi hospitality.",
    },
    roles: [
      { ar: "التخطيط والتنظيم الكامل للفعالية", en: "Full event planning and organisation" },
      { ar: "الرعاية والتنسيق مع الشركاء", en: "Sponsorship and partner coordination" },
      { ar: "تهيئة الموقع التراثي واستقبال الزوار", en: "Preparing the heritage site and welcoming visitors" },
      { ar: "الإدارة الميدانية والدعم اللوجستي", en: "Field management and logistics support" },
    ],
    gallery: [
      { src: "/images/work_baitissa.jpg" },
      { src: "/images/hero_masmak.jpg", alt: { ar: "قصر المصمك التاريخي في الرياض", en: "The historic Masmak Fortress in Riyadh" } },
      { src: "/images/work_diriyah.jpg", alt: { ar: "ليالي الدرعية", en: "Diriyah Nights" } },
      { src: "/images/svc_events.jpg", alt: { ar: "جمهور في فعالية", en: "Audience at an event" } },
      { src: "/images/svc_camps.jpg", alt: { ar: "منتجع ومرافق الضيافة", en: "Resort and hospitality facilities" } },
    ],
  },
  "giftedness-conference": {
    shortTitle: { ar: "مؤتمر الموهبة", en: "Giftedness Conference" },
    sector: { ar: "المؤتمرات", en: "Conferences" },
    service: { ar: "تركيب الشاشات", en: "Screen installation" },
    heading: { ar: "ممرات ضوئية تحتفي بالإبداع", en: "Corridors of light that celebrate creativity" },
    intro: {
      ar: "صمّمت جذور النمو ونفّذت ممرات الشاشات في المؤتمر العالمي للموهبة والإبداع، لتصنع رحلة بصرية غامرة ترافق المشاركين من المدخل حتى قاعات الجلسات.",
      en: "Roots of Growth designed and built the screen corridors at the Global Conference on Giftedness & Creativity, creating an immersive visual journey that accompanies delegates from the entrance to the session halls.",
    },
    roles: [
      { ar: "تصميم وتنفيذ ممرات الشاشات", en: "Designing and building the screen corridors" },
      { ar: "الإضاءة والمؤثرات البصرية", en: "Lighting and visual effects" },
      { ar: "إدارة المحتوى المعروض", en: "Managing on-screen content" },
      { ar: "الدعم الفني خلال أيام المؤتمر", en: "Technical support throughout the conference" },
    ],
    gallery: [
      { src: "/images/work_giftedness.jpg" },
      { src: "/images/work_globe.jpg", alt: { ar: "شاشة كروية في مؤتمر", en: "A spherical screen at a conference" } },
      { src: "/images/svc_media.jpg", alt: { ar: "تصوير وتغطية إعلامية", en: "Filming and media coverage" } },
      { src: "/images/svc_events.jpg", alt: { ar: "جمهور في جلسة", en: "Audience at a session" } },
      { src: "/images/svc_exhibitions.jpg", alt: { ar: "زوار في مساحة عرض", en: "Visitors in an exhibition space" } },
    ],
  },
  "gosh-conference": {
    shortTitle: { ar: "مؤتمر السلامة", en: "OSH Conference" },
    sector: { ar: "المؤتمرات", en: "Conferences" },
    service: { ar: "تركيب الشاشات", en: "Screen installation" },
    heading: { ar: "شاشة كروية في قلب المؤتمر", en: "A spherical screen at the heart of the conference" },
    intro: {
      ar: "قدّمت جذور النمو شاشات بتصميم كروي للمؤتمر الدولي السابع للسلامة والصحة المهنية، لتكون نقطة جذب بصرية تعرض رسائل المؤتمر وتفتح حواراً مع الزوار من كل الاتجاهات.",
      en: "Roots of Growth delivered spherical screens for the 7th International Conference on Occupational Safety & Health, creating a visual centrepiece that displays the conference’s messages and engages visitors from every angle.",
    },
    roles: [
      { ar: "توريد وتركيب الشاشة الكروية", en: "Supplying and installing the spherical screen" },
      { ar: "تجهيز منصة العرض والهيكل", en: "Preparing the display platform and structure" },
      { ar: "إنتاج وتشغيل المحتوى المرئي", en: "Producing and running visual content" },
      { ar: "المتابعة الفنية طوال المؤتمر", en: "Technical follow-up throughout the conference" },
    ],
    gallery: [
      { src: "/images/work_globe.jpg" },
      { src: "/images/work_giftedness.jpg", alt: { ar: "ممر شاشات في مؤتمر", en: "A screen corridor at a conference" } },
      { src: "/images/svc_exhibitions.jpg", alt: { ar: "زوار في مساحة عرض", en: "Visitors in an exhibition space" } },
      { src: "/images/svc_media.jpg", alt: { ar: "تصوير وتغطية إعلامية", en: "Filming and media coverage" } },
      { src: "/images/svc_consult.jpg", alt: { ar: "اجتماع تخطيط", en: "A planning meeting" } },
    ],
  },
};

export function getProjectDetail(slug: string) {
  return projectDetails[slug];
}
