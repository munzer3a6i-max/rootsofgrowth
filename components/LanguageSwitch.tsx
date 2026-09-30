"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { switchLocalePath, type Locale } from "@/lib/i18n";
import { Icon } from "./Icon";

/** "EN" / "ع" pill that keeps the visitor on the same page in the other language. */
export function LanguageSwitch({
  locale,
  showGlobe = true,
  className = "",
}: {
  locale: Locale;
  showGlobe?: boolean;
  className?: string;
}) {
  const pathname = usePathname() || `/${locale}`;
  const other: Locale = locale === "ar" ? "en" : "ar";
  return (
    <Link
      href={switchLocalePath(pathname, other)}
      hrefLang={other}
      lang={other}
      aria-label={other === "en" ? "English" : "العربية"}
      className={`t-label inline-flex items-center gap-[6px] press rounded-full border border-on-dark-muted px-[14px] py-[10px] text-white hover:border-white hover:bg-white/10 ${className}`}
    >
      {showGlobe && <Icon name="globe" size={16} />}
      <span>{other === "en" ? "EN" : "عربي"}</span>
    </Link>
  );
}
