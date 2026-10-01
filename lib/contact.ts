/**
 * Contact form contract shared by the browser (components/contact/ContactForm)
 * and the API route (app/api/contact/route.ts). Safe to import on the client.
 *
 * POST /api/contact  (Content-Type: application/json)
 *   body:  ContactPayload
 *   200 → { ok: true }
 *   400 → { ok: false, error: "validation", fields: { <field>: <code> } }
 *   413 → { ok: false, error: "validation" }          (body too large)
 *   429 → { ok: false, error: "rate_limited" }
 *   500 → { ok: false, error: "server" }
 */
export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  /** Service slug from content/services.ts, "other", or free text. */
  service?: string;
  /** Budget key (see content/contact.ts budgets) or free text. */
  budget?: string;
  message?: string;
  locale?: "ar" | "en";
  city?: string;
  attendees?: string;
  /** yyyy-mm-dd */
  date?: string;
  /** Honeypot — must stay empty. */
  website?: string;
  attachment?: ContactAttachment | null;
};

export type ContactAttachment = { name: string; type: string; /** base64, no data: prefix */ data: string };

export type ContactErrorCode = "validation" | "rate_limited" | "server";
export type ContactResponse =
  | { ok: true }
  | {
      ok: false;
      error: ContactErrorCode;
      fields?: Record<string, FieldError>;
      /** Why a server error happened (no secrets): "not_configured" (lists missing env names),
       *  "smtp_auth", "smtp_connection" or "smtp_rejected". Visible in the browser's Network tab. */
      reason?: string;
      missing?: string[];
    };

export type FieldError = "required" | "email" | "phone" | "tooLong" | "fileType" | "fileSize" | "name" | "service";

export const LIMITS = {
  name: 120,
  email: 200,
  phone: 40,
  company: 200,
  service: 200,
  budget: 100,
  message: 5000,
  city: 100,
  attendees: 100,
  date: 20,
  fileName: 200,
  /** Raw attachment size (bytes). */
  fileBytes: 4 * 1024 * 1024,
} as const;

export const ATTACHMENT_EXTENSIONS = ["pdf", "jpg", "jpeg", "png", "webp", "heic", "ppt", "pptx", "key"] as const;
export const ATTACHMENT_ACCEPT = ".pdf,.jpg,.jpeg,.png,.webp,.heic,.ppt,.pptx,.key,application/pdf,image/*";

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

/** Convert Arabic-Indic / Persian digits to ASCII. */
export function normalizeDigits(value: string): string {
  return value
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0));
}

export function isValidEmail(value: string): boolean {
  return value.length <= LIMITS.email && EMAIL_RE.test(value);
}

/** Accepts local (05x / 5x) or international numbers: 8–15 digits, only digits/space/+-(). */
export function isValidPhone(value: string): boolean {
  const v = normalizeDigits(value).trim();
  if (!/^\+?[\d\s\-()]+$/.test(v)) return false;
  const digits = v.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

export function fileExtension(name: string): string {
  const i = name.lastIndexOf(".");
  return i === -1 ? "" : name.slice(i + 1).toLowerCase();
}

export function isAllowedAttachment(name: string): boolean {
  return (ATTACHMENT_EXTENSIONS as readonly string[]).includes(fileExtension(name));
}
