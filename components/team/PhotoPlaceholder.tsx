import { Mark } from "@/components/Brand";

/** Branded stand-in for a team photo that isn't available yet. Fill a sized, relative parent. */
export function PhotoPlaceholder({ markClass = "w-[55%]" }: { markClass?: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-lilac-soft">
      <Mark variant="purple" size={220} className={`h-auto opacity-15 ${markClass}`} />
    </div>
  );
}
