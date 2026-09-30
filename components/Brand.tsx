import Image from "next/image";

type Variant = "primary" | "white" | "white-mono";

const src: Record<Variant, string> = {
  primary: "/brand/logo-primary.svg",
  white: "/brand/logo-white.svg",
  "white-mono": "/brand/logo-white-mono.svg",
};

/** "Roots of Growth" wordmark (Logo/Primary, Logo/White). Aspect 300 × 133.6. */
export function Logo({
  variant = "white",
  width = 150,
  className = "",
  priority,
  alt = "Roots of Growth — جذور النمو",
}: {
  variant?: Variant;
  width?: number;
  className?: string;
  priority?: boolean;
  alt?: string;
}) {
  return (
    <Image
      src={src[variant]}
      alt={alt}
      width={width}
      height={Math.round((width * 133.6) / 300)}
      className={className}
      priority={priority}
      unoptimized
    />
  );
}

/** Roots mark (Mark/Purple, Mark/White) — decorative. Aspect 144 × 143.3. */
export function Mark({
  variant = "white",
  size = 144,
  className = "",
}: {
  variant?: "white" | "purple";
  size?: number;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={variant === "white" ? "/brand/mark-white.svg" : "/brand/mark-purple.svg"}
      alt=""
      aria-hidden="true"
      width={size}
      height={Math.round((size * 143.31) / 144)}
      className={`pointer-events-none select-none ${className}`}
    />
  );
}
