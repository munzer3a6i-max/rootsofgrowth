"use client";

import { useEffect, useState } from "react";

/** Pagination dots for a horizontal scroller (active dot = 22×8 purple pill). */
export function ScrollDots({ targetId, count, className = "" }: { targetId: string; count: number; className?: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return setActive(0);
      const ratio = Math.abs(el.scrollLeft) / max; // RTL scrollLeft is negative
      setActive(Math.round(ratio * (count - 1)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [targetId, count]);

  return (
    <div aria-hidden="true" className={`flex items-center gap-[6px] ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`h-2 rounded-[4px] transition-all duration-300 ${i === active ? "w-[22px] bg-purple" : "w-2 bg-line"}`}
        />
      ))}
    </div>
  );
}
