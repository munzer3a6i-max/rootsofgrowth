import type { L } from "@/lib/i18n";

/**
 * Home page copy (Figma "Home — Desktop" 16:336 / "Home — Mobile" 18:212).
 * Arabic is verbatim from Figma. Service and project names come from
 * content/services.ts and content/projects.ts.
 */
export const home = {
  meta: {
    title: {
      ar: "جذور النمو التجارية — تنظيم الفعاليات والمعارض وإدارة الوجهات السياحية",
      en: "Roots of Growth — Events, Exhibitions & Tourism Destination Management",
    } as L,
    description: {
      ar: "شريكك الاستراتيجي في تطوير المبادرات الثقافية والسياحية برؤية وطنية مستدامة — من الفكرة والتخطيط حتى التشغيل وإدارة الحشود في يوم الحدث.",
      en: "Your strategic partner in developing cultural and tourism initiatives with a sustainable national vision — from idea and planning to operations and crowd management on event day.",
    } as L,
  },

  hero: {
    chip: {
      ar: "تنظيم الفعاليات والمعارض · إدارة الوجهات السياحية",
      en: "Events & exhibitions · Tourism destination management",
    } as L,
    chipMobile: { ar: "فعاليات · معارض · وجهات سياحية", en: "Events · Exhibitions · Destinations" } as L,
    titleLine1: { ar: "نصنع تجارب", en: "We craft" } as L,
    titleAccent: { ar: "استثنائية", en: "exceptional" } as L,
    titleRest: { ar: "تترك أثراً", en: "experiences that last" } as L,
    lead: {
      ar: "شريكك الاستراتيجي في تطوير المبادرات الثقافية والسياحية برؤية وطنية مستدامة — من الفكرة والتخطيط حتى التشغيل وإدارة الحشود في يوم الحدث.",
      en: "Your strategic partner in developing cultural and tourism initiatives with a sustainable national vision — from idea and planning to operations and crowd management on event day.",
    } as L,
    leadMobile: {
      ar: "شريكك الاستراتيجي في تطوير المبادرات الثقافية والسياحية برؤية وطنية مستدامة.",
      en: "Your strategic partner in developing cultural and tourism initiatives with a sustainable national vision.",
    } as L,
    primary: { ar: "ابدأ مشروعك معنا", en: "Start your project with us" } as L,
    secondary: { ar: "استعرض أعمالنا", en: "Explore our work" } as L,
    metaLocation: { ar: "الرياض، المملكة العربية السعودية", en: "Riyadh, Kingdom of Saudi Arabia" } as L,
    metaKinds: { ar: "فعاليات · معارض · مؤتمرات", en: "Events · Exhibitions · Conferences" } as L,
    imageAlt: { ar: "قصر المصمك في الرياض", en: "Masmak Fortress, Riyadh" } as L,
  },

  strip: {
    title: { ar: "فخورون بصناعة لحظات في", en: "Proud to have crafted moments at" } as L,
    /** Reading order from Figma (right → left in Arabic). */
    items: [
      { slug: "diriyah-nights" },
      { slug: "bait-issa" },
      { slug: "world-cup-digital-city" },
      {
        slug: "gosh-conference",
        short: { ar: "مؤتمر السلامة والصحة المهنية", en: "Occupational Safety & Health Conference" } as L,
      },
      {
        slug: "giftedness-conference",
        short: { ar: "مؤتمر الموهبة والإبداع", en: "Giftedness & Creativity Conference" } as L,
      },
    ] as { slug: string; short?: L }[],
  },

  about: {
    eyebrow: { ar: "من نحن", en: "About us" } as L,
    title: {
      ar: "نصنع تجارب استثنائية تواكب تطلعات السوق السعودي",
      en: "We craft exceptional experiences that match the ambitions of the Saudi market",
    } as L,
    lead: {
      ar: "نحن في جذور النمو التجارية نسعى لصناعة تجارب استثنائية من خلال تقديم خدمات متكاملة في تنظيم وإدارة الفعاليات والمعارض، بالإضافة إلى إدارة المرافق السياحية.",
      en: "At Roots of Growth we set out to create exceptional experiences through integrated services in organizing and managing events and exhibitions, as well as operating tourism facilities.",
    } as L,
    body: {
      ar: "نؤمن بأن الجودة والاحترافية هما أساس النجاح، ونعمل بشغف على تطوير حلول إبداعية تلبي تطلعات عملائنا وتواكب تطورات السوق السعودي.",
      en: "We believe quality and professionalism are the foundation of success, and we work passionately on creative solutions that meet our clients’ aspirations and keep pace with the Saudi market.",
    } as L,
    features: [
      { ar: "تنظيم وإدارة الفعاليات والمعارض", en: "Event & exhibition management" },
      { ar: "إدارة وتشغيل المرافق السياحية", en: "Tourism facility operations" },
      { ar: "تصميم الهويات البصرية والديكورات", en: "Visual identity & décor design" },
      { ar: "الدعم اللوجستي وإدارة الحشود", en: "Logistics & crowd management" },
    ] as L[],
    statNumber: "8",
    stat: {
      ar: "خدمات متكاملة، من الاستشارة\nحتى التشغيل في الموقع",
      en: "Integrated services, from consulting to on-site operations",
    } as L,
    statMobile: {
      ar: "خدمات متكاملة من الاستشارة حتى التشغيل",
      en: "Integrated services from consulting to operations",
    } as L,
    cta: { ar: "تعرّف على خدماتنا", en: "Discover our services" } as L,
    buildingAlt: { ar: "واجهة معمارية حديثة", en: "Modern architectural façade" } as L,
    eventAlt: { ar: "متحدث أمام جمهور في فعالية", en: "Speaker addressing an event audience" } as L,
  },

  vision: {
    eyebrow: { ar: "رؤيتنا ورسالتنا", en: "Vision & mission" } as L,
    title: { ar: "من الجذور", en: "From the roots," } as L,
    titleAccent: { ar: "ينمو الأثر", en: "impact grows" } as L,
    lead: {
      ar: "كل مبادرة ثقافية أو سياحية ناجحة تبدأ بجذور متينة: تخطيط واعٍ، وتنفيذ محترف، وشراكة تستمر بعد انتهاء الحدث.",
      en: "Every successful cultural or tourism initiative starts with solid roots: thoughtful planning, professional delivery and a partnership that lasts beyond the event.",
    } as L,
    visionTitle: { ar: "رؤيتنا", en: "Our vision" } as L,
    visionText: {
      ar: "أن نكون الخيار الأول في قطاع تنظيم الفعاليات وإدارة المشاريع السياحية في المملكة العربية السعودية.",
      en: "To be the first choice for event organization and tourism project management in the Kingdom of Saudi Arabia.",
    } as L,
    visionTag: { ar: "المملكة العربية السعودية", en: "Kingdom of Saudi Arabia" } as L,
    missionTitle: { ar: "رسالتنا", en: "Our mission" } as L,
    missionText: {
      ar: "تقديم خدمات عالية الجودة ترتكز على الابتكار والالتزام والكفاءة، لبناء شراكات طويلة الأمد وتحقيق أثر إيجابي ومستدام.",
      en: "To deliver high-quality services grounded in innovation, commitment and efficiency — building long-term partnerships and a positive, lasting impact.",
    } as L,
    missionTags: [
      { ar: "الابتكار", en: "Innovation" },
      { ar: "الالتزام", en: "Commitment" },
      { ar: "الكفاءة", en: "Efficiency" },
    ] as L[],
  },

  services: {
    eyebrow: { ar: "خدماتنا", en: "Our services" } as L,
    titleLine1: { ar: "حلول متكاملة من الفكرة", en: "Integrated solutions," } as L,
    titleLine2: { ar: "إلى التشغيل", en: "from idea to operation" } as L,
    lead: {
      ar: "من التخطيط الاستراتيجي إلى التشغيل الميداني، نغطي كل مرحلة من مراحل الحدث بفريق واحد ومسؤولية واحدة.",
      en: "From strategic planning to field operations, we cover every stage of your event with one team and one point of accountability.",
    } as L,
    cta: { ar: "اطلب عرض سعر", en: "Request a quote" } as L,
    /** Short card blurbs (Figma cards use shorter copy than services.ts summaries). */
    blurbs: {
      "exhibitions-events": {
        ar: "تنظيم متكامل للمعارض والفعاليات من التخطيط حتى الإغلاق.",
        en: "End-to-end organization of exhibitions and events, from planning to close-out.",
      },
      "event-planning": {
        ar: "تخطيط استراتيجي وإدارة تشغيلية لكل تفاصيل الحدث.",
        en: "Strategic planning and operational management of every event detail.",
      },
      "visual-identity": {
        ar: "هويات بصرية وديكورات وأجنحة تعكس روح الحدث.",
        en: "Visual identities, décor and booths that capture the spirit of the event.",
      },
      "tourism-investment": {
        ar: "دراسات واستشارات لفرص الاستثمار في القطاع السياحي.",
        en: "Studies and advisory on investment opportunities in the tourism sector.",
      },
      "media-marketing": {
        ar: "تنسيق إعلامي وتسويقي يضمن وصول الحدث لجمهوره.",
        en: "Media and marketing coordination that gets your event to its audience.",
      },
      "tourism-facilities": {
        ar: "تشغيل وإدارة المرافق السياحية بمعايير احترافية.",
        en: "Operating and managing tourism facilities to professional standards.",
      },
      "camps-resorts": {
        ar: "تطوير وتشغيل المخيمات والمنتجعات بتجربة ضيافة مميزة.",
        en: "Developing and operating camps and resorts with standout hospitality.",
      },
      logistics: {
        ar: "تنظيم المواقف وخدمة صف السيارات وإدارة الحشود.",
        en: "Parking management, valet service and crowd management.",
      },
    } as Record<string, L>,
    /** Mobile list: shorter Arabic title for one card + the English serif sub-label. */
    mobileTitle: {
      "visual-identity": { ar: "الهويات البصرية والديكورات", en: "Visual Identity & Décor" },
    } as Record<string, L>,
    mobileSub: {
      "exhibitions-events": "Exhibitions & Events",
      "event-planning": "Event Planning",
      "visual-identity": "Visual Identities & Décor",
      "tourism-investment": "Tourism Investment",
      "media-marketing": "Media & Marketing",
      "tourism-facilities": "Facility Management",
      "camps-resorts": "Camps & Resorts",
      logistics: "Logistics & On-site",
    } as Record<string, string>,
  },

  marquee: {
    /** Dark band, reading order. */
    dark: [
      { ar: "فعاليات", en: "Events" },
      { ar: "معارض", en: "Exhibitions" },
      { ar: "مؤتمرات", en: "Conferences" },
      { ar: "مخيمات ومنتجعات", en: "Camps & resorts" },
      { ar: "هويات بصرية", en: "Visual identities" },
      { ar: "إدارة حشود", en: "Crowd management" },
      { ar: "مرافق سياحية", en: "Tourism facilities" },
    ] as L[],
    /** Purple band, reading order. */
    purple: [
      { ar: "مرافق سياحية", en: "Tourism facilities" },
      { ar: "إدارة حشود", en: "Crowd management" },
      { ar: "هويات بصرية", en: "Visual identities" },
      { ar: "مخيمات ومنتجعات", en: "Camps & resorts" },
      { ar: "مؤتمرات", en: "Conferences" },
      { ar: "معارض", en: "Exhibitions" },
      { ar: "فعاليات", en: "Events" },
    ] as L[],
  },

  work: {
    eyebrow: { ar: "معرض أعمالنا", en: "Our portfolio" } as L,
    titleLine1: { ar: "مشاريع صنعنا", en: "Projects where" } as L,
    titleLine2: { ar: "فيها الأثر", en: "we made an impact" } as L,
    cta: { ar: "جميع المشاريع", en: "All projects" } as L,
    /** Row 1 (wide + narrow), row 2 (three equal) — reading order. */
    row1: ["diriyah-nights", "bait-issa"],
    row2: ["world-cup-digital-city", "gosh-conference", "giftedness-conference"],
    /** Mobile shows the first three. */
    mobile: ["diriyah-nights", "bait-issa", "world-cup-digital-city"],
  },

  values: {
    eyebrow: { ar: "لماذا جذور النمو", en: "Why Roots of Growth" } as L,
    titleLine1: { ar: "قيمٌ تُترجم إلى", en: "Values that turn into" } as L,
    titleLine2: { ar: "تجارب ناجحة", en: "successful experiences" } as L,
    lead: {
      ar: "قيمنا ليست شعارات، بل طريقة عمل يلمسها عملاؤنا في كل مرحلة من مراحل المشروع.",
      en: "Our values aren’t slogans — they’re a way of working our clients feel at every stage of the project.",
    } as L,
    items: [
      {
        number: "01",
        title: { ar: "الجودة والاحترافية", en: "Quality & professionalism" } as L,
        text: {
          ar: "نؤمن أن الجودة والاحترافية هما أساس النجاح في كل تفصيل.",
          en: "We believe quality and professionalism are the foundation of success in every detail.",
        } as L,
        textMobile: { ar: "أساس النجاح في كل تفصيل.", en: "The foundation of success in every detail." } as L,
      },
      {
        number: "02",
        title: { ar: "الابتكار", en: "Innovation" } as L,
        text: {
          ar: "حلول إبداعية تمنح كل فعالية هوية لا تُنسى.",
          en: "Creative solutions that give every event an unforgettable identity.",
        } as L,
        textMobile: { ar: "حلول إبداعية تمنح كل فعالية هوية.", en: "Creative solutions that give every event its identity." } as L,
      },
      {
        number: "03",
        title: { ar: "الالتزام والكفاءة", en: "Commitment & efficiency" } as L,
        text: {
          ar: "التزام بالمواعيد والميزانيات، وتشغيل ميداني منضبط.",
          en: "On time and on budget, with disciplined field operations.",
        } as L,
        textMobile: { ar: "التزام بالمواعيد وتشغيل منضبط.", en: "On time, with disciplined operations." } as L,
      },
      {
        number: "04",
        title: { ar: "شراكات طويلة الأمد", en: "Long-term partnerships" } as L,
        text: {
          ar: "علاقات مستدامة تحقق أثراً إيجابياً يدوم بعد الحدث.",
          en: "Lasting relationships that create a positive impact beyond the event.",
        } as L,
        textMobile: { ar: "أثر إيجابي يدوم بعد الحدث.", en: "A positive impact that lasts beyond the event." } as L,
      },
    ],
  },

  team: {
    eyebrow: { ar: "فريقنا", en: "Our team" } as L,
    titleLine1: { ar: "نخبة تعمل بروح", en: "Experts working as" } as L,
    titleLine2: { ar: "الفريق الواحد", en: "one team" } as L,
    lead: {
      ar: "يتكون فريقنا من نخبة من المدراء التنفيذيين والمصممين المحترفين، يعملون بروح الفريق الواحد لتقديم أفضل النتائج وتحقيق رضا العملاء.",
      en: "Our team brings together seasoned executives and professional designers who work as one to deliver the best results and delight our clients.",
    } as L,
    chips: [
      { ar: "مدراء تنفيذيون", en: "Executives" },
      { ar: "مصممون محترفون", en: "Professional designers" },
      { ar: "فرق تشغيل ميداني", en: "Field operations crews" },
    ] as L[],
    cardTitle: { ar: "روح الفريق الواحد", en: "One-team spirit" } as L,
    cardText: { ar: "مدراء تنفيذيون ومصممون محترفون", en: "Executives and professional designers" } as L,
    cta: { ar: "تحدّث مع فريقنا", en: "Talk to our team" } as L,
    imageAlt: { ar: "فريق جذور النمو أثناء العمل", en: "The Roots of Growth team at work" } as L,
  },

  contact: {
    eyebrow: { ar: "تواصل معنا", en: "Contact us" } as L,
    titleLine1: { ar: "لنبدأ التخطيط", en: "Let’s start planning" } as L,
    titleLine2: { ar: "لفعاليتك القادمة", en: "your next event" } as L,
    lead: {
      ar: "سواء كانت فعالية ثقافية، معرضاً، مؤتمراً أو مشروعاً سياحياً — شاركنا فكرتك ودعنا نصنع التجربة معاً.",
      en: "Whether it’s a cultural event, an exhibition, a conference or a tourism project — share your idea and let’s create the experience together.",
    } as L,
    emailLabel: { ar: "البريد الإلكتروني", en: "Email" } as L,
    phoneLabel: { ar: "الجوال", en: "Mobile" } as L,
    addressLabel: { ar: "المقر", en: "Headquarters" } as L,
    form: {
      title: { ar: "أرسل طلبك", en: "Send your request" } as L,
      subtitle: {
        ar: "املأ النموذج وسيتواصل معك فريقنا في أقرب وقت.",
        en: "Fill in the form and our team will get back to you shortly.",
      } as L,
      name: { ar: "الاسم الكامل", en: "Full name" } as L,
      namePh: { ar: "اكتب اسمك", en: "Your name" } as L,
      company: { ar: "اسم الجهة / الشركة", en: "Organization / company" } as L,
      companyPh: { ar: "مثال: هيئة، شركة، جهة حكومية", en: "e.g. authority, company, government entity" } as L,
      phone: { ar: "رقم الجوال", en: "Mobile number" } as L,
      phonePh: "5X XXX XXXX",
      email: { ar: "البريد الإلكتروني", en: "Email" } as L,
      emailPh: "name@company.sa",
      service: { ar: "نوع الخدمة", en: "Service" } as L,
      servicePh: { ar: "اختر الخدمة", en: "Choose a service" } as L,
      otherService: { ar: "خدمة أخرى", en: "Something else" } as L,
      date: { ar: "التاريخ المتوقع", en: "Expected date" } as L,
      datePh: { ar: "اختر التاريخ", en: "Pick a date" } as L,
      message: { ar: "تفاصيل الفعالية", en: "Event details" } as L,
      messagePh: {
        ar: "حدّثنا عن فكرتك، عدد الحضور المتوقع، والموقع…",
        en: "Tell us about your idea, expected attendance and location…",
      } as L,
      messagePhMobile: { ar: "حدّثنا عن فكرتك…", en: "Tell us about your idea…" } as L,
      privacy: {
        ar: "بإرسال النموذج فإنك توافق على سياسة الخصوصية.",
        en: "By submitting this form you agree to our Privacy Policy.",
      } as L,
      submit: { ar: "إرسال الطلب", en: "Send request" } as L,
      sending: { ar: "جارٍ الإرسال…", en: "Sending…" } as L,
      successTitle: { ar: "تم استلام طلبك", en: "Your request has been received" } as L,
      successText: {
        ar: "شكراً لتواصلك مع جذور النمو. سيتواصل معك فريقنا في أقرب وقت.",
        en: "Thank you for contacting Roots of Growth. Our team will be in touch shortly.",
      } as L,
      again: { ar: "إرسال طلب آخر", en: "Send another request" } as L,
      errors: {
        required: { ar: "هذا الحقل مطلوب.", en: "This field is required." },
        name: { ar: "يرجى كتابة اسمك الكامل.", en: "Please enter your full name." },
        email: { ar: "يرجى إدخال بريد إلكتروني صحيح.", en: "Please enter a valid email address." },
        phone: { ar: "يرجى إدخال رقم جوال صحيح.", en: "Please enter a valid mobile number." },
        tooLong: { ar: "النص أطول من المسموح.", en: "This text is too long." },
        validation: { ar: "بعض البيانات غير صحيحة. يرجى المراجعة.", en: "Some details are invalid. Please review them." },
        rate_limited: {
          ar: "أرسلت عدة طلبات خلال وقت قصير. يرجى المحاولة بعد قليل.",
          en: "You’ve sent several requests in a short time. Please try again shortly.",
        },
        server: {
          ar: "تعذّر إرسال طلبك الآن. يرجى المحاولة لاحقاً أو مراسلتنا مباشرة عبر البريد.",
          en: "We couldn’t send your request right now. Please try again later or email us directly.",
        },
        network: {
          ar: "تعذّر الاتصال. تحقّق من اتصالك بالإنترنت وحاول مجدداً.",
          en: "Connection failed. Check your internet connection and try again.",
        },
      } as Record<string, L>,
    },
  },
};
