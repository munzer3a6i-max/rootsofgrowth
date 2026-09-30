import { Mark } from "./Brand";

/**
 * Branded page-transition curtain. Invisible in normal use; during a
 * navigation view transition it becomes visible and is captured as its own
 * layer ("page-curtain"), which app/globals.css sweeps up across the screen
 * while the old page is swapped for the new one underneath.
 */
export function PageCurtain() {
  return (
    <div id="page-curtain" aria-hidden="true">
      <Mark size={96} className="h-auto w-16 lg:w-24" />
    </div>
  );
}
