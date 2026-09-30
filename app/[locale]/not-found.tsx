import { NotFoundView } from "@/components/notfound/NotFoundView";

/**
 * Designed 404 (Figma 35:1674). Rendered for notFound() anywhere under
 * /[locale] — including unknown URLs via app/[locale]/[...rest]/page.tsx.
 * not-found.tsx gets no params, so the view reads the locale from the URL.
 */
export default function NotFound() {
  return <NotFoundView />;
}
