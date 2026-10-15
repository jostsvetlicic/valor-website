import type { Metadata } from "next";
import NotFoundBody from "@/components/NotFoundBody";

export const metadata: Metadata = {
  title: "Page not found",
  // A missing page must not claim the homepage as its canonical.
  alternates: { canonical: null, languages: {} },
  robots: { index: false, follow: true },
};

/**
 * 404 for pages inside the site layout that call notFound() (for example
 * /case-studies while no verified case study exists). The layout already
 * renders the nav and footer, so only the body goes here; the root
 * not-found.tsx covers unknown URLs, which have no layout around them.
 */
export default function NotFound() {
  return <NotFoundBody />;
}
