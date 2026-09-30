import type { L } from "@/lib/i18n";

/**
 * Long-form copy for the Service detail template
 * (Figma: "Service detail — Desktop 1440" 32:864, "Mobile 390" 39:1811).
 *
 * The Figma file only designs "exhibitions-events"; its copy is verbatim.
 * The other seven entries are DRAFT copy written in the same structure and
 * tone from each service's summary/bullets in content/services.ts — review
 * with the client before launch.
 */

/** Labels shared by every service detail page. */
export const serviceDetailLabels = {
  servicesCrumb: { ar: "خدماتنا", en: "Our Services" } as L,
  requestQuote: { ar: "اطلب عرض سعر", en: "Request a quote" } as L,
  downloadProfile: { ar: "تحميل الملف التعريفي", en: "Download company profile" } as L,
  overview: { ar: "نظرة عامة", en: "Overview" } as L,
  included: { ar: "ما الذي تشمله الخدمة", en: "What the service includes" } as L,
  stages: { ar: "مراحل العمل", en: "How the work unfolds" } as L,
  gallery: { ar: "من أعمالنا في هذه الخدمة", en: "Our work in this service" } as L,
  allServices: { ar: "جميع الخدمات", en: "All services" } as L,
  help: {
    title: { ar: "هل لديك فعالية قادمة؟", en: "Have an upcoming event?" } as L,
    text: {
      ar: "تحدّث مع فريقنا واحصل على خطة مبدئية وعرض سعر مناسب.",
      en: "Talk to our team and get an initial plan and a tailored quote.",
    } as L,
  },
  brochure: { ar: "الملف التعريفي", en: "Company profile" } as L,
  related: {
    eyebrow: { ar: "خدمات ذات صلة", en: "Related services" } as L,
    title: { ar: "قد تحتاج أيضاً", en: "You may also need" } as L,
  },
};

/**
 * Company-profile download. No PDF exists in /public yet, so this points to
 * the contact page (PLACEHOLDER) — swap for e.g. "/company-profile.pdf".
 */
export const brochurePath = "/contact?topic=profile";

type GalleryImage = { src: string; alt: L };

const img = {
  wcBooth: { src: "/images/work_wc_booth.jpg", alt: { ar: "جناح في معرض كأس العالم 2034", en: "A booth at the FIFA World Cup 2034 exhibition" } },
  wcCity: { src: "/images/work_wc_city.jpg", alt: { ar: "المدينة الرقمية · كأس العالم 2034", en: "Digital City · FIFA World Cup 2034" } },
  giftedness: { src: "/images/work_giftedness.jpg", alt: { ar: "المؤتمر العالمي للموهبة والإبداع", en: "Global Conference on Giftedness & Creativity" } },
  globe: { src: "/images/work_globe.jpg", alt: { ar: "شاشة كروية في المؤتمر الدولي للسلامة والصحة المهنية", en: "Spherical screen at the International Conference on Occupational Safety & Health" } },
  diriyah: { src: "/images/work_diriyah.jpg", alt: { ar: "ليالي الدرعية", en: "Diriyah Nights" } },
  baitIssa: { src: "/images/work_baitissa.jpg", alt: { ar: "بيت عيسى", en: "Bait Issa" } },
} satisfies Record<string, GalleryImage>;

export type ServiceDetail = {
  /** Page-header title split over two lines (second line in lilac). */
  titleLines: L<[string, string]>;
  overviewTitle: L;
  /** First paragraph (large) and second paragraph (muted). */
  intro: L;
  body: L;
  /** Six "included" cards. */
  included: { title: L; text: L }[];
  /** Four timeline stages. */
  stages: { title: L; text: L }[];
  /** Three gallery photos (mobile shows the first two). */
  gallery: GalleryImage[];
  /** Three related service slugs for "قد تحتاج أيضاً". */
  related: string[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  /* ───────── 01 · Figma copy (verbatim) ───────── */
  "exhibitions-events": {
    titleLines: { ar: ["تنظيم المعارض", "والفعاليات"], en: ["Exhibitions & Events", "Organization"] },
    overviewTitle: { ar: "نحوّل المساحة إلى تجربة", en: "We turn space into an experience" },
    intro: {
      ar: "يبدأ نجاح أي معرض من التخطيط الصحيح للمساحة ورحلة الزائر. نعمل مع الجهة المنظمة على تحديد الأهداف والجمهور، ثم نصمم مخطط المعرض وتوزيع الأجنحة ومسارات الحركة، ونتولى إدارة العارضين والموردين حتى يوم الافتتاح.",
      en: "Every successful exhibition starts with the right plan for the space and the visitor journey. We work with the organizer to define goals and audience, then design the floor plan, booth layout and circulation routes, and manage exhibitors and suppliers right up to opening day.",
    },
    body: {
      ar: "وخلال أيام الحدث، يدير فريقنا الميداني التشغيل اليومي، واستقبال الزوار، والتنسيق مع الجهات المعنية، وصولاً إلى الإغلاق وتسليم الموقع.",
      en: "During the event, our field team runs daily operations, welcomes visitors and coordinates with the relevant authorities, all the way to close-out and venue handover.",
    },
    included: [
      { title: { ar: "تخطيط المساحات", en: "Space planning" }, text: { ar: "مخطط المعرض ومسارات الزوار وتوزيع الأجنحة.", en: "Floor plan, visitor routes and booth allocation." } },
      { title: { ar: "إدارة العارضين", en: "Exhibitor management" }, text: { ar: "التسجيل والتواصل والمتطلبات الفنية لكل عارض.", en: "Registration, communication and technical requirements for every exhibitor." } },
      { title: { ar: "تصميم الأجنحة", en: "Booth design" }, text: { ar: "تصميم وتنفيذ الأجنحة والمنصات والديكورات.", en: "Design and build of booths, stages and décor." } },
      { title: { ar: "الشاشات والتقنيات", en: "Screens & technology" }, text: { ar: "تركيب الشاشات والأنظمة الصوتية والإضاءة.", en: "Installation of screens, sound systems and lighting." } },
      { title: { ar: "تجربة الزوار", en: "Visitor experience" }, text: { ar: "الاستقبال والتسجيل واللوحات الإرشادية.", en: "Reception, registration and wayfinding signage." } },
      { title: { ar: "التشغيل والإغلاق", en: "Operations & close-out" }, text: { ar: "إدارة الأيام التشغيلية وتسليم الموقع.", en: "Managing operating days and handing over the venue." } },
    ],
    stages: [
      { title: { ar: "الاجتماع التمهيدي", en: "Kick-off meeting" }, text: { ar: "فهم الأهداف والجمهور والميزانية والجدول الزمني.", en: "Understanding goals, audience, budget and timeline." } },
      { title: { ar: "التخطيط والتصميم", en: "Planning & design" }, text: { ar: "مخطط المعرض، الهوية، وخطة التشغيل.", en: "Floor plan, identity and operating plan." } },
      { title: { ar: "التجهيز والتنفيذ", en: "Build & installation" }, text: { ar: "تنفيذ الأجنحة وتركيب الشاشات والتجهيزات.", en: "Building booths and installing screens and equipment." } },
      { title: { ar: "التشغيل والإغلاق", en: "Operations & close-out" }, text: { ar: "إدارة أيام الحدث ثم تقرير ختامي.", en: "Running the event days, followed by a final report." } },
    ],
    gallery: [img.globe, img.giftedness, img.wcBooth],
    related: ["event-planning", "visual-identity", "logistics"],
  },

  /* ───────── 02 · DRAFT ───────── */
  "event-planning": {
    titleLines: { ar: ["تخطيط وإدارة", "الفعاليات"], en: ["Event Planning", "& Management"] },
    overviewTitle: { ar: "من الفكرة إلى يوم الحدث", en: "From idea to event day" },
    intro: {
      ar: "كل فعالية ناجحة تقوم على خطة واضحة. نبدأ بفهم فكرتك وأهدافك وجمهورك، ثم نحولها إلى خطة تشغيلية وجدول زمني مفصل، ونحدد الموردين والميزانية ونوزع المسؤوليات على فريق العمل.",
      en: "Every successful event rests on a clear plan. We start by understanding your idea, goals and audience, then turn them into an operational plan and a detailed timeline, select suppliers, set the budget and assign responsibilities across the team.",
    },
    body: {
      ar: "وفي يوم الحدث، يدير فريقنا كل التفاصيل من غرفة عمليات واحدة: البرنامج، والضيوف، والموردين، والطوارئ، حتى تمر الفعالية بسلاسة ويبقى تركيزك على ضيوفك.",
      en: "On event day, our team runs every detail from a single operations room — programme, guests, suppliers and contingencies — so the event flows smoothly and you can stay focused on your guests.",
    },
    included: [
      { title: { ar: "الخطة التشغيلية", en: "Operational plan" }, text: { ar: "تحديد المهام والمسؤوليات وسير العمل.", en: "Tasks, responsibilities and workflow defined." } },
      { title: { ar: "الجدول الزمني", en: "Timeline" }, text: { ar: "مراحل التحضير ومواعيد التسليم والبرنامج.", en: "Preparation milestones, deadlines and programme." } },
      { title: { ar: "إدارة الموردين", en: "Supplier management" }, text: { ar: "اختيار الموردين والتعاقد والمتابعة.", en: "Selecting, contracting and following up with suppliers." } },
      { title: { ar: "إدارة الميزانية", en: "Budget management" }, text: { ar: "تقدير التكاليف وضبط الصرف والتقارير المالية.", en: "Cost estimates, spend control and financial reporting." } },
      { title: { ar: "إدارة الضيوف", en: "Guest management" }, text: { ar: "الدعوات والتسجيل والاستقبال والبروتوكول.", en: "Invitations, registration, reception and protocol." } },
      { title: { ar: "إدارة يوم الحدث", en: "Event-day management" }, text: { ar: "غرفة عمليات وفرق ميدانية وخطط طوارئ.", en: "Operations room, field teams and contingency plans." } },
    ],
    stages: [
      { title: { ar: "الاجتماع التمهيدي", en: "Kick-off meeting" }, text: { ar: "فهم الفكرة والأهداف والجمهور والميزانية.", en: "Understanding the idea, goals, audience and budget." } },
      { title: { ar: "التخطيط", en: "Planning" }, text: { ar: "الخطة التشغيلية والجدول الزمني واختيار الموردين.", en: "Operational plan, timeline and supplier selection." } },
      { title: { ar: "التحضير والتنسيق", en: "Preparation & coordination" }, text: { ar: "متابعة الموردين وتجهيز الموقع والبروفات.", en: "Supplier follow-up, venue set-up and rehearsals." } },
      { title: { ar: "التنفيذ والتقييم", en: "Delivery & evaluation" }, text: { ar: "إدارة يوم الحدث ثم تقرير ختامي.", en: "Managing event day, followed by a final report." } },
    ],
    gallery: [img.diriyah, img.giftedness, img.baitIssa],
    related: ["exhibitions-events", "media-marketing", "logistics"],
  },

  /* ───────── 03 · DRAFT ───────── */
  "visual-identity": {
    titleLines: { ar: ["الهويات البصرية", "والديكورات"], en: ["Visual Identity", "& Décor"] },
    overviewTitle: { ar: "هوية تُرى وتُحَس", en: "An identity you can see and feel" },
    intro: {
      ar: "الانطباع الأول يصنعه المشهد. نصمم هوية بصرية متكاملة للفعالية تبدأ من الشعار والألوان والمطبوعات، وتمتد إلى الأجنحة والمنصات والديكورات التي تعكس روح الحدث ورسالته.",
      en: "The first impression is visual. We design a complete event identity — from logo, colours and print to the booths, stages and décor that express the spirit and message of the event.",
    },
    body: {
      ar: "ويتولى فريقنا التنفيذ والتركيب في الموقع، من تصنيع الأجنحة إلى تركيب الشاشات والإضاءة، مع متابعة الجودة حتى آخر تفصيلة.",
      en: "Our team then handles fabrication and on-site installation, from building booths to fitting screens and lighting, with quality control down to the last detail.",
    },
    included: [
      { title: { ar: "هوية الفعالية", en: "Event identity" }, text: { ar: "الشعار والألوان والخطوط ودليل الاستخدام.", en: "Logo, colours, typography and usage guide." } },
      { title: { ar: "المطبوعات", en: "Print" }, text: { ar: "الدعوات واللوحات والمطبوعات الترويجية.", en: "Invitations, signage and promotional print." } },
      { title: { ar: "تصميم الأجنحة", en: "Booth design" }, text: { ar: "تصاميم ثلاثية الأبعاد للأجنحة والمنصات.", en: "3D designs for booths and stages." } },
      { title: { ar: "التصنيع والتركيب", en: "Fabrication & installation" }, text: { ar: "تنفيذ الأجنحة والديكورات في الموقع.", en: "Building booths and décor on site." } },
      { title: { ar: "الشاشات والإضاءة", en: "Screens & lighting" }, text: { ar: "تركيب الشاشات وتصميم الإضاءة.", en: "Screen installation and lighting design." } },
      { title: { ar: "اللوحات الإرشادية", en: "Wayfinding" }, text: { ar: "لوحات توجيهية واضحة ومتسقة مع الهوية.", en: "Clear directional signage consistent with the identity." } },
    ],
    stages: [
      { title: { ar: "فهم الرسالة", en: "Understanding the message" }, text: { ar: "الأهداف والجمهور وروح الحدث.", en: "Goals, audience and the spirit of the event." } },
      { title: { ar: "التصميم", en: "Design" }, text: { ar: "الهوية والمطبوعات والتصاميم ثلاثية الأبعاد.", en: "Identity, print and 3D designs." } },
      { title: { ar: "التصنيع", en: "Fabrication" }, text: { ar: "تنفيذ الأجنحة والديكورات والمطبوعات.", en: "Producing booths, décor and print." } },
      { title: { ar: "التركيب والتسليم", en: "Installation & handover" }, text: { ar: "التركيب في الموقع ثم الفك بعد الحدث.", en: "On-site installation, then dismantling after the event." } },
    ],
    gallery: [img.wcBooth, img.wcCity, img.globe],
    related: ["exhibitions-events", "event-planning", "media-marketing"],
  },

  /* ───────── 04 · DRAFT ───────── */
  "tourism-investment": {
    titleLines: { ar: ["استشارات", "الاستثمار السياحي"], en: ["Tourism Investment", "Consulting"] },
    overviewTitle: { ar: "نقرأ الفرصة قبل أن نستثمر فيها", en: "We read the opportunity before investing in it" },
    intro: {
      ar: "يشهد القطاع السياحي في المملكة نمواً غير مسبوق، ومعه فرص تحتاج إلى قراءة دقيقة. نساعد المستثمرين والجهات على تقييم الفرص والمواقع، وإعداد دراسات الجدوى التي تبني القرار على أرقام واضحة.",
      en: "The Kingdom’s tourism sector is growing at an unprecedented pace, and with it come opportunities that need careful reading. We help investors and organizations assess opportunities and sites, and prepare feasibility studies that ground decisions in clear numbers.",
    },
    body: {
      ar: "ثم نحوّل الفرصة إلى مشروع قابل للتنفيذ، عبر خطط تطوير وتشغيل واقعية تراعي السوق والجمهور ومتطلبات الجهات التنظيمية.",
      en: "We then turn the opportunity into a viable project through realistic development and operating plans that account for the market, the audience and regulatory requirements.",
    },
    included: [
      { title: { ar: "دراسات الجدوى", en: "Feasibility studies" }, text: { ar: "تحليل السوق والتكاليف والعوائد المتوقعة.", en: "Market, cost and expected-return analysis." } },
      { title: { ar: "تقييم الفرص", en: "Opportunity assessment" }, text: { ar: "قراءة الطلب والمنافسة وملاءمة الفكرة.", en: "Demand, competition and concept fit." } },
      { title: { ar: "تقييم المواقع", en: "Site assessment" }, text: { ar: "دراسة الموقع والوصول والبنية التحتية.", en: "Location, access and infrastructure review." } },
      { title: { ar: "خطط التطوير", en: "Development plans" }, text: { ar: "المفهوم والمراحل والجدول الزمني للمشروع.", en: "Concept, phasing and project timeline." } },
      { title: { ar: "خطط التشغيل", en: "Operating plans" }, text: { ar: "نموذج التشغيل والتسعير والكوادر.", en: "Operating model, pricing and staffing." } },
      { title: { ar: "المتطلبات التنظيمية", en: "Regulatory requirements" }, text: { ar: "التراخيص والاشتراطات والتنسيق مع الجهات.", en: "Licences, conditions and liaison with authorities." } },
    ],
    stages: [
      { title: { ar: "جلسة الاكتشاف", en: "Discovery session" }, text: { ar: "فهم أهداف المستثمر ونطاق الفرصة.", en: "Understanding investor goals and the scope of the opportunity." } },
      { title: { ar: "البحث والتحليل", en: "Research & analysis" }, text: { ar: "دراسة السوق والموقع والمنافسين.", en: "Market, site and competitor research." } },
      { title: { ar: "دراسة الجدوى", en: "Feasibility study" }, text: { ar: "النموذج المالي والسيناريوهات والتوصيات.", en: "Financial model, scenarios and recommendations." } },
      { title: { ar: "خطة التنفيذ", en: "Implementation plan" }, text: { ar: "خطة التطوير والتشغيل ومراحل الإطلاق.", en: "Development and operating plan with launch phases." } },
    ],
    gallery: [img.baitIssa, img.diriyah, img.wcCity],
    related: ["tourism-facilities", "camps-resorts", "event-planning"],
  },

  /* ───────── 05 · DRAFT ───────── */
  "media-marketing": {
    titleLines: { ar: ["التنسيق الإعلامي", "والتسويقي"], en: ["Media & Marketing", "Coordination"] },
    overviewTitle: { ar: "حدثك يصل إلى جمهوره", en: "Your event reaches its audience" },
    intro: {
      ar: "لا يكتمل نجاح الحدث دون جمهور يعرف عنه ويحضره ويتحدث عنه. نضع خطة إطلاق وترويج تحدد الرسائل والقنوات والتوقيت، وننسق الحملات الرقمية والحضور الإعلامي قبل الانطلاق.",
      en: "An event isn’t a success until people know about it, attend it and talk about it. We build a launch and promotion plan that sets the messages, channels and timing, and coordinate digital campaigns and media presence ahead of launch.",
    },
    body: {
      ar: "وأثناء الحدث وبعده، يتولى فريقنا التنسيق مع وسائل الإعلام والتغطية المباشرة والتوثيق بالصور والفيديو، ليبقى أثر الحدث حاضراً بعد انتهائه.",
      en: "During and after the event, our team handles media relations, live coverage and photo and video documentation, so the event’s impact lasts well beyond the closing day.",
    },
    included: [
      { title: { ar: "خطة الإطلاق", en: "Launch plan" }, text: { ar: "الرسائل والقنوات والجدول الزمني للحملة.", en: "Messages, channels and campaign timeline." } },
      { title: { ar: "الحملات الرقمية", en: "Digital campaigns" }, text: { ar: "المحتوى والإعلانات وإدارة المنصات.", en: "Content, ads and social media management." } },
      { title: { ar: "العلاقات الإعلامية", en: "Media relations" }, text: { ar: "البيانات الصحفية ودعوة وسائل الإعلام.", en: "Press releases and media invitations." } },
      { title: { ar: "المركز الإعلامي", en: "Media centre" }, text: { ar: "تجهيز المركز الإعلامي وإدارة المقابلات.", en: "Setting up the media centre and managing interviews." } },
      { title: { ar: "التغطية المباشرة", en: "Live coverage" }, text: { ar: "تغطية فورية على المنصات خلال الحدث.", en: "Real-time coverage across platforms during the event." } },
      { title: { ar: "التوثيق", en: "Documentation" }, text: { ar: "التصوير والفيديو والتقرير الإعلامي.", en: "Photography, video and a media report." } },
    ],
    stages: [
      { title: { ar: "فهم الجمهور", en: "Audience insight" }, text: { ar: "تحديد الجمهور المستهدف والرسائل الرئيسية.", en: "Defining the target audience and key messages." } },
      { title: { ar: "الخطة والمحتوى", en: "Plan & content" }, text: { ar: "خطة القنوات وإنتاج المحتوى.", en: "Channel plan and content production." } },
      { title: { ar: "الإطلاق والترويج", en: "Launch & promotion" }, text: { ar: "تشغيل الحملات والتنسيق مع الإعلام.", en: "Running campaigns and coordinating with the media." } },
      { title: { ar: "التغطية والتقرير", en: "Coverage & reporting" }, text: { ar: "تغطية الحدث ثم تقرير بالنتائج.", en: "Event coverage, followed by a results report." } },
    ],
    gallery: [img.wcCity, img.globe, img.diriyah],
    related: ["event-planning", "visual-identity", "exhibitions-events"],
  },

  /* ───────── 06 · DRAFT ───────── */
  "tourism-facilities": {
    titleLines: { ar: ["إدارة المرافق", "السياحية"], en: ["Tourism Facilities", "Management"] },
    overviewTitle: { ar: "تشغيل يليق بالوجهة", en: "Operations worthy of the destination" },
    intro: {
      ar: "المرفق السياحي تجربة متكاملة تبدأ من لحظة وصول الزائر. نتولى التشغيل اليومي للمرافق السياحية بمعايير احترافية، من إدارة الفرق والخدمات إلى رحلة الزائر ونقاط التواصل معه.",
      en: "A tourism facility is a complete experience that begins the moment a visitor arrives. We run day-to-day operations of tourism facilities to professional standards — from managing teams and services to the visitor journey and every touchpoint along it.",
    },
    body: {
      ar: "ونضمن استدامة التشغيل عبر برامج الصيانة الوقائية وضبط الجودة وقياس رضا الزوار، مع تقارير دورية تساعدك على التطوير المستمر.",
      en: "We keep operations sustainable through preventive maintenance, quality control and visitor-satisfaction measurement, with regular reports that support continuous improvement.",
    },
    included: [
      { title: { ar: "التشغيل اليومي", en: "Daily operations" }, text: { ar: "إدارة الفرق والمناوبات والخدمات.", en: "Managing teams, shifts and services." } },
      { title: { ar: "تجربة الزوار", en: "Visitor experience" }, text: { ar: "الاستقبال والتذاكر والإرشاد.", en: "Reception, ticketing and guidance." } },
      { title: { ar: "الصيانة", en: "Maintenance" }, text: { ar: "صيانة وقائية وتصحيحية للمرفق.", en: "Preventive and corrective facility maintenance." } },
      { title: { ar: "ضبط الجودة", en: "Quality control" }, text: { ar: "معايير الخدمة والتفتيش الدوري.", en: "Service standards and regular inspections." } },
      { title: { ar: "السلامة والأمن", en: "Health & safety" }, text: { ar: "خطط السلامة والإخلاء والتنسيق الأمني.", en: "Safety, evacuation and security plans." } },
      { title: { ar: "التقارير والتطوير", en: "Reporting & improvement" }, text: { ar: "مؤشرات الأداء ورضا الزوار.", en: "Performance indicators and visitor satisfaction." } },
    ],
    stages: [
      { title: { ar: "التقييم الأولي", en: "Initial assessment" }, text: { ar: "دراسة المرفق ووضعه التشغيلي الحالي.", en: "Reviewing the facility and its current operations." } },
      { title: { ar: "خطة التشغيل", en: "Operating plan" }, text: { ar: "الهيكل والإجراءات ومعايير الخدمة.", en: "Structure, procedures and service standards." } },
      { title: { ar: "الاستلام والتشغيل", en: "Takeover & operation" }, text: { ar: "تجهيز الفرق وبدء التشغيل اليومي.", en: "Onboarding teams and starting daily operations." } },
      { title: { ar: "المتابعة والتطوير", en: "Monitoring & improvement" }, text: { ar: "تقارير دورية وتحسين مستمر.", en: "Regular reports and continuous improvement." } },
    ],
    gallery: [img.baitIssa, img.diriyah, img.wcCity],
    related: ["camps-resorts", "tourism-investment", "logistics"],
  },

  /* ───────── 07 · DRAFT ───────── */
  "camps-resorts": {
    titleLines: { ar: ["المخيمات", "والمنتجعات"], en: ["Camps", "& Resorts"] },
    overviewTitle: { ar: "ضيافة بين الأصالة والراحة", en: "Hospitality between authenticity and comfort" },
    intro: {
      ar: "نطوّر المخيمات والمنتجعات من الفكرة إلى الافتتاح: نختار المفهوم المناسب للموقع والجمهور، ونصمم المساحات ونجهزها بما يجمع بين روح المكان ومعايير الراحة الحديثة.",
      en: "We develop camps and resorts from concept to opening: choosing the right concept for the site and audience, then designing and fitting out spaces that combine the spirit of the place with modern standards of comfort.",
    },
    body: {
      ar: "ثم نتولى التشغيل والضيافة اليومية، ونصمم برامج وأنشطة تمنح الضيوف تجربة لا تُنسى وتدفعهم للعودة من جديد.",
      en: "We then run day-to-day operations and hospitality, and design programmes and activities that give guests an unforgettable stay — and a reason to come back.",
    },
    included: [
      { title: { ar: "المفهوم والتصميم", en: "Concept & design" }, text: { ar: "مفهوم المخيم وتصميم المساحات.", en: "Camp concept and space design." } },
      { title: { ar: "التجهيز", en: "Fit-out" }, text: { ar: "الخيام والوحدات والأثاث والمرافق.", en: "Tents, units, furniture and amenities." } },
      { title: { ar: "التشغيل", en: "Operations" }, text: { ar: "الحجوزات والفرق والخدمات اليومية.", en: "Bookings, teams and daily services." } },
      { title: { ar: "الضيافة", en: "Hospitality" }, text: { ar: "الاستقبال والإعاشة وخدمة الضيوف.", en: "Reception, catering and guest services." } },
      { title: { ar: "البرامج والأنشطة", en: "Programmes & activities" }, text: { ar: "تجارب ثقافية وترفيهية للضيوف.", en: "Cultural and leisure experiences for guests." } },
      { title: { ar: "السلامة والصيانة", en: "Safety & maintenance" }, text: { ar: "معايير السلامة وصيانة الموقع.", en: "Safety standards and site maintenance." } },
    ],
    stages: [
      { title: { ar: "دراسة الموقع", en: "Site study" }, text: { ar: "الموقع والجمهور والمفهوم المناسب.", en: "Site, audience and the right concept." } },
      { title: { ar: "التصميم والتخطيط", en: "Design & planning" }, text: { ar: "المخطط العام والتجهيزات والميزانية.", en: "Master plan, fit-out and budget." } },
      { title: { ar: "التجهيز والافتتاح", en: "Fit-out & opening" }, text: { ar: "تنفيذ التجهيزات وتدريب الفرق.", en: "Delivering the fit-out and training teams." } },
      { title: { ar: "التشغيل والتطوير", en: "Operation & growth" }, text: { ar: "إدارة الموسم ثم تقرير وتوصيات.", en: "Running the season, then a report and recommendations." } },
    ],
    gallery: [img.diriyah, img.baitIssa, img.wcCity],
    related: ["tourism-facilities", "tourism-investment", "event-planning"],
  },

  /* ───────── 08 · DRAFT ───────── */
  logistics: {
    titleLines: { ar: ["الخدمات اللوجستية", "والدعم الميداني"], en: ["Logistics", "& Field Support"] },
    overviewTitle: { ar: "حركة سلسة من الوصول حتى المغادرة", en: "Smooth flow from arrival to departure" },
    intro: {
      ar: "تبدأ تجربة الضيف قبل دخوله الحدث. نخطط لحركة الوصول والمغادرة، وننظم مواقف السيارات وخدمة صفها، ونحدد مسارات الدخول والخروج بما يضمن انسيابية الحركة في أوقات الذروة.",
      en: "A guest’s experience starts before they walk in. We plan arrivals and departures, organize parking and valet service, and define entry and exit routes so traffic keeps flowing even at peak times.",
    },
    body: {
      ar: "وداخل الموقع، تدير فرقنا الميدانية الحشود وتنسق مع الجهات الأمنية والإسعافية، لضمان سلامة الحضور وراحتهم طوال أيام الحدث.",
      en: "On site, our field teams manage crowds and coordinate with security and medical services to keep attendees safe and comfortable throughout the event.",
    },
    included: [
      { title: { ar: "تنظيم المواقف", en: "Parking management" }, text: { ar: "تخطيط المواقف والإرشاد المروري.", en: "Parking layout and traffic marshalling." } },
      { title: { ar: "صف السيارات", en: "Valet service" }, text: { ar: "خدمة صف السيارات لكبار الضيوف والزوار.", en: "Valet parking for VIPs and visitors." } },
      { title: { ar: "إدارة الحشود", en: "Crowd management" }, text: { ar: "مسارات الدخول والخروج وتنظيم الطوابير.", en: "Entry and exit routes and queue management." } },
      { title: { ar: "النقل والتنقل", en: "Transport" }, text: { ar: "حافلات ترددية ونقل الضيوف والفرق.", en: "Shuttle buses and transport for guests and teams." } },
      { title: { ar: "الفرق الميدانية", en: "Field teams" }, text: { ar: "منظمون ومرشدون مدربون في الموقع.", en: "Trained stewards and guides on site." } },
      { title: { ar: "السلامة والطوارئ", en: "Safety & emergencies" }, text: { ar: "خطط الطوارئ والتنسيق مع الجهات المعنية.", en: "Emergency plans and coordination with authorities." } },
    ],
    stages: [
      { title: { ar: "دراسة الموقع", en: "Site survey" }, text: { ar: "الطاقة الاستيعابية والمداخل والمواقف.", en: "Capacity, entrances and parking." } },
      { title: { ar: "خطة الحركة", en: "Traffic plan" }, text: { ar: "مسارات الوصول والمغادرة وتوزيع الفرق.", en: "Arrival and departure routes and team deployment." } },
      { title: { ar: "التجهيز والتدريب", en: "Set-up & training" }, text: { ar: "اللوحات الإرشادية وتدريب الفرق الميدانية.", en: "Signage and field-team training." } },
      { title: { ar: "التشغيل والتقرير", en: "Operation & reporting" }, text: { ar: "إدارة أيام الحدث ثم تقرير ختامي.", en: "Running the event days, followed by a final report." } },
    ],
    gallery: [img.wcCity, img.giftedness, img.diriyah],
    related: ["exhibitions-events", "event-planning", "tourism-facilities"],
  },
};

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails[slug];
}
