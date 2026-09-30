# Build guide (for implementing pages from Figma)

Figma file key: `bVooHQJwCYrr6ZuoOytdCq`
- Page `🖥 Website — Home` (0:1): Home desktop `16:336`, Home mobile `18:212`
- Page `🖥 Website — Inner Pages` (30:468): desktop row + mobile row per page
- Page `🎨 Design System` (8:2): tokens, icons, buttons, site components

## Stack
Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4 (tokens in `app/globals.css`).
All pages live under `app/[locale]/…` with `locale` = `ar` (RTL, primary) | `en` (LTR).

## Hard rules
1. **Use logical properties only** (`ms-/me-/ps-/pe-/start-/end-/text-start/text-end`, `rounded-s-*`), never `left/right/ml/mr/pl/pr/text-left/text-right`, so the same markup mirrors for English.
   - Figma frames are RTL. A Figma `x` near the **right** edge = `start`; near the **left** edge = `end`.
   - In RTL flex rows the **first DOM child is on the right**. So write children in *reading order*: whatever appears rightmost in the Figma frame comes first.
2. **Every visible string is bilingual.** Put page copy in `content/<page>.ts` as `L` records (`{ ar, en }`, type from `@/lib/i18n`) and read it with `t(value, locale)`. Arabic comes verbatim from Figma; write natural, professional English.
3. **Do not edit existing shared files** (`components/*.tsx`, `content/site.ts`, `content/services.ts`, `content/projects.ts`, `lib/*`, `app/globals.css`, `app/[locale]/layout.tsx`). Create page-specific components in `components/<page>/…`. If a shared file truly needs a change, don't make it — describe the exact change in your final report.
4. Figma asset URLs (figma.com/api/mcp/asset/…) are **blocked** in this sandbox and must never appear in code. All photos are already in `public/images/` (see list below). Brand: `components/Brand.tsx` (`<Logo variant>`, `<Mark variant size>`). Icons: `components/Icon.tsx` (`<Icon name size className>`, colour via `text-*`, arrows auto-mirror in LTR).
5. Translate Figma's absolute positioning into real responsive layout (flex/grid). Desktop design = 1440 wide (content 1240 + 100px gutters → use `container-site`). Mobile design = 390 wide (20px gutters). Use `lg:` (1024px) as the desktop switch; make 768–1024 look sensible too.
6. Do **not** run `next build` or start another dev server (they would clash). A dev server is already running at **http://localhost:3000** with hot reload. Type-check with `npx tsc --noEmit`.
7. Figma font "thmanyah sans" → our default `font-sans` (Thmanyah Sans, self-hosted in `public/fonts/thmanyah-sans/`, Alexandria fallback). Weights: Light 300, Regular 400, Medium 500, Bold 700 (the design uses no SemiBold/ExtraBold). "DM Serif Display" → `font-serif` / `t-serif-italic`.

## Building blocks (import from `@/components/...`)
- `PageShell` — wraps a page with announcement bar, nav (`active` = home/about/services/work/team/contact), CTA band, footer. `cta={false}` hides CTA band.
- `PageHeader` — the dark inner-page header (breadcrumb, 2-line title white + lilac, lead, arch photo). Props: `locale, trail, title, titleAccent, lead, image, children`.
- `Button` (`href`, `variant`: primary | light | outlineDark | outlineLight, `icon` or `false`), `SubmitButton`, `buttonClasses()`.
- `Eyebrow` (`tone` light|dark) — 36×2 bar + label.
- Type utilities (responsive, mobile→desktop): `t-display`, `t-h1`, `t-h2`, `t-h3`, `t-h4`, `t-body-l`, `t-body-m`, `t-body-s`, `t-label`, `t-button`, `t-stat`, `t-serif-italic`. Spacing: `container-site`, `section-y` (64px / 130px).
- Colours: `purple #5E4DC1`, `purple-deep`, `lilac #CFC7F7`, `lilac-soft #ECE9FB`, `ink #1E1B2E`, `ink-soft`, `canvas #F3F2F6` (page bg), `line #E2E0EA`, `muted #6B6780`, `on-dark-muted #A9A5BD`, white.
- Data: `content/services.ts` (8 services: slug, number, image, title, short, summary, bullets), `content/projects.ts` (5 projects + categories).
- i18n: `href(locale, "/path")`, `t()`, `isLocale()`, `dirOf()`. Metadata: `pageMetadata({locale, path, title, description})` from `@/lib/metadata`.
- Images: use `next/image` with `fill` + `sizes` + `object-cover` inside a sized, `relative overflow-hidden` wrapper with the Figma corner radius.

## Page file pattern
```tsx
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
export async function generateMetadata({ params }: PageProps<"/[locale]/about">) { … }
export default async function Page({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PageShell locale={locale} active="about">…</PageShell>;
}
```
Dynamic routes need `generateStaticParams` returning every slug (locale comes from the layout) and `export const dynamicParams = false`.

## Photos in public/images/ (Figma slot `IMG / <key>` → file)
hero_masmak, about_building, svc_exhibitions, svc_events, svc_identity, svc_consult, svc_media,
svc_facility, svc_camps, svc_logistics, work_diriyah, work_baitissa, work_giftedness, work_globe,
work_wc_city, work_wc_booth, team → `/images/<key>.jpg`.
`portrait.jpg` = the one real team portrait (used in slots team_leader_1 / team_member_1).
Slots with no photo in Figma (other team portraits) → render a tasteful placeholder: `bg-lilac-soft` with a centred `<Mark variant="purple">` at ~15% opacity.
`map_riyadh` → Google Maps embed iframe (`https://www.google.com/maps?q=Riyadh&output=embed`), lazy, with the slot's radius.

## Verifying
- Workflow per section: `get_design_context` (desktop node) → implement → check mobile node → implement responsive → screenshot and compare.
- Screenshot: `node tools/shot.mjs /ar/about <out.png> 1440` and `… 390` (full page). Save shots under your scratchpad, then Read them and compare with the Figma screenshot of the same frame. Also check `/en/...` renders sensibly mirrored.
- Finish with `npx tsc --noEmit` clean.
