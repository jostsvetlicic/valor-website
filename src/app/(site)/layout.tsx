import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/**
 * Layout for the main marketing site — includes the sticky nav and full
 * footer. The /call landing page lives outside this group and deliberately
 * has neither, so there's no navigation and no way out except booking.
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
