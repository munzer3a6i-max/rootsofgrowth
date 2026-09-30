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
  const openRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Close when navigating.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) {
      // Return focus to the trigger after closing.
      if (wasOpen.current) openRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
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
        ref={openRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={labels.open}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="press rounded-full border border-on-dark-muted p-[11px] text-white hover:bg-white/10"
      >
        <Icon name="menu" size={20} />
      </button>

      {/* Always mounted so it can animate out; `inert` + hidden when closed.
          Enter: overlay fades (300ms), rows rise with a short stagger. Exit: 200ms, no stagger. */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-hidden={!open}
          inert={!open}
          data-open={open}
          aria-label={labels.name}
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="group/menu fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink px-5 pt-4 pb-8 text-white transition-[opacity,visibility] duration-200 ease-out data-[open=false]:invisible data-[open=false]:opacity-0 data-[open=true]:duration-300"
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
              className="press rounded-full bg-purple p-[11px] text-white"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          <nav aria-label="Mobile" className="relative mt-10">
            <ul>
              {items.map((item, i) => {
                const isActive = item.key === active;
                return (
                  <li
                    key={item.key}
                    style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
                    className="border-b border-white/10 transition-[opacity,translate] duration-500 ease-out group-data-[open=false]/menu:translate-y-3 group-data-[open=false]/menu:opacity-0 group-data-[open=false]/menu:duration-150 motion-reduce:translate-y-0"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className="group flex items-center justify-between py-[18px]"
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
                      <Icon name="arrow-left" size={18} className="nudge text-lilac" />
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
    </>
  );
}
