import { Fragment } from "react";
import { t, type Locale } from "@/lib/i18n";
import { home } from "@/content/home";
import { getProject } from "@/content/projects";

/**
 * "فخورون بصناعة لحظات في" — Figma 16:386 / 18:265.
 * Project names scroll as an infinite ticker (pauses on hover, fades at the edges).
 * Visitors with "reduce motion" enabled get the static, wrapped list instead.
 */
export function ProjectsStrip({ locale }: { locale: Locale }) {
  const names = home.strip.items.map((i) => t(getProject(i.slug)!.title, locale));
  // Each half of the track repeats the list twice so it is always wider than the viewport.
  const half = [...names, ...names];
  const itemClass =
    "text-[15px] leading-[1.4] font-medium whitespace-nowrap text-ink/75 lg:text-[18px]";
  const star = (
    <span aria-hidden="true" className="text-[12px] leading-[1.4] font-medium text-purple">
      ✦
    </span>
  );

  return (
    <section className="bg-white">
      <div className="flex flex-col items-center gap-[6px] py-5 lg:gap-2 lg:pt-[22px] lg:pb-[26px]">
        <p className="container-site text-center text-[13px] leading-[1.4] font-medium text-muted lg:text-[14px]">
          {t(home.strip.title, locale)}
        </p>

        {/* Accessible list (screen readers) + static fallback for reduced motion. */}
        <ul className="sr-only motion-reduce:not-sr-only motion-reduce:container-site motion-reduce:flex motion-reduce:flex-wrap motion-reduce:items-center motion-reduce:justify-center motion-reduce:gap-x-5 motion-reduce:gap-y-2">
          {names.map((n, i) => (
            <Fragment key={n}>
              {i > 0 && <li aria-hidden="true">{star}</li>}
              <li className={itemClass}>{n}</li>
            </Fragment>
          ))}
        </ul>

        {/* Ticker. LTR-anchored track so the shared `marquee` keyframes loop seamlessly;
            items are reversed in Arabic so they still read right-to-left. */}
        <div
          aria-hidden="true"
          dir="ltr"
          className="group w-full overflow-hidden py-2 motion-reduce:hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        >
          <div className="animate-marquee flex w-max [animation-duration:55s] group-hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className={`flex shrink-0 items-center gap-5 pe-5 lg:gap-[26px] lg:pe-[26px] ${
                  locale === "ar" ? "flex-row-reverse" : ""
                }`}
              >
                {half.map((n, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-5 lg:gap-[26px] ${locale === "ar" ? "flex-row-reverse" : ""}`}
                  >
                    <span className={itemClass}>{n}</span>
                    {star}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
