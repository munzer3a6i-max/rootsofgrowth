"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Smooth, slightly slowed wheel/trackpad scrolling (Lenis). Touch devices keep
 * native scrolling (already smooth, and users expect their own momentum).
 * Honors prefers-reduced-motion (Lenis falls back to 1:1 scrolling), pauses
 * while the mobile menu locks the page, and resyncs after navigations.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085, // lower = glidier; 0.1 is Lenis' default
      wheelMultiplier: 0.9,
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
      respectReducedMotion: true,
    });
    lenisRef.current = lenis;

    // In-page anchors (e.g. the service quick links): glide to the live
    // position of the target, 24px below the top, and keep the URL hash.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href^='#']");
      const id = a?.getAttribute("href")?.slice(1);
      const target = id ? document.getElementById(decodeURIComponent(id)) : null;
      if (!target) return;
      e.preventDefault();
      // Ignore a pending scroll-reveal offset (translate) on the target itself.
      const ty = parseFloat(getComputedStyle(target).translate.split(" ")[1] ?? "0") || 0;
      const top = target.getBoundingClientRect().top - ty + window.scrollY - 24;
      lenis.scrollTo(top, { duration: 1.2 });
      history.replaceState(history.state, "", `#${id}`);
    };
    document.addEventListener("click", onClick);

    // The mobile menu locks the page with body { overflow: hidden }.
    const body = document.body;
    const sync = () => (body.style.overflow === "hidden" ? lenis.stop() : lenis.start());
    const mo = new MutationObserver(sync);
    mo.observe(body, { attributes: true, attributeFilter: ["style"] });

    return () => {
      mo.disconnect();
      document.removeEventListener("click", onClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // After a route change Next sets the scroll position itself; align Lenis'
  // internal target with it so the next wheel tick doesn't jump back.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    lenis.resize();
  }, [pathname]);

  return null;
}
