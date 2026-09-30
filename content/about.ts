import type { L } from "@/lib/i18n";
import type { IconName } from "@/components/Icon";

/**
 * About page copy (Figma "About — من نحن" desktop 30:469 / mobile 38:1602).
 * Where the mobile frame uses shorter wording, it lives in a `…Mobile` field.
 */
export const about = {
  meta: {
    title: { ar: "من نحن", en: "About us" } as L,
    description: {
      ar: "جذور النمو التجارية — نصنع تجارب استثنائية من خلال خدمات متكاملة في تنظيم وإدارة الفعاليات والمعارض وإدارة المرافق السياحية.",
      en: "Roots of Growth creates exceptional experiences through integrated services in event and exhibition management and tourism facility operations.",
    } as L,
  },

  header: {
    crumb: { ar: "من نحن", en: "About us" } as L,
    title: { ar: "جذور متينة…", en: "Strong roots…" } as L,
    titleAccent: { ar: "لأثرٍ ينمو", en: "for growing impact" } as L,
    lead: {
      ar: "شريكك الاستراتيجي في تطوير المبادرات الثقافية والسياحية برؤية وطنية مستدامة.",
      en: "Your strategic partner in developing cultural and tourism initiatives with a sustainable national vision.",
    } as L,
    imageAlt: { ar: "قصر المصمك في الرياض", en: "Masmak Fortress, Riyadh" } as L,
  },

  story: {
    eyebrow: { ar: "قصتنا", en: "Our story" } as L,
    title: {
      ar: "نصنع تجارب استثنائية تواكب تطلعات السوق السعودي",
      en: "We craft exceptional experiences that match the ambitions of the Saudi market",
    } as L,
    lead: {
      ar: "نحن في جذور النمو التجارية نسعى لصناعة تجارب استثنائية من خلال تقديم خدمات متكاملة في تنظيم وإدارة الفعاليات والمعارض، بالإضافة إلى إدارة المرافق السياحية.",
      en: "At Roots of Growth, we set out to create exceptional experiences by delivering integrated services in organizing and managing events and exhibitions, as well as operating tourism facilities.",
    } as L,
    body: {
      ar: "نؤمن بأن الجودة والاحترافية هما أساس النجاح، ونعمل بشغف على تطوير حلول إبداعية تلبي تطلعات عملائنا وتواكب تطورات السوق السعودي. من المعارض والمؤتمرات إلى المخيمات والوجهات السياحية، نرافق عملاءنا من الفكرة الأولى حتى آخر يوم تشغيل.",
      en: "We believe quality and professionalism are the foundation of success, and we work passionately on creative solutions that meet our clients’ ambitions and keep pace with the Saudi market. From exhibitions and conferences to camps and tourist destinations, we stay with our clients from the first idea to the last day of operations.",
    } as L,
    quote: {
      ar: "نؤمن بأن الجودة والاحترافية هما أساس النجاح.",
      en: "We believe quality and professionalism are the foundation of success.",
    } as L,
    signature: { ar: "جذور النمو التجارية", en: "Roots of Growth" } as L,
    buildingAlt: { ar: "واجهة معمارية", en: "Architectural façade" } as L,
    eventAlt: { ar: "متحدث في فعالية", en: "A speaker at an event" } as L,
  },

  /** Facts strip — reading order (rightmost in the RTL frame first). */
  facts: [
    {
      value: "08",
      label: { ar: "خدمات متكاملة\nتحت سقف واحد", en: "Integrated services\nunder one roof" } as L,
      labelMobile: { ar: "خدمات متكاملة تحت سقف واحد", en: "Integrated services under one roof" } as L,
    },
    {
      value: "05",
      label: { ar: "مشاريع وطنية بارزة\nفي معرض أعمالنا", en: "Landmark national projects\nin our portfolio" } as L,
      labelMobile: {
        ar: "مشاريع وطنية بارزة في معرض أعمالنا",
        en: "Landmark national projects in our portfolio",
      } as L,
    },
    {
      value: "360°",
      label: { ar: "من الفكرة والتخطيط\nحتى التشغيل الميداني", en: "From idea and planning\nto on-site operations" } as L,
      labelMobile: { ar: "من الفكرة حتى التشغيل الميداني", en: "From idea to on-site operations" } as L,
    },
  ],

  visionMission: {
    eyebrow: { ar: "رؤيتنا ورسالتنا", en: "Vision & mission" } as L,
    title: { ar: "من الجذور", en: "From the roots," } as L,
    titleAccent: { ar: "ينمو الأثر", en: "impact grows" } as L,
    side: {
      ar: "كل مبادرة ثقافية أو سياحية ناجحة تبدأ بجذور متينة: تخطيط واعٍ، وتنفيذ محترف، وشراكة تستمر بعد انتهاء الحدث.",
      en: "Every successful cultural or tourism initiative starts with strong roots: thoughtful planning, professional execution, and a partnership that lasts beyond the event.",
    } as L,
    vision: {
      title: { ar: "رؤيتنا", en: "Our vision" } as L,
      tag: "Vision",
      body: {
        ar: "أن نكون الخيار الأول في قطاع تنظيم الفعاليات وإدارة المشاريع السياحية في المملكة العربية السعودية.",
        en: "To be the first choice for event organization and tourism project management in the Kingdom of Saudi Arabia.",
      } as L,
    },
    mission: {
      title: { ar: "رسالتنا", en: "Our mission" } as L,
      tag: "Mission",
      body: {
        ar: "تقديم خدمات عالية الجودة ترتكز على الابتكار والالتزام والكفاءة، لبناء شراكات طويلة الأمد وتحقيق أثر إيجابي ومستدام.",
        en: "To deliver high-quality services built on innovation, commitment and efficiency — building long-term partnerships and creating positive, lasting impact.",
      } as L,
    },
  },

  values: {
    eyebrow: { ar: "قيمنا", en: "Our values" } as L,
    title: { ar: "قيمٌ تُترجم إلى تجارب ناجحة", en: "Values that become successful experiences" } as L,
    side: {
      ar: "قيمنا ليست شعارات، بل طريقة عمل يلمسها عملاؤنا في كل مرحلة من مراحل المشروع.",
      en: "Our values aren’t slogans — they’re a way of working our clients feel at every stage of a project.",
    } as L,
    items: [
      {
        number: "01",
        icon: "sparkle" as IconName,
        title: { ar: "الجودة والاحترافية", en: "Quality & professionalism" } as L,
        text: {
          ar: "نؤمن أن الجودة والاحترافية هما أساس النجاح في كل تفصيل.",
          en: "We believe quality and professionalism are the key to success in every detail.",
        } as L,
        textMobile: { ar: "أساس النجاح في كل تفصيل.", en: "The key to success in every detail." } as L,
      },
      {
        number: "02",
        icon: "target" as IconName,
        title: { ar: "الابتكار", en: "Innovation" } as L,
        text: {
          ar: "حلول إبداعية تمنح كل فعالية هوية لا تُنسى.",
          en: "Creative solutions that give every event an unforgettable identity.",
        } as L,
        textMobile: {
          ar: "حلول إبداعية تمنح كل فعالية هوية.",
          en: "Creative solutions that give every event its own identity.",
        } as L,
      },
      {
        number: "03",
        icon: "check" as IconName,
        title: { ar: "الالتزام والكفاءة", en: "Commitment & efficiency" } as L,
        text: {
          ar: "التزام بالمواعيد والميزانيات، وتشغيل ميداني منضبط.",
          en: "On time and on budget, with disciplined on-site operations.",
        } as L,
        textMobile: {
          ar: "التزام بالمواعيد وتشغيل منضبط.",
          en: "On time, with disciplined operations.",
        } as L,
      },
      {
        number: "04",
        icon: "users" as IconName,
        title: { ar: "شراكات طويلة الأمد", en: "Long-term partnerships" } as L,
        text: {
          ar: "علاقات مستدامة تحقق أثراً إيجابياً يدوم بعد الحدث.",
          en: "Lasting relationships that create positive impact long after the event.",
        } as L,
        textMobile: {
          ar: "أثر إيجابي يدوم بعد الحدث.",
          en: "Positive impact that outlasts the event.",
        } as L,
      },
    ],
  },

  sectors: {
    eyebrow: { ar: "القطاعات التي نخدمها", en: "Sectors we serve" } as L,
    title: { ar: "خبرة تمتد عبر القطاعات", en: "Experience across sectors" } as L,
    items: [
      {
        image: "/images/work_baitissa.jpg",
        title: { ar: "الثقافة والتراث", en: "Culture & heritage" } as L,
        text: { ar: "ليالي الدرعية · بيت عيسى", en: "Diriyah Nights · Bait Issa" } as L,
      },
      {
        image: "/images/work_giftedness.jpg",
        title: { ar: "المؤتمرات والجهات الحكومية", en: "Conferences & government" } as L,
        text: {
          ar: "مؤتمر السلامة والصحة المهنية · مؤتمر الموهبة والإبداع",
          en: "Occupational Safety & Health Conference · Giftedness & Creativity Conference",
        } as L,
      },
      {
        image: "/images/work_wc_city.jpg",
        title: { ar: "الرياضة والفعاليات الكبرى", en: "Sports & major events" } as L,
        text: { ar: "المدينة الرقمية لكأس العالم 2034", en: "FIFA World Cup 2034 Digital City" } as L,
      },
      {
        image: "/images/svc_camps.jpg",
        title: { ar: "السياحة والضيافة", en: "Tourism & hospitality" } as L,
        text: {
          ar: "المخيمات والمنتجعات والمرافق السياحية",
          en: "Camps, resorts and tourism facilities",
        } as L,
      },
    ],
  },

  team: {
    eyebrow: { ar: "فريقنا", en: "Our team" } as L,
    title: { ar: "نخبة تعمل بروح الفريق الواحد", en: "An elite team working as one" } as L,
    lead: {
      ar: "يتكون فريقنا من نخبة من المدراء التنفيذيين والمصممين المحترفين، يعملون بروح الفريق الواحد لتقديم أفضل النتائج وتحقيق رضا العملاء.",
      en: "Our team brings together seasoned executives and professional designers who work as one to deliver the best results and complete client satisfaction.",
    } as L,
    button: { ar: "انضم إلى فريقنا", en: "Join our team" } as L,
    imageAlt: { ar: "فريق جذور النمو في اجتماع عمل", en: "The Roots of Growth team at a work meeting" } as L,
    roles: [
      {
        icon: "users" as IconName,
        title: { ar: "المدراء التنفيذيون", en: "Executive managers" } as L,
        text: {
          ar: "قيادة المشاريع وإدارة العلاقة مع العميل من التخطيط حتى الإغلاق.",
          en: "Leading projects and managing the client relationship from planning to close-out.",
        } as L,
      },
      {
        icon: "sparkle" as IconName,
        title: { ar: "المصممون المحترفون", en: "Professional designers" } as L,
        text: {
          ar: "هويات بصرية وأجنحة وديكورات تعكس روح كل حدث.",
          en: "Visual identities, booths and décor that capture the spirit of every event.",
        } as L,
      },
      {
        icon: "pin" as IconName,
        title: { ar: "فرق التشغيل الميداني", en: "On-site operations teams" } as L,
        text: {
          ar: "إدارة الموقع والحشود والمواقف وخدمة صف السيارات يوم الحدث.",
          en: "Site, crowd and parking management plus valet service on event day.",
        } as L,
      },
    ],
  },
};
