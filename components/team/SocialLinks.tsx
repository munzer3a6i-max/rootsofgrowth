import { t, type Locale } from "@/lib/i18n";
import { team, type Person } from "@/content/team";
import { Icon, type IconName } from "@/components/Icon";

/** Round outline icon links (LinkedIn / email). Missing links render as inert circles, as drawn in Figma. */
export function SocialLinks({
  person,
  locale,
  size,
  email = true,
}: {
  person: Person;
  locale: Locale;
  size: "lg" | "sm";
  email?: boolean;
}) {
  // Reading order: email first (start side), LinkedIn last — as in Figma.
  const items: { icon: IconName; href?: string; label: string }[] = [];
  if (email) items.push({ icon: "mail", href: person.email && `mailto:${person.email}`, label: t(team.a11y.email, locale) });
  items.push({ icon: "linkedin", href: person.linkedin, label: t(team.a11y.linkedin, locale) });

  const box = size === "lg" ? "p-[10px]" : "p-[9px]";
  const iconSize = size === "lg" ? 16 : 14;
  const cls = `flex shrink-0 items-center justify-center rounded-full border border-line text-ink ${box}`;

  return (
    <div className="flex shrink-0 items-center gap-2">
      {items.map((it) =>
        it.href ? (
          <a
            key={it.icon}
            href={it.href}
            aria-label={`${it.label} — ${t(person.name, locale)}`}
            {...(it.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`${cls} transition-colors hover:border-purple hover:text-purple`}
          >
            <Icon name={it.icon} size={iconSize} />
          </a>
        ) : (
          <span key={it.icon} aria-hidden="true" className={`${cls} text-muted`}>
            <Icon name={it.icon} size={iconSize} />
          </span>
        ),
      )}
    </div>
  );
}
