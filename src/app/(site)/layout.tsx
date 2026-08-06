import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/**
 * Layout for the main marketing site — includes the sticky nav and full
 * footer, shared by every page. Every "Book a call" CTA links straight to
 * the external booking calendar (brand.bookingUrl) in a new tab.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
