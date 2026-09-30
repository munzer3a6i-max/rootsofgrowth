"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { NavKey } from "@/content/site";
import { Logo, Mark } from "./Brand";
import { buttonClasses } from "./Button";
import { Icon } from "./Icon";

type Item = { key: NavKey; href: string; label: string };

/** Site/Mobile/Menu (open) — full-screen overlay menu for small screens. */
export function MobileMenu({
  locale,
  active,
  items,
  labels,
  contact,
}: {
  locale: Locale;
  active?: NavKey;
  items: Item[];
  labels: { open: string; close: string; cta: string; ctaHref: string; home: string; name: string };
  contact: { phone: string; phoneHref: string; email: string };
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Close when navigating.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={labels.open}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="rounded-full border border-on-dark-muted p-[11px] text-white transition-colors hover:bg-white/10"
      >
        <Icon name="menu" size={20} />
      </button>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={labels.name}
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink px-5 pt-4 pb-8 text-white"
        >
          <Mark size={300} className="absolute -bottom-10 -end-20 opacity-5" />
          <div className="relative flex items-center justify-between">
            <Link href={labels.home} aria-label={labels.name} onClick={() => setOpen(false)}>
              <Logo variant="white" width={108} className="h-auto w-[108px]" />
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label={labels.close}
              className="rounded-full bg-purple p-[11px] text-white"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          <nav aria-label="Mobile" className="relative mt-10">
            <ul>
              {items.map((item, i) => {
                const isActive = item.key === active;
                return (
                  <li key={item.key} className="border-b border-white/10">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className="flex items-center justify-between py-[18px]"
                    >
                      <span className="flex items-center gap-3">
                        <span className="t-serif-italic text-[14px] leading-[1.3] text-lilac">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`text-[30px] leading-[1.35] font-bold ${
                            isActive ? "text-white" : "text-on-dark-muted"
                          }`}
                        >
                          {item.label}
                        </span>
                      </span>
                      <Icon name="arrow-left" size={18} className="text-lilac" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Link
            href={labels.ctaHref}
            onClick={() => setOpen(false)}
            className={buttonClasses("primary", "relative mt-8 w-full")}
          >
            <span>{labels.cta}</span>
            <Icon name="arrow-left" size={20} />
          </Link>

          <div className="relative mt-6 flex flex-col items-start gap-2 text-on-dark-muted">
            <a href={contact.phoneHref} className="t-label inline-flex items-center gap-2">
              <Icon name="phone" size={16} className="text-lilac" />
              <span dir="ltr">{contact.phone}</span>
            </a>
            <a href={`mailto:${contact.email}`} className="t-label inline-flex items-center gap-2">
              <Icon name="mail" size={16} className="text-lilac" />
              <span>{contact.email}</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
