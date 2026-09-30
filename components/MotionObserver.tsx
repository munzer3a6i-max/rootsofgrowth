"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Drives the site's scroll-linked motion without hiding content by default:
 * - [data-reveal]: items that start below the fold are marked pending (hidden),
 *   then revealed once as they scroll in. Items already on screen are left alone,
 *   so nothing flashes and nothing depends on JS to be visible.
 * - [data-loop]: infinite loops (tickers) get [data-offscreen] while not visible,
 *   which pauses their animation.
 */
export function MotionObserver() {
  const pathname = usePathname();

  // Mark the document once the visitor navigates inside the site (link click
  // or back/forward), so load-time entrances don't replay under the page curtain.
  useEffect(() => {
    const mark = () => document.documentElement.setAttribute("data-navigated", "");
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (a && a.getAttribute("href")?.startsWith("/")) mark();
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", mark);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", mark);
    };
  }, []);

  useEffect(() => {
    const vh = window.innerHeight;
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.removeAttribute("data-reveal-pending");
          el.setAttribute("data-reveal-done", "");
          reveal.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    const pending: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-done])").forEach((el) => {
      if (el.getBoundingClientRect().top >= vh) pending.push(el);
      else el.setAttribute("data-reveal-done", "");
    });
    // Hide below-the-fold items instantly (no fade-out), then re-enable transitions.
    for (const el of pending) {
      el.style.transition = "none";
      el.setAttribute("data-reveal-pending", "");
    }
    if (pending.length) void document.body.offsetHeight;
    for (const el of pending) {
      el.style.transition = "";
      reveal.observe(el);
    }

    const loops = new IntersectionObserver((entries) => {
      for (const e of entries) e.target.toggleAttribute("data-offscreen", !e.isIntersecting);
    });
    document.querySelectorAll("[data-loop]").forEach((el) => loops.observe(el));

    return () => {
      reveal.disconnect();
      loops.disconnect();
    };
  }, [pathname]);

  return null;
}
