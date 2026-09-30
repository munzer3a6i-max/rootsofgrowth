"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
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
  // Circle origin (the trigger's centre) and the radius that covers the viewport.
  const [origin, setOrigin] = useState<CSSProperties>({});

  const openMenu = () => {
    const r = openRef.current?.getBoundingClientRect();
    if (r) {
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const radius = Math.ceil(Math.hypot(Math.max(x, w - x), Math.max(y, h - y))) + 8;
      setOrigin({ "--mx": `${x}px`, "--my": `${y}px`, "--mr": `${radius}px` } as CSSProperties);
    }
    setOpen(true);
  };

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
        onClick={openMenu}
        aria-label={labels.open}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="press rounded-full border border-on-dark-muted p-[11px] text-white hover:bg-white/10"
      >
        <Icon name="menu" size={20} />
      </button>

      {/* Always mounted so it can animate out; `inert` + hidden when closed.
          Enter: the sheet grows as a circle out of the menu button (`menu-sheet`
          in globals.css), then the rows rise one after another. Exit: rows fade
          fast and the circle collapses back into the button. */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-hidden={!open}
          inert={!open}
          data-open={open}
          aria-label={labels.name}
          dir={locale === "ar" ? "rtl" : "ltr"}
          data-lenis-prevent
          style={origin}
          className="menu-sheet group/menu fixed inset-0 z-50 flex flex-col overflow-y-auto overscroll-contain bg-ink px-5 pt-4 pb-8 text-white"
        >
          <Mark
            size={300}
            className="menu-item absolute -bottom-10 -end-20 opacity-5 [--menu-delay:120ms] [--menu-rise:0px] group-data-[open=false]/menu:scale-90 group-data-[open=false]/menu:-rotate-12"
          />
          <div className="menu-item relative flex items-center justify-between [--menu-delay:40ms] [--menu-rise:-6px]">
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
                    style={{ "--menu-delay": `${140 + i * 45}ms` } as CSSProperties}
                    className="menu-item border-b border-white/10"
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

          {/* Wrapper carries the entrance so the button keeps its own press/sweep transitions. */}
          <div
            style={{ "--menu-delay": `${160 + items.length * 45}ms` } as CSSProperties}
            className="menu-item relative mt-8"
          >
            <Link
              href={labels.ctaHref}
              onClick={() => setOpen(false)}
              className={buttonClasses("primary", "w-full")}
            >
              <span>{labels.cta}</span>
              <Icon name="arrow-left" size={20} />
            </Link>
          </div>

          <div
            style={{ "--menu-delay": `${200 + items.length * 45}ms` } as CSSProperties}
            className="menu-item relative mt-6 flex flex-col items-start gap-2 text-on-dark-muted"
          >
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
