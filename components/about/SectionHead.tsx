import type { ReactNode } from "react";
import { Eyebrow } from "@/components/Eyebrow";

/**
 * Inner-page section heading: eyebrow + H2 on the start side, optional
 * supporting text (desktop only, bottom-aligned) or action on the end side.
 * Figma: heading block 600–700w, gap 22 (desktop) / 20 (mobile); eyebrow bar 36 / 28.
 */
export function SectionHead({
  eyebrow,
  title,
  lead,
  side,
  aside,
  tone = "light",
  titleWidth = "lg:max-w-[600px]",
  className = "",
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  /** Lead paragraph under the title (inside the heading block). */
  lead?: ReactNode;
  /** Supporting paragraph on the end side (hidden on mobile, as in Figma). */
  side?: { text: ReactNode; className?: string };
  /** Any other end-side content (e.g. a button). */
  aside?: ReactNode;
  tone?: "light" | "dark";
  titleWidth?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10 ${className}`}>
      <div data-reveal className={`flex flex-col items-start gap-5 lg:gap-[22px] ${titleWidth}`}>
        <EyebrowR tone={tone}>{eyebrow}</EyebrowR>
        <h2 className={`t-h2 ${tone === "dark" ? "text-white" : "text-ink"}`}>{title}</h2>
        {lead && <p className="t-body-l text-ink lg:font-normal">{lead}</p>}
      </div>
      {side && (
        <p className={`t-body-m hidden shrink-0 lg:block ${tone === "dark" ? "text-on-dark-muted" : "text-muted"} ${side.className ?? "max-w-[440px]"}`}>
          {side.text}
        </p>
      )}
      {aside}
    </div>
  );
}

/** Eyebrow with the mobile 28px bar (desktop 36px). */
export function EyebrowR({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Eyebrow tone={tone} className={`[&>span:first-child]:w-7 lg:[&>span:first-child]:w-9 ${className}`}>
      {children}
    </Eyebrow>
  );
}
