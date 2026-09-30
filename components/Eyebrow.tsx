/** Section eyebrow: 36×2 accent bar + label (Figma "Eyebrow"). */
export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  /** "light" = on light backgrounds (purple), "dark" = on ink/purple backgrounds (lilac). */
  tone?: "light" | "dark";
  className?: string;
}) {
  const color = tone === "light" ? "text-purple" : "text-lilac";
  return (
    <p className={`t-label inline-flex items-center gap-3 ${color} ${className}`}>
      <span aria-hidden="true" className="h-[2px] w-7 rounded-full bg-current lg:w-9" />
      <span>{children}</span>
    </p>
  );
}
