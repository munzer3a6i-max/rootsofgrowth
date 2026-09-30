# Motion system

Built from Emil Kowalski's animation skills (`animate`, `find-animation-opportunities`),
the taste skill and `impeccable`. Motion must have a purpose: feedback, state, continuity,
or the one authored moment (the Home hero). All utilities live in `app/globals.css`.

## Tokens
Tailwind `ease-out` / `ease-in-out` now resolve to strong curves:
`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`.
UI transitions stay 150–300ms. Never `transition-all`, never `ease-in`, never `scale(0)`.

## Utilities (use these; don't invent parallel ones)
| Class | Put it on | Effect |
|---|---|---|
| `press` | any pressable that is not a `<Button>` (chips, filter buttons, icon buttons, pills) | `:active` scale(0.97), 160ms; also transitions colour/border/bg |
| `group` + `nudge` | `group` on the link/card, `nudge` on its arrow `<Icon>` (arrow-left / arrow-up-left only) | arrow moves 3px in reading direction on hover |
| `group` + `media-zoom` | `group` on the card link, `media-zoom` on the `next/image` (inside an `overflow-hidden` frame) | photo scales to 1.04 over 700ms on hover |
| `lift` | light cards with a surface (white/canvas cards), on the card itself (it can also be the `group`; can be combined with `press`) | 3px rise + soft shadow on hover |
| `data-reveal` (+ `style={{ "--i": n } as React.CSSProperties}`) | section heading blocks and the items of a card grid / list that appears as a list | fades/rises in once when scrolled into view; `--i` staggers by 60ms (cap 6) |

`<Button>`, `LanguageSwitch`, footer socials and the mobile menu already have press/nudge.
Hover motion is automatically limited to fine pointers (Tailwind v4 `hover:` and the utilities
above are gated). Reduced motion is handled inside each utility.

## Smooth scroll, buttons, links
- **Smooth scroll:** Lenis (`components/SmoothScroll.tsx`, lerp 0.085) eases wheel/trackpad
  scrolling; touch stays native; reduced motion = 1:1. In-page `#anchor` links glide to the
  target (24px offset). Scrollable panels need no work (`allowNestedScroll`); add
  `data-lenis-prevent` to an overlay that must never smooth-scroll (the mobile menu has it).
  Don't reintroduce `scroll-behavior: smooth` on html — it fights Lenis.
- **Buttons:** `btn-sweep` (built into `buttonClasses`) — a `--sweep` fill slides in from the
  reading-start edge on hover and leaves through the far edge (450ms). Set `--sweep` and the
  hover text colour per variant.
- **Text links:** `link-draw` draws an underline in from the reading-start edge (footer links).

## Rules for reveals
- Never on the hero / `PageHeader` / anything above the fold.
- Not on every paragraph: one heading block per section + the grid items. Skip small inline bits.
- Content stays visible without JS; `MotionObserver` only hides items that start below the fold.

## Page transitions
Navigations use a branded curtain (`components/PageCurtain.tsx` + "Page transitions" in
`app/globals.css`): a purple panel with the roots mark rises over the page (≈360ms), the page
swaps underneath, and the panel exits upward (≈850ms total). `PageShell` wraps the page body in
React `<ViewTransition enter="page" exit="page">`.
- Same-page transitions must call `addTransitionType("filter")` inside `startTransition`
  (Work/Team filters) so they skip the curtain.
- Photo-morph links pass `transitionTypes={["morph"]}` to `<Link>`; both ends wrap the photo in
  `<ViewTransition name="project-<slug>" share="morph" default="none">` (unique names per page).
- Hero/page-header entrances (`hero-*` utilities) play on a fresh load only; after the first
  in-app navigation `html[data-navigated]` disables them so pages arrive complete.
- Reduced motion: plain crossfade, no curtain. No View Transitions support: the page fades/rises in.
- Keep the header as the first element of each page (the skip link lives in the layout), or
  Next's post-navigation scroll will land below the header.
- Put `data-reveal` on a wrapper (e.g. the `<li>`), not on the same element as `press`/`lift` — the reveal transition would override theirs.
