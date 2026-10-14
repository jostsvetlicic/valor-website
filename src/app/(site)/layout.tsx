import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import HtmlLang from "@/components/HtmlLang";
import LocaleScrollRestore from "@/components/LocaleScrollRestore";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <HtmlLang />
      <LocaleScrollRestore />
      <Nav />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
    </>
  );
}
