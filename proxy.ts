import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

/**
 * Every page lives under /ar or /en. Requests without a locale prefix
 * (e.g. "/" or "/about") are redirected: English browsers go to /en,
 * everyone else to Arabic (the primary language).
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";
  if (isLocale(first)) return NextResponse.next();

  const accept = request.headers.get("accept-language") ?? "";
  const prefersEnglish = /^en\b/i.test(accept.trim());
  const locale = prefersEnglish ? "en" : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension (images, svg, robots.txt…).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
