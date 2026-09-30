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

## Rules for reveals
- Never on the hero / `PageHeader` / anything above the fold.
- Not on every paragraph: one heading block per section + the grid items. Skip small inline bits.
- Content stays visible without JS; `MotionObserver` only hides items that start below the fold.

## Page transitions
`PageShell` wraps the page body in React `<ViewTransition>` (crossfade + 14px rise); the header
is anchored. Shared photo morphs use `<ViewTransition name="…" share="morph" default="none">`
on both ends (names must be unique on a page).
- Put `data-reveal` on a wrapper (e.g. the `<li>`), not on the same element as `press`/`lift` — the reveal transition would override theirs.
