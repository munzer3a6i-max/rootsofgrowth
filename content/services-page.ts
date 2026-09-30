import type { L } from "@/lib/i18n";
import type { IconName } from "@/components/Icon";

/**
 * Copy for the Services page (Figma: "Services — Desktop 1440" 31:664,
 * "Services — Mobile 390" 38:1855). The eight services themselves come from
 * content/services.ts.
 */
export const servicesPage = {
  meta: {
    title: { ar: "خدماتنا", en: "Our Services" } as L,
    description: {
      ar: "ثماني خدمات متكاملة تغطي كل مرحلة من مراحل الحدث: تنظيم المعارض والفعاليات، الهويات البصرية، الاستشارات السياحية، التنسيق الإعلامي، إدارة المرافق، المخيمات والمنتجعات، والخدمات اللوجستية.",
      en: "Eight integrated services covering every stage of an event: exhibitions and events, visual identity, tourism consulting, media coordination, facilities management, camps and resorts, and logistics.",
    } as L,
  },

  header: {
    crumb: { ar: "خدماتنا", en: "Our Services" } as L,
    title: { ar: "خدمات متكاملة", en: "Integrated services" } as L,
    titleAccent: { ar: "تحت سقف واحد", en: "under one roof" } as L,
    lead: {
      ar: "ثماني خدمات تغطي كل مرحلة من مراحل الحدث — بفريق واحد، ومسؤولية واحدة، وجودة لا تتنازل.",
      en: "Eight services covering every stage of an event — one team, one point of accountability, and uncompromising quality.",
    } as L,
    imageAlt: { ar: "زوار داخل قاعة معرض", en: "Visitors inside an exhibition hall" } as L,
  },

  quickLinksLabel: { ar: "انتقل إلى خدمة", en: "Jump to a service" } as L,

  list: {
    eyebrow: { ar: "خدماتنا بالتفصيل", en: "Our services in detail" } as L,
    title: { ar: "كل ما يحتاجه حدثك", en: "Everything your event needs" } as L,
    lead: {
      ar: "اختر الخدمة التي تحتاجها، أو دعنا نصمم لك باقة متكاملة تجمع أكثر من خدمة حسب طبيعة فعاليتك.",
      en: "Choose the service you need, or let us put together an integrated package that combines several services to suit your event.",
    } as L,
    request: { ar: "اطلب الخدمة", en: "Request service" } as L,
    details: { ar: "تفاصيل الخدمة", en: "Service details" } as L,
  },

  /**
   * Mobile service cards (38:1890…) show a short English tag next to the
   * number and a shorter summary than the desktop blocks.
   */
  mobile: {
    "exhibitions-events": {
      tag: "Exhibitions & Events",
      summary: {
        ar: "تنظيم متكامل للمعارض والفعاليات من تخطيط المساحات حتى الإغلاق.",
        en: "End-to-end exhibition and event organization, from space planning to close-out.",
      },
    },
    "event-planning": {
      tag: "Event Planning",
      summary: {
        ar: "خطة تشغيلية واضحة وإدارة كل تفاصيل يوم الحدث.",
        en: "A clear operational plan and every detail of event day, managed.",
      },
    },
    "visual-identity": {
      tag: "Visual Identities & Décor",
      summary: {
        ar: "هويات وأجنحة وديكورات تعكس روح كل حدث.",
        en: "Identities, booths and décor that capture the spirit of each event.",
      },
    },
    "tourism-investment": {
      tag: "Tourism Investment",
      summary: {
        ar: "قراءة الفرص السياحية وتحويلها إلى مشاريع.",
        en: "Reading tourism opportunities and turning them into projects.",
      },
    },
    "media-marketing": {
      tag: "Media & Marketing",
      summary: {
        ar: "حضور إعلامي وتسويقي قبل الحدث وأثناءه وبعده.",
        en: "Media and marketing presence before, during and after the event.",
      },
    },
    "tourism-facilities": {
      tag: "Facility Management",
      summary: {
        ar: "تشغيل المرافق بمعايير احترافية وتجربة زوار مميزة.",
        en: "Professional facility operations and an outstanding visitor experience.",
      },
    },
    "camps-resorts": {
      tag: "Camps & Resorts",
      summary: {
        ar: "ضيافة تجمع بين الأصالة والراحة.",
        en: "Hospitality that blends authenticity and comfort.",
      },
    },
    logistics: {
      tag: "Logistics & On-site",
      summary: {
        ar: "مواقف السيارات، صف السيارات، وإدارة الحشود.",
        en: "Parking, valet service and crowd management.",
      },
    },
  } as Record<string, { tag: string; summary: L }>,

  howWeWork: {
    eyebrow: { ar: "كيف نعمل", en: "How we work" } as L,
    title: { ar: "أربع خطوات… و", en: "Four steps… and " } as L,
    titleAccent: { ar: "تجربة لا تُنسى", en: "an unforgettable experience" } as L,
    lead: {
      ar: "منهجية واضحة تمنحك الاطمئنان في كل مرحلة، وتواصل مستمر مع مدير مشروع واحد.",
      en: "A clear methodology that gives you peace of mind at every stage, with ongoing contact through a single project manager.",
    } as L,
    steps: [
      {
        number: "01",
        icon: "users",
        title: { ar: "نستمع ونفهم", en: "We listen & understand" },
        text: {
          ar: "جلسة لفهم أهدافك وجمهورك وميزانيتك.",
          en: "A session to understand your goals, audience and budget.",
        },
        textMobile: {
          ar: "جلسة لفهم أهدافك وجمهورك وميزانيتك.",
          en: "A session to understand your goals, audience and budget.",
        },
      },
      {
        number: "02",
        icon: "target",
        title: { ar: "نخطط ونصمم", en: "We plan & design" },
        text: {
          ar: "خطة تشغيلية، وهوية بصرية، وتصاميم الموقع.",
          en: "An operational plan, a visual identity and site designs.",
        },
        textMobile: {
          ar: "خطة تشغيلية، وهوية بصرية، وتصاميم الموقع.",
          en: "An operational plan, a visual identity and site designs.",
        },
      },
      {
        number: "03",
        icon: "calendar",
        title: { ar: "ننفذ ونشغّل", en: "We build & operate" },
        text: {
          ar: "تجهيز الموقع وإدارة يوم الحدث بفرق ميدانية.",
          en: "Site preparation and event-day management with field teams.",
        },
        textMobile: {
          ar: "تجهيز الموقع وإدارة يوم الحدث.",
          en: "Site preparation and event-day management.",
        },
      },
      {
        number: "04",
        icon: "check",
        title: { ar: "نقيّم ونطوّر", en: "We evaluate & improve" },
        text: {
          ar: "تقرير ختامي ومؤشرات أداء وتوصيات للنسخ القادمة.",
          en: "A final report, performance indicators and recommendations for future editions.",
        },
        textMobile: {
          ar: "تقرير ختامي وتوصيات للنسخ القادمة.",
          en: "A final report and recommendations for future editions.",
        },
      },
    ] as { number: string; icon: IconName; title: L; text: L; textMobile: L }[],
  },

  faq: {
    eyebrow: { ar: "أسئلة شائعة", en: "FAQ" } as L,
    title: { ar: "لديك سؤال؟", en: "Have a question?" } as L,
    titleSecond: { ar: "لدينا الإجابة", en: "We have the answer" } as L,
    lead: {
      ar: "لم تجد إجابتك؟ فريقنا جاهز للرد على استفساراتك.",
      en: "Didn’t find your answer? Our team is ready to help.",
    } as L,
    button: { ar: "تواصل معنا", en: "Contact us" } as L,
    items: [
      {
        q: {
          ar: "متى يجب أن نتواصل معكم قبل موعد الفعالية؟",
          en: "How far ahead of the event should we contact you?",
        },
        a: {
          ar: "كلما كان التواصل مبكراً كان التخطيط أدق. للفعاليات الكبيرة ننصح بالتواصل قبل ثلاثة أشهر على الأقل، ويمكننا التعامل مع الفعاليات العاجلة حسب نطاقها.",
          en: "The earlier you reach out, the more precise the planning. For large events we recommend getting in touch at least three months ahead, and we can take on urgent events depending on their scope.",
        },
      },
      {
        // DRAFT answer — not written in Figma.
        q: {
          ar: "هل تقدمون خدماتكم خارج مدينة الرياض؟",
          en: "Do you offer your services outside Riyadh?",
        },
        a: {
          ar: "نعم، ننفذ مشاريعنا في مختلف مناطق المملكة. ننقل فرقنا وتجهيزاتنا إلى موقع الحدث، ونتعاون مع شركاء محليين موثوقين لضمان الجودة نفسها أينما كنت.",
          en: "Yes. We deliver projects across the Kingdom, bringing our teams and equipment to the venue and working with trusted local partners to guarantee the same quality wherever you are.",
        },
      },
      {
        // DRAFT answer — not written in Figma.
        q: { ar: "هل يمكن طلب خدمة واحدة فقط؟", en: "Can we request just one service?" },
        a: {
          ar: "بالتأكيد. يمكنك طلب أي خدمة بشكل مستقل، كما يمكننا تصميم باقة تجمع أكثر من خدمة إذا رغبت في إدارة الحدث بالكامل عبر فريق واحد.",
          en: "Absolutely. Every service can be requested on its own, and we can also build a package combining several services if you’d like one team to manage the whole event.",
        },
      },
      {
        // DRAFT answer — not written in Figma.
        q: { ar: "كيف يتم تسعير المشاريع؟", en: "How are projects priced?" },
        a: {
          ar: "يعتمد التسعير على نطاق العمل وحجم الحدث ومدته والتجهيزات المطلوبة. بعد جلسة التعرف على احتياجاتك نقدم عرض سعر مفصلاً وشفافاً يوضح كل بند.",
          en: "Pricing depends on the scope of work, the size and duration of the event and the equipment required. After an initial discovery session we send a detailed, transparent quote that itemises every line.",
        },
      },
      {
        // DRAFT answer — not written in Figma.
        q: {
          ar: "هل تتولون استخراج التصاريح اللازمة؟",
          en: "Do you handle the required permits?",
        },
        a: {
          ar: "نعم، نتولى التنسيق مع الجهات المعنية لاستخراج التصاريح والموافقات اللازمة للفعالية، ونتابعها حتى اكتمالها ضمن الجدول الزمني للمشروع.",
          en: "Yes. We coordinate with the relevant authorities to obtain the permits and approvals your event needs, and follow them through to completion within the project timeline.",
        },
      },
    ] as { q: L; a: L }[],
  },
};
