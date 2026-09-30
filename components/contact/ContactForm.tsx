"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { t, type Locale } from "@/lib/i18n";
import { services } from "@/content/services";
import { contactForm as c } from "@/content/contact";
import { contact } from "@/content/site";
import { SubmitButton } from "@/components/Button";
import { Icon } from "@/components/Icon";
import {
  ATTACHMENT_ACCEPT,
  LIMITS,
  isAllowedAttachment,
  isValidEmail,
  isValidPhone,
  type ContactPayload,
  type ContactResponse,
  type FieldError,
} from "@/lib/contact";

type Values = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  city: string;
  date: string;
  attendees: string;
  budget: string;
  message: string;
  website: string;
};

const empty: Values = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  city: "",
  date: "",
  attendees: "",
  budget: "",
  message: "",
  website: "",
};

type Status = "idle" | "sending" | "success" | "error";
type Errors = Partial<Record<keyof Values | "attachment", FieldError>>;

const serviceSlugs = new Set([...services.map((s) => s.slug), c.otherService.value]);

function validate(v: Values, file: File | null): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "required";
  else if (v.name.trim().length < 2) e.name = "name";
  if (!v.email.trim()) e.email = "required";
  else if (!isValidEmail(v.email.trim())) e.email = "email";
  if (!v.phone.trim()) e.phone = "required";
  else if (!isValidPhone(v.phone)) e.phone = "phone";
  if (!v.service) e.service = "service";
  (Object.keys(v) as (keyof Values)[]).forEach((k) => {
    if (k !== "website" && k in LIMITS && v[k].length > LIMITS[k as keyof typeof LIMITS]) e[k] = "tooLong";
  });
  if (file) {
    if (!isAllowedAttachment(file.name)) e.attachment = "fileType";
    else if (file.size > LIMITS.fileBytes) e.attachment = "fileSize";
  }
  return e;
}

function errorText(code: FieldError, locale: Locale) {
  const map: Record<FieldError, keyof typeof c.errors> = {
    required: "required",
    name: "name",
    email: "email",
    phone: "phone",
    service: "service",
    tooLong: "tooLong",
    fileType: "fileType",
    fileSize: "fileSize",
  };
  return t(c.errors[map[code]], locale);
}

function readAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).replace(/^data:[^,]*,/, ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/* ───────── Field primitives ───────── */
const inputBox =
  "w-full rounded-[12px] border bg-canvas px-[14px] t-body-s text-ink placeholder:text-muted transition-colors outline-none focus:border-purple focus:ring-2 focus:ring-purple/15 lg:rounded-[14px] lg:px-[18px]";
const borderOf = (err?: FieldError) => (err ? "border-red-500" : "border-line");

function Field({
  id,
  label,
  required,
  error,
  locale,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: FieldError;
  locale: Locale;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 lg:gap-[10px] ${className}`}>
      <label htmlFor={id} className="t-label text-ink">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="-mt-0.5 text-[13px] leading-[1.5] text-red-600" role="alert">
          {errorText(error, locale)}
        </p>
      )}
    </div>
  );
}

/**
 * Contact / request form (Figma "Form card" 35:1467, mobile 40:2202).
 * POSTs JSON to /api/contact (contract in lib/contact.ts).
 *
 * Reusable: `<ContactForm locale="ar" />`. It pre-selects the service from
 * `?service=<slug>` unless `initialService` is given. On mobile the design
 * drops city, attendance, budget and attachment (`compactMobile`, default true).
 */
export function ContactForm({
  locale,
  initialService,
  readServiceFromQuery = true,
  compactMobile = true,
  className = "",
}: {
  locale: Locale;
  initialService?: string;
  readServiceFromQuery?: boolean;
  compactMobile?: boolean;
  className?: string;
}) {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const [values, setValues] = useState<Values>({
    ...empty,
    service: initialService && serviceSlugs.has(initialService) ? initialService : "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<"validation" | "rate_limited" | "server" | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [today, setToday] = useState("");
  /** Mobile uses shorter placeholders (Figma 40:2202). */
  const [wide, setWide] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
    if (initialService || !readServiceFromQuery) return;
    const slug = new URLSearchParams(window.location.search).get("service");
    if (slug && serviceSlugs.has(slug)) setValues((v) => (v.service ? v : { ...v, service: slug }));
  }, [initialService, readServiceFromQuery]);

  const set = <K extends keyof Values>(k: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [k]: value }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const hideMobile = compactMobile ? "hidden lg:flex" : "flex";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const found = validate(values, file);
    setErrors(found);
    setServerError(null);
    const firstKey = (Object.keys(found) as (keyof Errors)[]).find((k) => found[k]);
    if (firstKey) {
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${firstKey}"]`);
      el?.focus();
      return;
    }

    setStatus("sending");
    try {
      const payload: ContactPayload = {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        company: values.company.trim(),
        service: values.service,
        budget: values.budget,
        message: values.message.trim(),
        city: values.city,
        attendees: values.attendees,
        date: values.date,
        locale,
        website: values.website,
        attachment: file ? { name: file.name, type: file.type, data: await readAsBase64(file) } : null,
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as ContactResponse | null;
      if (res.ok && data?.ok) {
        setStatus("success");
        setValues({ ...empty });
        setFile(null);
        requestAnimationFrame(() => statusRef.current?.focus());
        return;
      }
      const err = data && !data.ok ? data.error : "server";
      if (data && !data.ok && data.fields) setErrors(data.fields as Errors);
      setServerError(err);
      setStatus("error");
    } catch {
      setServerError("server");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`flex flex-col items-start gap-4 rounded-[24px] bg-white p-[22px] lg:gap-[22px] lg:rounded-[32px] lg:p-12 ${className}`}
      >
        <div
          ref={statusRef}
          tabIndex={-1}
          role="status"
          className="flex flex-col items-start gap-4 outline-none lg:gap-[18px]"
        >
          <span className="flex size-[50px] items-center justify-center rounded-full bg-purple text-white">
            <Icon name="check" size={24} />
          </span>
          <h2 className="t-h3 text-ink lg:text-[46px] lg:leading-[1.5] lg:font-bold">{t(c.success.title, locale)}</h2>
          <p className="t-body-m max-w-[560px] text-muted">{t(c.success.text, locale)}</p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="t-label text-purple underline-offset-4 hover:underline"
        >
          {t(c.success.again, locale)}
        </button>
      </div>
    );
  }

  const selectCls = (value: string, err?: FieldError) =>
    `${inputBox} ${borderOf(err)} h-[52px] cursor-pointer appearance-none pe-10 lg:h-14 lg:pe-12 ${value ? "text-ink" : "text-muted"}`;
  const described = (k: keyof Errors) => (errors[k] ? `${id(k)}-error` : undefined);

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-busy={status === "sending"}
      className={`relative flex flex-col gap-4 rounded-[24px] bg-white p-[22px] lg:gap-[22px] lg:rounded-[32px] lg:p-12 ${className}`}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-[22px] leading-[1.45] font-medium text-ink lg:text-[46px] lg:leading-[1.5] lg:font-bold">
          {t(c.title, locale)}
        </h2>
        <p className="t-body-s hidden text-muted lg:block">{t(c.requiredNote, locale)}</p>
      </div>

      {/* Honeypot — hidden from people, tempting for bots. */}
      <div aria-hidden="true" className="absolute -start-[10000px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input
          id={id("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-[22px]">
        <Field id={id("name")} label={t(c.fields.name.label, locale)} required error={errors.name} locale={locale}>
          <input
            id={id("name")}
            data-field="name"
            name="name"
            autoComplete="name"
            maxLength={LIMITS.name}
            placeholder={t(c.fields.name.placeholder, locale)}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={described("name")}
            aria-required
            className={`${inputBox} ${borderOf(errors.name)} h-[52px] lg:h-14`}
          />
        </Field>

        <Field id={id("company")} label={t(c.fields.company.label, locale)} error={errors.company} locale={locale}>
          <input
            id={id("company")}
            data-field="company"
            name="company"
            autoComplete="organization"
            maxLength={LIMITS.company}
            placeholder={t(wide ? c.fields.company.placeholder : c.fields.company.placeholderMobile, locale)}
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
            aria-invalid={!!errors.company}
            aria-describedby={described("company")}
            className={`${inputBox} ${borderOf(errors.company)} h-[52px] lg:h-14`}
          />
        </Field>

        <Field id={id("phone")} label={t(c.fields.phone.label, locale)} required error={errors.phone} locale={locale}>
          <div
            dir="ltr"
            className={`relative flex h-[52px] items-center rounded-[12px] border bg-canvas transition-colors focus-within:border-purple focus-within:ring-2 focus-within:ring-purple/15 lg:h-14 lg:rounded-[14px] ${borderOf(errors.phone)}`}
          >
            {/* The dialling code sits on the left in both languages (numbers read LTR). */}
            <span className="t-label flex shrink-0 items-center gap-2 ps-[14px] text-ink lg:ps-[18px]">
              +966
              <span className="hidden h-5 w-px bg-line lg:block" aria-hidden="true" />
            </span>
            <input
              id={id("phone")}
              data-field="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              maxLength={LIMITS.phone}
              placeholder={t(c.fields.phone.placeholder, locale)}
              value={values.phone}
              onChange={(e) => set("phone", e.target.value)}
              aria-invalid={!!errors.phone}
              aria-describedby={described("phone")}
              aria-required
              className="t-body-s h-full min-w-0 flex-1 bg-transparent px-[14px] text-ink outline-none placeholder:text-muted rtl:text-end lg:px-[18px]"
            />
          </div>
        </Field>

        <Field id={id("email")} label={t(c.fields.email.label, locale)} required error={errors.email} locale={locale}>
          <input
            id={id("email")}
            data-field="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            placeholder={t(c.fields.email.placeholder, locale)}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={described("email")}
            aria-required
            className={`${inputBox} ${borderOf(errors.email)} h-[52px] lg:h-14`}
          />
        </Field>

        <Field id={id("service")} label={t(c.fields.service.label, locale)} required error={errors.service} locale={locale}>
          <div className="relative">
            <select
              id={id("service")}
              data-field="service"
              name="service"
              value={values.service}
              onChange={(e) => set("service", e.target.value)}
              aria-invalid={!!errors.service}
              aria-describedby={described("service")}
              aria-required
              className={selectCls(values.service, errors.service)}
            >
              <option value="">{t(c.fields.service.placeholder, locale)}</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {t(s.title, locale)}
                </option>
              ))}
              <option value={c.otherService.value}>{t(c.otherService.label, locale)}</option>
            </select>
            <Icon
              name="chevron-down"
              size={18}
              className="pointer-events-none absolute end-[14px] top-1/2 size-4 -translate-y-1/2 text-ink lg:end-[19px] lg:size-[18px]"
            />
          </div>
        </Field>

        <Field id={id("city")} label={t(c.fields.city.label, locale)} locale={locale} className={hideMobile}>
          <div className="relative">
            <select
              id={id("city")}
              data-field="city"
              name="city"
              value={values.city}
              onChange={(e) => set("city", e.target.value)}
              className={selectCls(values.city)}
            >
              <option value="">{t(c.fields.city.placeholder, locale)}</option>
              {c.cities.map((o) => (
                <option key={o.value} value={o.value}>
                  {t(o.label, locale)}
                </option>
              ))}
            </select>
            <Icon
              name="chevron-down"
              size={18}
              className="pointer-events-none absolute end-[14px] top-1/2 -translate-y-1/2 text-ink lg:end-[19px]"
            />
          </div>
        </Field>

        <Field id={id("date")} label={t(c.fields.date.label, locale)} error={errors.date} locale={locale}>
          <div className="relative">
            <input
              ref={dateRef}
              id={id("date")}
              data-field="date"
              name="date"
              type="date"
              min={today || undefined}
              value={values.date}
              onChange={(e) => set("date", e.target.value)}
              onClick={() => {
                try {
                  dateRef.current?.showPicker?.();
                } catch {
                  /* not supported — native behaviour */
                }
              }}
              className={`peer ${inputBox} ${borderOf(errors.date)} h-[52px] cursor-pointer pe-10 text-start lg:h-14 lg:pe-12 [&::-webkit-calendar-picker-indicator]:hidden ${
                values.date ? "text-ink" : "text-transparent focus:text-ink"
              }`}
            />
            {!values.date && (
              <span className="t-body-s pointer-events-none absolute start-[14px] top-1/2 -translate-y-1/2 text-muted peer-focus:hidden lg:start-[18px]">
                {t(c.fields.date.placeholder, locale)}
              </span>
            )}
            <Icon
              name="calendar"
              size={18}
              className="pointer-events-none absolute end-[14px] top-1/2 size-4 -translate-y-1/2 text-ink lg:end-[19px] lg:size-[18px]"
            />
          </div>
        </Field>

        <Field id={id("attendees")} label={t(c.fields.attendees.label, locale)} locale={locale} className={hideMobile}>
          <div className="relative">
            <select
              id={id("attendees")}
              data-field="attendees"
              name="attendees"
              value={values.attendees}
              onChange={(e) => set("attendees", e.target.value)}
              className={selectCls(values.attendees)}
            >
              <option value="">{t(c.fields.attendees.placeholder, locale)}</option>
              {c.attendees.map((o) => (
                <option key={o.value} value={o.value}>
                  {t(o.label, locale)}
                </option>
              ))}
            </select>
            <Icon
              name="chevron-down"
              size={18}
              className="pointer-events-none absolute end-[14px] top-1/2 -translate-y-1/2 text-ink lg:end-[19px]"
            />
          </div>
        </Field>
      </div>

      <fieldset className={`${hideMobile} flex-col gap-2 lg:gap-[10px]`}>
        <legend className="t-label mb-2 text-ink lg:mb-[10px]">{t(c.fields.budget.label, locale)}</legend>
        <div className="flex flex-wrap gap-[10px]">
          {c.budgets.map((b) => {
            const checked = values.budget === b.value;
            return (
              <label
                key={b.value}
                className={`t-label cursor-pointer rounded-full border px-4 py-[10px] transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-purple/40 ${
                  checked ? "border-purple bg-purple text-white" : "border-line bg-canvas text-ink hover:border-purple/40"
                }`}
              >
                <input
                  type="radio"
                  name="budget"
                  value={b.value}
                  checked={checked}
                  onChange={() => set("budget", b.value)}
                  onClick={() => checked && set("budget", "")}
                  className="sr-only"
                />
                {t(b.label, locale)}
              </label>
            );
          })}
        </div>
      </fieldset>

      <Field id={id("message")} label={t(c.fields.message.label, locale)} error={errors.message} locale={locale}>
        <textarea
          id={id("message")}
          data-field="message"
          name="message"
          maxLength={LIMITS.message}
          placeholder={t(wide ? c.fields.message.placeholder : c.fields.message.placeholderMobile, locale)}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={described("message")}
          className={`${inputBox} ${borderOf(errors.message)} h-[120px] resize-y py-[14px] lg:h-[150px] lg:pt-4`}
        />
      </Field>

      <div className={`${hideMobile} flex-col gap-2`}>
        <label
          htmlFor={id("attachment")}
          className={`t-body-s flex cursor-pointer items-center justify-center gap-3 rounded-[14px] border border-dashed px-5 py-[18px] text-center text-muted transition-colors hover:border-purple/50 hover:text-ink has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-purple/40 ${
            errors.attachment ? "border-red-500" : "border-line"
          }`}
        >
          <Icon name="arrow-up-left" size={18} className="text-purple" />
          <span>{file ? file.name : t(c.fields.attachment.label, locale)}</span>
          <input
            ref={fileRef}
            id={id("attachment")}
            data-field="attachment"
            type="file"
            accept={ATTACHMENT_ACCEPT}
            className="sr-only"
            onChange={(e) => {
              setFile(e.target.files?.[0] ?? null);
              setErrors((er) => ({ ...er, attachment: undefined }));
            }}
          />
        </label>
        {file && (
          <button
            type="button"
            onClick={() => {
              setFile(null);
              if (fileRef.current) fileRef.current.value = "";
              setErrors((er) => ({ ...er, attachment: undefined }));
            }}
            className="t-body-s self-start text-purple underline-offset-4 hover:underline"
          >
            {t(c.fields.attachment.remove, locale)}
          </button>
        )}
        {errors.attachment && (
          <p className="text-[13px] leading-[1.5] text-red-600" role="alert">
            {errorText(errors.attachment, locale)}
          </p>
        )}
      </div>

      {serverError && (
        <div role="alert" className="t-body-s rounded-[14px] border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {t(c.errors[serverError], locale)}
          {serverError === "server" && (
            <>
              {" "}
              <a href={`mailto:${contact.email}`} dir="ltr" className="font-medium underline">
                {contact.email}
              </a>
            </>
          )}
        </div>
      )}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SubmitButton type="submit" disabled={status === "sending"} className="w-full lg:w-auto">
          {status === "sending" ? t(c.sending, locale) : t(c.submit, locale)}
        </SubmitButton>
        <p className="t-body-s hidden text-muted lg:block">{t(c.privacy, locale)}</p>
      </div>
    </form>
  );
}
