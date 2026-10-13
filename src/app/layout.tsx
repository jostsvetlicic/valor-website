import type { Metadata, Viewport } from "next";
import { Fraunces } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { brand, activePalette } from "@/config/brand";
import SmoothScroll from "@/components/SmoothScroll";
import PaletteVars from "@/components/PaletteVars";
import MotionProvider from "@/components/MotionProvider";
import Analytics from "@/components/Analytics";
import { seo } from "@/content/seo";
import { JsonLd } from "@/lib/seo";

// Fraunces only draws the VALOR wordmark (semibold), so one weight is enough.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["600"],
  style: ["normal"],
  display: "swap",
});

// Inter is the fallback after the system font (Apple devices never need it).
// Self-hosted as one variable file (weights 300 to 700) trimmed to Latin plus
// the Latin Extended-A letters of Slovenian (č, š, ž) and neighbours, so a
// Slovenian page needs one 48 KB font instead of Google's split latin and
// latin-ext files. Source: Google Fonts (Inter, SIL Open Font License).
const inter = localFont({
  src: "../fonts/inter-latin-sl.woff2",
  variable: "--font-inter",
  weight: "300 700",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  // Pages set their own title and description (content/seo.ts); these are
  // the fallbacks.
  title: {
    default: seo.en.home.title,
    template: "%s | VALOR",
  },
  description: seo.en.home.description,
  applicationName: "VALOR",
  authors: [{ name: "VALOR", url: brand.url }],
  creator: "VALOR",
  publisher: "VALOR",
  openGraph: {
    type: "website",
    siteName: "VALOR",
    url: brand.url,
    title: seo.en.home.title,
    description: seo.en.home.description,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.en.home.title,
    description: seo.en.home.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  // Google Search Console: set GOOGLE_SITE_VERIFICATION in Vercel to the
  // content value of the HTML tag Search Console gives you.
  // TODO: owner, add the verification code once the property is created.
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};

export const viewport: Viewport = {
  themeColor: activePalette.obsidian,
  width: "device-width",
  initialScale: 1,
};

// Structured data rendered site-wide: the company and the website. Service,
// FAQ and breadcrumb schemas live on the pages they describe.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${brand.url}/#organization`,
  name: "VALOR",
  legalName: brand.legal.entity,
  url: brand.url,
  logo: {
    "@type": "ImageObject",
    url: `${brand.url}/brand/valor-logo-512.png`,
    width: 512,
    height: 512,
  },
  description: seo.en.home.description,
  // Add the LinkedIn company page here once it exists.
  sameAs: [brand.instagramUrl],
  email: brand.email,
  telephone: brand.phoneDisplay,
  taxID: brand.legal.taxNo,
  identifier: brand.legal.registrationNo,
  foundingLocation: "Slovenia",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Godovič 99E",
    postalCode: "5275",
    addressLocality: "Godovič",
    addressCountry: "SI",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: brand.phoneDisplay,
    email: brand.email,
    contactType: "sales",
    availableLanguage: ["English", "Slovenian"],
  },
  founder: { "@type": "Person", name: "Jošt Svetličič" },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${brand.url}/#website`,
  name: "VALOR",
  url: brand.url,
  inLanguage: ["en", "sl"],
  publisher: { "@id": `${brand.url}/#organization` },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-obsidian text-cream antialiased">
        <PaletteVars />
        <SmoothScroll />
        <MotionProvider>{children}</MotionProvider>
        <div className="grain-overlay" aria-hidden="true" />
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <Analytics />
      </body>
    </html>
  );
}
