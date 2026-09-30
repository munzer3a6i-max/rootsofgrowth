"use client";

import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { isValidEmail, isValidPhone, normalizeDigits, type ContactPayload, type ContactResponse } from "@/lib/contact";
import { SubmitButton } from "@/components/Button";
import { Icon } from "@/components/Icon";

type Labels = {
  title: string;
  subtitle: string;
  name: string;
  namePh: string;
  company: string;
  companyPh: string;
  phone: string;
  phonePh: string;
  email: string;
  emailPh: string;
  service: string;
  servicePh: string;
  date: string;
  datePh: string;
  message: string;
  messagePh: string;
  messagePhMobile: string;
  privacy: string;
  submit: string;
  sending: string;
  successTitle: string;
  successText: string;
  again: string;
  errors: Record<string, string>;
};

type Field = "name" | "email" | "phone" | "company" | "service" | "date" | "message";
type Status = { kind: "idle" } | { kind: "sending" } | { kind: "success" } | { kind: "error"; code: string };

const inputBase =
  "w-full rounded-[12px] border bg-canvas px-[14px] text-[13px] leading-[1.7] text-ink placeholder:text-muted transition-colors focus:border-purple focus:bg-white focus:outline-none lg:rounded-[14px] lg:px-[18px] lg:text-[14px]";

/**
 * Home contact form card (Figma "Form card" 16:820 / 19:432).
 * Posts JSON to /api/contact. Company and date are desktop-only fields in the
 * design; email is kept on mobile too because the API requires it.
 */
export function HomeContactForm({
  locale,
  labels: L,
  services,
}: {
  locale: Locale;
  labels: Labels;
  services: { value: string; label: string }[];
}) {
  const id = useId();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [dateType, setDateType] = useState<"text" | "date">("text");
  const [service, setService] = useState("");
  // The design uses a shorter message placeholder on mobile.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const errorText = (code?: string) => (code ? (L.errors[code] ?? L.errors.validation) : undefined);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "").trim();

    const rawPhone = normalizeDigits(get("phone"));
    const phone = rawPhone && !rawPhone.startsWith("+") && !rawPhone.startsWith("0") ? `+966 ${rawPhone}` : rawPhone;

    const payload: ContactPayload = {
      name: get("name"),
      email: get("email").toLowerCase(),
      phone,
      company: get("company"),
      service: get("service"),
      date: get("date"),
      message: get("message"),
      locale,
      website: get("website"),
    };

    // Client-side validation mirrors the API.
    const next: Partial<Record<Field, string>> = {};
    if (!payload.name) next.name = "required";
    else if (payload.name.length < 2) next.name = "name";
    if (!payload.email) next.email = "required";
    else if (!isValidEmail(payload.email)) next.email = "email";
    if (phone && !isValidPhone(phone)) next.phone = "phone";
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus({ kind: "error", code: "validation" });
      const first = Object.keys(next)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as ContactResponse | null;
      if (data?.ok) {
        form.reset();
        setDateType("text");
        setService("");
        setErrors({});
        setStatus({ kind: "success" });
        return;
      }
      const code = data && !data.ok ? data.error : "server";
      if (data && !data.ok && data.fields) setErrors(data.fields as Partial<Record<Field, string>>);
      setStatus({ kind: "error", code });
    } catch {
      setStatus({ kind: "error", code: "network" });
    }
  }

  const cardCls =
    "w-full rounded-[24px] bg-white p-[22px] lg:max-w-[700px] lg:flex-1 lg:rounded-[32px] lg:p-11 lg:shadow-[0_30px_60px_rgba(31,26,77,0.08)]";

  if (status.kind === "success") {
    return (
      <div className={`${cardCls} flex flex-col items-start gap-4`} role="status" aria-live="polite">
        <span className="flex rounded-full bg-lilac-soft p-3 text-purple">
          <Icon name="check" size={26} />
        </span>
        <h3 className="text-[22px] leading-[1.45] font-medium lg:text-[26px]">{L.successTitle}</h3>
        <p className="t-body-s text-muted">{L.successText}</p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="press t-label mt-2 text-purple underline-offset-4 hover:underline"
        >
          {L.again}
        </button>
      </div>
    );
  }

  const fid = (k: string) => `${id}-${k}`;
  const invalid = (k: Field) => (errors[k] ? "border-[#C8364B]" : "border-line");
  const err = (k: Field) =>
    errors[k] ? (
      <p id={`${fid(k)}-err`} className="text-[12px] leading-[1.5] text-[#C8364B]">
        {errorText(errors[k])}
      </p>
    ) : null;
  const aria = (k: Field) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${fid(k)}-err` : undefined,
  });

  return (
    <form noValidate onSubmit={onSubmit} className={`${cardCls} relative flex flex-col items-start gap-[14px] lg:gap-[22px]`}>
      <div className="flex flex-col items-start gap-[6px]">
        <h3 className="text-[22px] leading-[1.45] font-medium lg:text-[26px]">{L.title}</h3>
        <p className="t-body-s hidden text-muted lg:block">{L.subtitle}</p>
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="pointer-events-none absolute top-0 start-0 size-px overflow-hidden opacity-0 [clip-path:inset(50%)]">
        <label htmlFor={fid("website")}>Website</label>
        <input id={fid("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid w-full grid-cols-1 gap-[14px] lg:grid-cols-2 lg:gap-x-5 lg:gap-y-[22px]">
        <FieldBox id={fid("name")} label={L.name} error={err("name")}>
          <input
            id={fid("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder={L.namePh}
            className={`${inputBase} h-[50px] lg:h-[54px] ${invalid("name")}`}
            {...aria("name")}
          />
        </FieldBox>
        <FieldBox id={fid("company")} label={L.company} className="hidden lg:flex">
          <input
            id={fid("company")}
            name="company"
            type="text"
            autoComplete="organization"
            placeholder={L.companyPh}
            className={`${inputBase} h-[54px] border-line`}
          />
        </FieldBox>

        <FieldBox id={fid("phone")} label={L.phone} error={err("phone")}>
          <div
            className={`flex h-[50px] w-full items-center gap-2 rounded-[12px] border bg-canvas px-[14px] transition-colors focus-within:border-purple focus-within:bg-white lg:h-[54px] lg:rounded-[14px] lg:px-[18px] ${invalid("phone")}`}
          >
            <input
              id={fid("phone")}
              name="phone"
              type="tel"
              dir="ltr"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder={L.phonePh}
              className={`min-w-0 flex-1 bg-transparent ${locale === "ar" ? "text-end" : "text-start"} text-[13px] leading-[1.7] text-ink placeholder:text-muted focus:outline-none lg:text-[14px]`}
              {...aria("phone")}
            />
            <span aria-hidden="true" className={`hidden h-5 w-px bg-line lg:block ${locale === "en" ? "-order-1" : ""}`} />
            <span dir="ltr" className={`text-[13px] leading-[1.4] font-medium text-ink lg:text-[14px] ${locale === "en" ? "order-first" : ""}`}>
              +966
            </span>
          </div>
        </FieldBox>
        <FieldBox id={fid("email")} label={L.email} error={err("email")}>
          <input
            id={fid("email")}
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            required
            placeholder={L.emailPh}
            className={`${inputBase} h-[50px] lg:h-[54px] ${invalid("email")} ${locale === "ar" ? "text-end" : "text-start"}`}
            {...aria("email")}
          />
        </FieldBox>

        <FieldBox id={fid("service")} label={L.service}>
          <div className="relative">
            <select
              id={fid("service")}
              name="service"
              value={service}
              onChange={(e) => setService(e.currentTarget.value)}
              className={`${inputBase} h-[50px] cursor-pointer appearance-none border-line pe-10 lg:h-[54px] lg:pe-12 [&>option]:text-ink ${
                service ? "" : "text-muted"
              }`}
            >
              <option value="" disabled>
                {L.servicePh}
              </option>
              {services.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <Icon
              name="chevron-down"
              size={18}
              className="pointer-events-none absolute end-[14px] top-1/2 size-4 -translate-y-1/2 text-ink lg:end-[18px] lg:size-[18px]"
            />
          </div>
        </FieldBox>
        <FieldBox id={fid("date")} label={L.date} className="hidden lg:flex">
          <div className="relative">
            <input
              id={fid("date")}
              name="date"
              type={dateType}
              placeholder={L.datePh}
              onFocus={() => setDateType("date")}
              onBlur={(e) => !e.currentTarget.value && setDateType("text")}
              className={`${inputBase} h-[54px] border-line pe-12 [&::-webkit-calendar-picker-indicator]:opacity-0`}
            />
            <Icon
              name="calendar"
              size={18}
              className="pointer-events-none absolute end-[18px] top-1/2 -translate-y-1/2 text-ink"
            />
          </div>
        </FieldBox>

        <FieldBox id={fid("message")} label={L.message} className="lg:col-span-2">
          <textarea
            id={fid("message")}
            name="message"
            rows={4}
            placeholder={wide ? L.messagePh : L.messagePhMobile}
            className={`${inputBase} h-[110px] resize-none border-line py-[14px] lg:h-[130px] lg:py-4`}
          />
        </FieldBox>
      </div>

      {status.kind === "error" && (
        <p role="alert" className="w-full rounded-[12px] bg-[#C8364B]/8 px-4 py-3 text-[13px] leading-[1.6] text-[#A12A3C]">
          {errorText(status.code)}
        </p>
      )}

      <div className="flex w-full flex-col items-stretch gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SubmitButton type="submit" disabled={status.kind === "sending"} aria-busy={status.kind === "sending"} className="w-full lg:w-auto">
          {status.kind === "sending" ? L.sending : L.submit}
        </SubmitButton>
        <p className="hidden text-[13px] leading-[1.7] text-muted lg:block">{L.privacy}</p>
      </div>
    </form>
  );
}

function FieldBox({
  id,
  label,
  error,
  className = "flex",
  children,
}: {
  id: string;
  label: string;
  error?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`${className} flex-col items-stretch gap-2 lg:gap-[10px]`}>
      <label htmlFor={id} className="text-[13px] leading-[1.4] font-medium text-ink lg:text-[14px]">
        {label}
      </label>
      {children}
      {error}
    </div>
  );
}
