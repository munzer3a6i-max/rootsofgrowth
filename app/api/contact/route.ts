import { NextResponse } from "next/server";
import { services } from "@/content/services";
import { contactForm } from "@/content/contact";
import { escapeHtml, readMailConfig, sendMail } from "@/lib/mail";
import {
  LIMITS,
  isAllowedAttachment,
  isValidEmail,
  isValidPhone,
  normalizeDigits,
  type ContactResponse,
  type FieldError,
} from "@/lib/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ───────── Rate limit: 5 submissions / 10 minutes / IP (in memory) ───────── */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Keep the map from growing forever.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return false;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

/* ───────── Helpers ───────── */
function reply(body: ContactResponse, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

/** Trim, drop control characters (keeps newlines where allowed), collapse to a string. */
function clean(value: unknown, multiline = false): string {
  if (typeof value !== "string") return "";
  const stripped = multiline
    ? value.replace(/\r\n?/g, "\n").replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "")
    : value.replace(/[\u0000-\u001F\u007F]/g, " ");
  return stripped.trim();
}

const serviceTitle = (value: string, locale: "ar" | "en") => {
  if (value === contactForm.otherService.value) return contactForm.otherService.label[locale];
  return services.find((s) => s.slug === value)?.title[locale] ?? value;
};
const optionLabel = (list: { value: string; label: { ar: string; en: string } }[], value: string, locale: "ar" | "en") =>
  list.find((o) => o.value === value)?.label[locale] ?? value;

const MAX_BODY_BYTES = Math.ceil(LIMITS.fileBytes * 1.4) + 64 * 1024;

export async function POST(req: Request) {
  try {
    const length = Number(req.headers.get("content-length") || 0);
    if (length > MAX_BODY_BYTES) return reply({ ok: false, error: "validation" }, 413);

    let raw: Record<string, unknown>;
    try {
      const text = await req.text();
      if (text.length > MAX_BODY_BYTES) return reply({ ok: false, error: "validation" }, 413);
      const parsed: unknown = JSON.parse(text);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
      raw = parsed as Record<string, unknown>;
    } catch {
      return reply({ ok: false, error: "validation" }, 400);
    }

    // Honeypot: bots fill every field. Reject quietly with a validation error.
    if (clean(raw.website)) return reply({ ok: false, error: "validation" }, 400);

    if (rateLimited(clientIp(req))) return reply({ ok: false, error: "rate_limited" }, 429);

    const locale: "ar" | "en" = raw.locale === "en" ? "en" : "ar";
    const data = {
      name: clean(raw.name),
      email: clean(raw.email).toLowerCase(),
      phone: normalizeDigits(clean(raw.phone)),
      company: clean(raw.company),
      service: clean(raw.service),
      budget: clean(raw.budget),
      message: clean(raw.message, true),
      city: clean(raw.city),
      attendees: clean(raw.attendees),
      date: clean(raw.date),
    };

    const fields: Record<string, FieldError> = {};
    for (const key of Object.keys(data) as (keyof typeof data)[]) {
      if (data[key].length > LIMITS[key]) fields[key] = "tooLong";
    }
    if (!data.name) fields.name = "required";
    else if (data.name.length < 2) fields.name = "name";
    if (!data.email) fields.email = "required";
    else if (!isValidEmail(data.email)) fields.email = "email";
    if (data.phone && !isValidPhone(data.phone)) fields.phone = "phone";
    if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) fields.date = "required";

    // Optional attachment: { name, type, data(base64) }
    let attachment: { filename: string; content: Buffer; contentType?: string } | undefined;
    if (raw.attachment && typeof raw.attachment === "object") {
      const a = raw.attachment as Record<string, unknown>;
      const filename = clean(a.name).replace(/[\\/]/g, "_").slice(0, LIMITS.fileName);
      const b64 = typeof a.data === "string" ? a.data : "";
      if (!filename || !b64 || !isAllowedAttachment(filename) || !/^[A-Za-z0-9+/=\s]+$/.test(b64)) {
        fields.attachment = "fileType";
      } else {
        const content = Buffer.from(b64, "base64");
        if (content.byteLength > LIMITS.fileBytes) fields.attachment = "fileSize";
        else attachment = { filename, content, contentType: clean(a.type).slice(0, 100) || undefined };
      }
    }

    if (Object.keys(fields).length) return reply({ ok: false, error: "validation", fields }, 400);

    const loaded = readMailConfig();
    if ("missing" in loaded) {
      console.error(
        `[api/contact] Email is not configured — missing env: ${loaded.missing.join(", ")}. ` +
          "Set the SMTP_* and CONTACT_TO variables (see .env.example). The submission was NOT delivered.",
      );
      return reply({ ok: false, error: "server" }, 500);
    }

    const f = contactForm.fields;
    const rows: { label: string; value: string }[] = [
      { label: `${f.name.label.ar} / ${f.name.label.en}`, value: data.name },
      { label: `${f.email.label.ar} / ${f.email.label.en}`, value: data.email },
      { label: `${f.phone.label.ar} / ${f.phone.label.en}`, value: data.phone },
      { label: `${f.company.label.ar} / ${f.company.label.en}`, value: data.company },
      { label: `${f.service.label.ar} / ${f.service.label.en}`, value: data.service && serviceTitle(data.service, "ar") + (serviceTitle(data.service, "en") !== serviceTitle(data.service, "ar") ? ` — ${serviceTitle(data.service, "en")}` : "") },
      { label: `${f.city.label.ar} / ${f.city.label.en}`, value: data.city && optionLabel(contactForm.cities, data.city, "ar") },
      { label: `${f.attendees.label.ar} / ${f.attendees.label.en}`, value: data.attendees && optionLabel(contactForm.attendees, data.attendees, "ar") },
      { label: `${f.date.label.ar} / ${f.date.label.en}`, value: data.date },
      { label: `${f.budget.label.ar} / ${f.budget.label.en}`, value: data.budget && optionLabel(contactForm.budgets, data.budget, "ar") },
      { label: "لغة الموقع / Site language", value: locale === "ar" ? "العربية" : "English" },
    ].filter((r) => r.value);

    const subject = `طلب جديد من الموقع — ${data.name}${data.company ? ` (${data.company})` : ""}`.slice(0, 200);

    const text = [
      "طلب جديد من نموذج التواصل في موقع جذور النمو",
      "New request from the Roots of Growth website contact form",
      "",
      ...rows.map((r) => `${r.label}: ${r.value}`),
      "",
      `${f.message.label.ar} / ${f.message.label.en}:`,
      data.message || "—",
      attachment ? `\nمرفق / Attachment: ${attachment.filename}` : "",
    ].join("\n");

    const td = "padding:10px 14px;border-bottom:1px solid #E2E0EA;vertical-align:top;font-size:14px;line-height:1.6";
    const html = `<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:24px;background:#F3F2F6;font-family:Tahoma,Arial,sans-serif;color:#1E1B2E">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden">
    <tr><td style="background:#1E1B2E;padding:22px 24px;color:#ffffff">
      <div style="font-size:18px;font-weight:bold">طلب جديد من الموقع</div>
      <div style="font-size:13px;color:#CFC7F7;margin-top:4px" dir="ltr">New website request — Roots of Growth</div>
    </td></tr>
    <tr><td style="padding:8px 10px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
        ${rows
          .map(
            (r) =>
              `<tr><td style="${td};color:#6B6780;width:38%;white-space:nowrap">${escapeHtml(r.label)}</td><td style="${td};font-weight:bold" dir="auto">${
                r.label.startsWith(f.email.label.ar)
                  ? `<a href="mailto:${escapeHtml(r.value)}" style="color:#5E4DC1">${escapeHtml(r.value)}</a>`
                  : escapeHtml(r.value)
              }</td></tr>`,
          )
          .join("\n        ")}
      </table>
    </td></tr>
    <tr><td style="padding:14px 24px 24px">
      <div style="font-size:13px;color:#6B6780;margin-bottom:8px">${escapeHtml(`${f.message.label.ar} / ${f.message.label.en}`)}</div>
      <div dir="auto" style="background:#F3F2F6;border:1px solid #E2E0EA;border-radius:12px;padding:14px 16px;font-size:14px;line-height:1.8;white-space:pre-wrap">${
        data.message ? escapeHtml(data.message) : "—"
      }</div>
      ${attachment ? `<div style="font-size:13px;color:#6B6780;margin-top:12px">مرفق / Attachment: ${escapeHtml(attachment.filename)}</div>` : ""}
      <div style="font-size:12px;color:#A9A5BD;margin-top:18px">للرد، استخدم «رد» في بريدك — سيصل الرد إلى المرسل مباشرة. · Hit “Reply” to answer the sender directly.</div>
    </td></tr>
  </table>
</body></html>`;

    try {
      await sendMail(loaded.config, {
        subject,
        text,
        html,
        replyTo: `"${data.name.replace(/["\\]/g, "")}" <${data.email}>`,
        attachments: attachment ? [attachment] : undefined,
      });
    } catch (err) {
      console.error("[api/contact] Failed to send email via SMTP:", err instanceof Error ? err.message : err);
      return reply({ ok: false, error: "server" }, 500);
    }

    return reply({ ok: true }, 200);
  } catch (err) {
    console.error("[api/contact] Unexpected error:", err);
    return reply({ ok: false, error: "server" }, 500);
  }
}

export function GET() {
  return NextResponse.json({ ok: false, error: "validation" }, { status: 405, headers: { Allow: "POST" } });
}
