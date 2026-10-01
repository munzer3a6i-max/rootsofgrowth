# Roots of Growth — جذور النمو

Bilingual (Arabic RTL / English LTR) company website built from the Figma file
**Roots-Of-Growth** (Home, Inner Pages and Design System pages).

- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4
- **Pages:** Home, About, Services, 8 × Service detail, Work, 5 × Project detail, Team, Contact, 404 — each in `/ar/…` and `/en/…`
- **Contact form:** `POST /api/contact` → email via SMTP (Hostinger email works out of the box)
- **SEO:** per-page metadata, hreflang alternates, `sitemap.xml`, `robots.txt`

---

## Run locally

```bash
npm install
cp .env.example .env.local     # fill in SMTP settings to test the form
npm run dev                    # http://localhost:3000  (redirects to /ar)
```

Production check:

```bash
npm run build
npm start                      # serves on $PORT (default 3000)
```

Requires Node.js **20.9+** (22 recommended).

---

## Deploy to Hostinger (Business Web Hosting → Node.js Web App)

### Option A — from GitHub (recommended: every push redeploys)

1. In **hPanel** go to **Websites → Add website → Node.js Apps**.
2. Choose **Import Git repository**, authorize GitHub and select this repository and the branch to deploy.
3. Hostinger detects **Next.js**. Check the build settings:

   | Setting          | Value            |
   | ---------------- | ---------------- |
   | Framework        | Next.js          |
   | Node.js version  | 22.x (or 20.x)   |
   | Root directory   | `/` (repo root)  |
   | Install command  | `npm ci`         |
   | Build command    | `npm run build`  |
   | Start command    | `npm start`      |

   `next start` automatically listens on the `PORT` Hostinger provides.
4. Add the **environment variables** (same screen, or later in the website dashboard → *Environment variables*):

   | Variable               | Example / notes                                                     |
   | ---------------------- | ------------------------------------------------------------------- |
   | `SMTP_HOST`            | `smtp.hostinger.com`                                                |
   | `SMTP_PORT`            | `465`                                                               |
   | `SMTP_SECURE`          | `true` (use `false` with port `587`)                                |
   | `SMTP_USER`            | the mailbox you create in hPanel → Emails, e.g. `info@rootsofgrowth.com.sa` |
   | `SMTP_PASS`            | that mailbox's password                                             |
   | `CONTACT_TO`           | optional; where submissions go (default `info@rootsofgrowth.com.sa`) |
   | `CONTACT_FROM`         | optional, defaults to `SMTP_USER`                                   |
   | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` (used for canonical URLs & sitemap)       |

   `NEXT_PUBLIC_SITE_URL` is baked in at build time — redeploy after changing it.
5. Click **Deploy**. When it finishes, connect your domain in hPanel (Domains) and enable SSL.

### Option B — upload a ZIP

1. Zip the project **without** `node_modules` and `.next` (e.g. `git archive -o site.zip HEAD`).
   You don't need to build locally — Hostinger installs and builds on the server.
2. hPanel → **Websites → Add website → Node.js Apps → Upload your website files**, upload the zip.
3. Use the same build settings and environment variables as in Option A, then deploy.

### After deploying

- Open `/ar` and `/en`, switch languages from the nav pill.
- Send a test message from **Contact**; it should arrive at `info@rootsofgrowth.com.sa` (or `CONTACT_TO` if set). If it doesn't, check the
  app's runtime logs in hPanel — a missing/incorrect SMTP variable is logged clearly.

---

## Editing content

All copy is bilingual (`{ ar, en }`) and lives in `content/`:

| File                          | What it holds                                        |
| ----------------------------- | ---------------------------------------------------- |
| `content/site.ts`             | Phone, email, address, social links, nav, footer, CTA |
| `content/services.ts`         | The 8 services (titles, summaries, bullets, images)  |
| `content/service-detail.ts`   | Long-form text for each service detail page          |
| `content/projects.ts`         | Portfolio projects & filter categories               |
| `content/project-detail.ts`   | Long-form text & galleries for each project          |
| `content/home.ts`, `about.ts`, `team.ts`, `contact.ts`, … | Page-specific copy          |

Photos are in `public/images/` (same names as the Figma `IMG / <key>` slots); replace a file
with one of the same name to swap a photo. Logos/marks are in `public/brand/`.

### Design tokens

Colours, type scale and spacing from the Figma Design System are defined once in
`app/globals.css` (`@theme` + `t-*` typography utilities).

**Fonts:** Arabic (as in Figma) — **Thmanyah Sans** (Light / Regular / Medium / Bold), with
**DM Serif Display** for Latin accents and big numerals. English — **DM Serif Display** for
headings and **Google Sans Flex** for body text (see "English typography" in `app/globals.css`). The Thmanyah files are in
`fonts/thmanyah-sans/` (outside `public/`) and compiled into the build by `next/font/local`.
Their licence forbids uploading/hosting the font files where they can be downloaded, so keep this
repository **private** — see `fonts/thmanyah-sans/README.md`.

---

## Project structure

```
app/
  [locale]/            ar | en — layout sets <html lang dir>
    page.tsx           Home
    about/ services/ services/[slug]/ work/ work/[slug]/ team/ contact/
    not-found.tsx      404 (also served for unknown URLs)
  api/contact/route.ts contact form → SMTP
  sitemap.ts robots.ts
components/            shared UI (Header, Footer, CtaBand, PageHeader, Button, Icon…) + per-page folders
content/               bilingual copy & data
lib/                   i18n helpers, metadata, mail
proxy.ts               redirects "/" (and any un-prefixed path) to /ar or /en
fonts/                 Thmanyah Sans (compiled in via next/font/local — keep repo private)
public/                images, brand SVGs
```
