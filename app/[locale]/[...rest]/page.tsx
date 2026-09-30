import { notFound } from "next/navigation";

/** Any unknown URL under /ar or /en renders the designed 404 page. */
export default function CatchAll() {
  notFound();
}
