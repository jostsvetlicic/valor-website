import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import NotFoundBody from "@/components/NotFoundBody";
import HtmlLang from "@/components/HtmlLang";

export const metadata: Metadata = {
  title: "Page not found",
  // A missing page must not claim the homepage as its canonical.
  alternates: { canonical: null, languages: {} },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <HtmlLang />
      <Nav />
      <main>
        <NotFoundBody />
      </main>
      <Footer />
    </>
  );
}
