# Thmanyah Sans font files

**Thmanyah Sans** (ثمانية) is the typeface of the Figma design. It is loaded in
`app/[locale]/layout.tsx` with `next/font/local`, which compiles these files into the
production build. They are deliberately kept **outside `public/`** so the site never serves them
at a plain, downloadable URL.

Licence (embedded in the font files; Arabic version prevails): Thmanyah Font License,
© Thmanyah Publishing and Distribution — https://font.thmanyah.com. In short:

- ✅ Commercial use in websites, and embedding in websites/web apps *only as part of a
  compiled, packaged, or obfuscated product*.
- ❌ Hosting, uploading or sharing the font files anywhere they can be downloaded,
  letting end users extract/download them, modifying or converting them, or reselling them.
- Download only from the official site. Questions / extended rights: ask@thmanyah.com.

⚠️ Because of the "no uploading/hosting" rule, keep the Git repository that contains these
files **private**.

Files used by the site: `thmanyahsans-Light.otf` (300), `-Regular` (400), `-Medium` (500),
`-Bold` (700). `thmanyahsans-Black.otf` is not used by the design.
