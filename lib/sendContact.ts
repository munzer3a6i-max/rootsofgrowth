import { contactForm } from "@/content/contact";
import { services } from "@/content/services";
import { contact } from "@/content/site";
import type { ContactPayload, ContactResponse } from "@/lib/contact";

/**
 * Sends a contact-form submission from the browser.
 *
 * Default: FormSubmit (https://formsubmit.co) — no server or SMTP setup. The
 * first submission makes FormSubmit email an "Activate Form" link to the inbox;
 * nothing is delivered until it is clicked. After activating, FormSubmit shows a
 * random alias for the address: put it in NEXT_PUBLIC_FORMSUBMIT_ID to keep the
 * address out of the page source.
 *
 * Set NEXT_PUBLIC_CONTACT_MODE=smtp to use the built-in /api/contact route
 * (SMTP_* variables, see README) instead.
 */
export async function sendContact(payload: ContactPayload, file?: File | null): Promise<ContactResponse> {
  // Honeypot filled → a bot: pretend it worked, send nothing.
  if (payload.website) return { ok: true };
  if (process.env.NEXT_PUBLIC_CONTACT_MODE === "smtp") return viaApi(payload, file);
  return viaFormSubmit(payload, file);
}

/* ───────── FormSubmit ───────── */

const both = (l: { ar: string; en: string }) => (l.ar === l.en ? l.ar : `${l.ar} / ${l.en}`);
const serviceTitle = (value: string) => {
  if (value === contactForm.otherService.value) return both(contactForm.otherService.label);
  const s = services.find((x) => x.slug === value);
  return s ? both(s.title) : value;
};
const optionLabel = (list: { value: string; label: { ar: string; en: string } }[], value: string) => {
  const o = list.find((x) => x.value === value);
  return o ? both(o.label) : value;
};

async function viaFormSubmit(p: ContactPayload, file?: File | null): Promise<ContactResponse> {
  const f = contactForm.fields;
  // Field order = row order in the email (FormSubmit "table" template).
  const rows: [string, string | undefined][] = [
    [both(f.name.label), p.name],
    [both(f.email.label), p.email],
    [both(f.phone.label), p.phone],
    [both(f.company.label), p.company],
    [both(f.service.label), p.service && serviceTitle(p.service)],
    [both(f.city.label), p.city && optionLabel(contactForm.cities, p.city)],
    [both(f.attendees.label), p.attendees && optionLabel(contactForm.attendees, p.attendees)],
    [both(f.date.label), p.date],
    [both(f.budget.label), p.budget && optionLabel(contactForm.budgets, p.budget)],
    [both(f.message.label), p.message],
    ["لغة الموقع / Site language", p.locale === "en" ? "English" : "العربية"],
  ];

  const fields: Record<string, string> = {};
  for (const [label, value] of rows) if (value) fields[label] = value;
  Object.assign(fields, {
    _subject: `طلب جديد من الموقع — ${p.name}${p.company ? ` (${p.company})` : ""}`.slice(0, 200),
    _replyto: p.email,
    _template: "table",
    _captcha: "false",
    _honey: p.website ?? "",
  });

  const target = process.env.NEXT_PUBLIC_FORMSUBMIT_ID?.trim() || contact.email;
  const url = `https://formsubmit.co/ajax/${encodeURIComponent(target)}`;

  let body: BodyInit;
  const headers: Record<string, string> = { Accept: "application/json" };
  if (file) {
    // Attachments need multipart; the browser sets the boundary header itself.
    const fd = new FormData();
    for (const [k, v] of Object.entries(fields)) fd.append(k, v);
    fd.append("attachment", file, file.name);
    body = fd;
  } else {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(fields);
  }

  try {
    const res = await fetch(url, { method: "POST", headers, body });
    const data = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
    if (res.ok && (data?.success === true || data?.success === "true")) return { ok: true };
    console.error("[contact] FormSubmit did not accept the submission:", res.status, data?.message ?? "");
    // e.g. "This form needs Activation…" on the very first submission.
    return { ok: false, error: "server", reason: data?.message ? `formsubmit: ${data.message}` : `formsubmit_${res.status}` };
  } catch (err) {
    console.error("[contact] Could not reach FormSubmit:", err);
    return { ok: false, error: "server", reason: "formsubmit_unreachable" };
  }
}

/* ───────── Built-in API (SMTP) ───────── */

async function viaApi(payload: ContactPayload, file?: File | null): Promise<ContactResponse> {
  try {
    const body: ContactPayload = {
      ...payload,
      attachment: file ? { name: file.name, type: file.type, data: await readAsBase64(file) } : null,
    };
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => null)) as ContactResponse | null;
    if (res.ok && data?.ok) return { ok: true };
    return data && !data.ok ? data : { ok: false, error: "server" };
  } catch {
    return { ok: false, error: "server" };
  }
}

function readAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).replace(/^data:[^,]*,/, ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
