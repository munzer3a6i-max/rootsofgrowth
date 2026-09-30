import type { L } from "@/lib/i18n";

/**
 * Contact page copy (Figma: "Contact — تواصل معنا" 35:1363 / mobile 40:2147).
 * Arabic is verbatim from Figma.
 */
export const contactPage = {
  meta: {
    title: { ar: "تواصل معنا", en: "Contact us" } as L,
    description: {
      ar: "شاركنا فكرتك — سواء كانت فعالية ثقافية، معرضاً، مؤتمراً أو مشروعاً سياحياً — وسيتواصل معك فريق جذور النمو في أقرب وقت.",
      en: "Share your idea — a cultural event, an exhibition, a conference or a tourism project — and the Roots of Growth team will get back to you shortly.",
    } as L,
  },

  header: {
    crumb: { ar: "تواصل معنا", en: "Contact" } as L,
    title: { ar: "لنصنع تجربتك", en: "Let’s create your" } as L,
    titleAccent: { ar: "القادمة معاً", en: "next experience" } as L,
    lead: {
      ar: "شاركنا فكرتك — سواء كانت فعالية ثقافية، معرضاً، مؤتمراً أو مشروعاً سياحياً — وسيتواصل معك فريقنا في أقرب وقت.",
      en: "Share your idea — whether it’s a cultural event, an exhibition, a conference or a tourism project — and our team will be in touch shortly.",
    } as L,
    leadMobile: {
      ar: "شاركنا فكرتك وسيتواصل معك فريقنا في أقرب وقت.",
      en: "Share your idea and our team will be in touch shortly.",
    } as L,
    image: "/images/svc_events.jpg",
    imageAlt: { ar: "فعالية وحضور", en: "An event with a live audience" } as L,
  },

  cards: {
    email: {
      label: { ar: "البريد الإلكتروني", en: "Email" } as L,
      action: { ar: "أرسل بريداً", en: "Send an email" } as L,
    },
    phone: {
      label: { ar: "الجوال", en: "Mobile" } as L,
      action: { ar: "اتصل الآن", en: "Call now" } as L,
    },
    address: {
      label: { ar: "المقر", en: "Headquarters" } as L,
      action: { ar: "عرض على الخريطة", en: "View on map" } as L,
    },
  },

  next: {
    eyebrow: { ar: "ماذا يحدث بعد ذلك؟", en: "What happens next?" } as L,
    steps: [
      {
        title: { ar: "نراجع طلبك", en: "We review your request" } as L,
        text: {
          ar: "يطّلع فريقنا على تفاصيل فعاليتك ومتطلباتها.",
          en: "Our team studies the details and requirements of your event.",
        } as L,
        textMobile: { ar: "يطّلع فريقنا على تفاصيل فعاليتك.", en: "Our team studies the details of your event." } as L,
      },
      {
        title: { ar: "نتواصل معك", en: "We get in touch" } as L,
        text: {
          ar: "مكالمة قصيرة لفهم الأهداف والجمهور والميزانية.",
          en: "A short call to understand your goals, audience and budget.",
        } as L,
        textMobile: {
          ar: "مكالمة قصيرة لفهم الأهداف والميزانية.",
          en: "A short call to understand your goals and budget.",
        } as L,
      },
      {
        title: { ar: "خطة وعرض سعر", en: "A plan and a quote" } as L,
        text: {
          ar: "نرسل لك تصوراً مبدئياً وعرض سعر مناسباً.",
          en: "We send you an initial concept and a tailored quote.",
        } as L,
        textMobile: { ar: "تصور مبدئي وعرض سعر مناسب.", en: "An initial concept and a tailored quote." } as L,
      },
    ],
  },

  follow: { ar: "تابعنا", en: "Follow us" } as L,

  map: {
    label: { ar: "مقرنا", en: "Our headquarters" } as L,
    button: { ar: "افتح في خرائط Google", en: "Open in Google Maps" } as L,
    iframeTitle: { ar: "موقع جذور النمو على الخريطة", en: "Roots of Growth location map" } as L,
  },
};

/** Contact form copy — shared by the Contact page and (optionally) the Home page. */
export const contactForm = {
  title: { ar: "أرسل طلبك", en: "Send your request" } as L,
  requiredNote: { ar: "الحقول المعلّمة بـ * مطلوبة.", en: "Fields marked with * are required." } as L,

  fields: {
    name: { label: { ar: "الاسم الكامل", en: "Full name" } as L, placeholder: { ar: "اكتب اسمك", en: "Your name" } as L },
    company: {
      label: { ar: "اسم الجهة / الشركة", en: "Organization / company" } as L,
      placeholder: { ar: "مثال: هيئة، شركة، جهة حكومية", en: "e.g. an authority, a company, a government entity" } as L,
      placeholderMobile: { ar: "اسم الجهة", en: "Organization name" } as L,
    },
    email: { label: { ar: "البريد الإلكتروني", en: "Email" } as L, placeholder: { ar: "name@company.sa", en: "name@company.sa" } as L },
    phone: { label: { ar: "رقم الجوال", en: "Mobile number" } as L, placeholder: { ar: "5X XXX XXXX", en: "5X XXX XXXX" } as L },
    city: { label: { ar: "المدينة", en: "City" } as L, placeholder: { ar: "الرياض", en: "Riyadh" } as L },
    service: { label: { ar: "نوع الخدمة", en: "Service" } as L, placeholder: { ar: "اختر الخدمة", en: "Choose a service" } as L },
    attendees: {
      label: { ar: "عدد الحضور المتوقع", en: "Expected attendance" } as L,
      placeholder: { ar: "اختر النطاق", en: "Choose a range" } as L,
    },
    date: { label: { ar: "التاريخ المتوقع", en: "Expected date" } as L, placeholder: { ar: "اختر التاريخ", en: "Choose a date" } as L },
    budget: { label: { ar: "الميزانية التقديرية", en: "Estimated budget" } as L },
    message: {
      label: { ar: "تفاصيل الفعالية", en: "Event details" } as L,
      placeholder: {
        ar: "حدّثنا عن فكرتك، أهدافك، الموقع المقترح…",
        en: "Tell us about your idea, your goals, the proposed venue…",
      } as L,
      placeholderMobile: { ar: "حدّثنا عن فكرتك…", en: "Tell us about your idea…" } as L,
    },
    attachment: {
      label: { ar: "أرفق ملفاً (اختياري) — PDF، صور، عرض تقديمي", en: "Attach a file (optional) — PDF, images, presentation" } as L,
      remove: { ar: "إزالة الملف", en: "Remove file" } as L,
    },
  },

  /** DRAFT: city list is not in Figma (only the "الرياض" placeholder). */
  cities: [
    { value: "riyadh", label: { ar: "الرياض", en: "Riyadh" } as L },
    { value: "jeddah", label: { ar: "جدة", en: "Jeddah" } as L },
    { value: "makkah", label: { ar: "مكة المكرمة", en: "Makkah" } as L },
    { value: "madinah", label: { ar: "المدينة المنورة", en: "Madinah" } as L },
    { value: "dammam", label: { ar: "الدمام / المنطقة الشرقية", en: "Dammam / Eastern Province" } as L },
    { value: "alula", label: { ar: "العُلا", en: "AlUla" } as L },
    { value: "abha", label: { ar: "أبها", en: "Abha" } as L },
    { value: "other", label: { ar: "مدينة أخرى", en: "Another city" } as L },
  ],

  /** DRAFT: attendance ranges are not in Figma (only the "اختر النطاق" placeholder). */
  attendees: [
    { value: "lt100", label: { ar: "أقل من 100", en: "Under 100" } as L },
    { value: "100-500", label: { ar: "100 – 500", en: "100 – 500" } as L },
    { value: "500-2000", label: { ar: "500 – 2,000", en: "500 – 2,000" } as L },
    { value: "2000-10000", label: { ar: "2,000 – 10,000", en: "2,000 – 10,000" } as L },
    { value: "gt10000", label: { ar: "أكثر من 10,000", en: "Over 10,000" } as L },
  ],

  /** DRAFT copy from Figma — budget ranges to be confirmed by the client. */
  budgets: [
    { value: "lt100k", label: { ar: "أقل من 100 ألف ر.س", en: "Under SAR 100K" } as L },
    { value: "100k-500k", label: { ar: "100 – 500 ألف ر.س", en: "SAR 100K – 500K" } as L },
    { value: "500k-1m", label: { ar: "500 ألف – مليون ر.س", en: "SAR 500K – 1M" } as L },
    { value: "gt1m", label: { ar: "أكثر من مليون ر.س", en: "Over SAR 1M" } as L },
  ],

  /** Extra option appended after the eight services. */
  otherService: { value: "other", label: { ar: "خدمة أخرى", en: "Something else" } as L },

  privacy: { ar: "بإرسال النموذج فإنك توافق على سياسة الخصوصية.", en: "By submitting this form you agree to our Privacy Policy." } as L,
  submit: { ar: "إرسال الطلب", en: "Send request" } as L,
  sending: { ar: "جارٍ الإرسال…", en: "Sending…" } as L,

  success: {
    title: { ar: "تم استلام طلبك", en: "Your request has been received" } as L,
    text: {
      ar: "شكراً لتواصلك مع جذور النمو. سيتواصل معك فريقنا في أقرب وقت.",
      en: "Thank you for contacting Roots of Growth. Our team will be in touch shortly.",
    } as L,
    again: { ar: "إرسال طلب آخر", en: "Send another request" } as L,
  },

  errors: {
    required: { ar: "هذا الحقل مطلوب.", en: "This field is required." } as L,
    name: { ar: "يرجى كتابة اسمك الكامل.", en: "Please enter your full name." } as L,
    email: { ar: "يرجى إدخال بريد إلكتروني صحيح.", en: "Please enter a valid email address." } as L,
    phone: { ar: "يرجى إدخال رقم جوال صحيح.", en: "Please enter a valid mobile number." } as L,
    service: { ar: "يرجى اختيار الخدمة.", en: "Please choose a service." } as L,
    tooLong: { ar: "النص أطول من المسموح.", en: "This text is too long." } as L,
    fileType: {
      ar: "نوع الملف غير مدعوم. المسموح: PDF، صور، عرض تقديمي.",
      en: "Unsupported file type. Allowed: PDF, images, presentations.",
    } as L,
    fileSize: { ar: "حجم الملف يتجاوز 4 ميغابايت.", en: "The file is larger than 4 MB." } as L,
    summary: { ar: "يرجى مراجعة الحقول المطلوبة.", en: "Please check the highlighted fields." } as L,
    rate_limited: {
      ar: "أرسلت عدة طلبات خلال وقت قصير. يرجى المحاولة بعد قليل.",
      en: "You’ve sent several requests in a short time. Please try again shortly.",
    } as L,
    server: {
      ar: "تعذّر إرسال طلبك الآن. يرجى المحاولة لاحقاً أو مراسلتنا مباشرة عبر البريد.",
      en: "We couldn’t send your request right now. Please try again later or email us directly.",
    } as L,
    validation: { ar: "بعض البيانات غير صحيحة. يرجى المراجعة.", en: "Some details are invalid. Please review them." } as L,
  },
};
