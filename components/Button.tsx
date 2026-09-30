import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

/**
 * Pill button — Figma "Button" component (Variant = Primary / Light /
 * Outline on Dark / Outline on Light). Label first, arrow after it
 * (on the left in RTL, on the right in LTR).
 */
export type ButtonVariant = "primary" | "light" | "outlineDark" | "outlineLight";

/* Hover: a fill (--sweep) slides in from the reading-start side and exits
 * through the far side (the `btn-sweep` utility in app/globals.css). */
const variants: Record<ButtonVariant, string> = {
  primary: "bg-purple text-white [--sweep:var(--color-lilac)] hover:text-ink",
  light: "bg-white text-ink [--sweep:var(--color-ink)] hover:text-white",
  outlineDark: "border-[1.5px] border-white text-white [--sweep:var(--color-white)] hover:text-ink",
  outlineLight: "border-[1.5px] border-ink text-ink [--sweep:var(--color-ink)] hover:text-white",
};

export function buttonClasses(variant: ButtonVariant = "primary", extra = "") {
  return `t-button inline-flex items-center justify-center gap-[10px] group press btn-sweep rounded-full px-7 py-4 whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${extra}`;
}

type Common = {
  variant?: ButtonVariant;
  icon?: IconName | false;
  children: ReactNode;
  className?: string;
};

export function Button({
  href,
  variant = "primary",
  icon = "arrow-left",
  children,
  className = "",
  ...rest
}: Common & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const inner = (
    <>
      <span>{children}</span>
      {icon && <Icon name={icon} size={20} className="nudge" />}
    </>
  );
  if (external) {
    return (
      <a href={href} target={rest.target} rel={rest.rel} className={buttonClasses(variant, className)}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClasses(variant, className)} {...rest}>
      {inner}
    </Link>
  );
}

export function SubmitButton({
  variant = "primary",
  icon = "arrow-left",
  children,
  className = "",
  ...rest
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={buttonClasses(variant, className)} {...rest}>
      <span>{children}</span>
      {icon && <Icon name={icon} size={20} className="nudge" />}
    </button>
  );
}
