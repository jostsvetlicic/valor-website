import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { brand, activePalette } from "@/config/brand";
import SmoothScroll from "@/components/SmoothScroll";
import PaletteVars from "@/components/PaletteVars";
import MotionProvider from "@/components/MotionProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: "VALOR | AI infrastructure for companies that run on manual work",
    template: "%s | VALOR",
  },
  description: brand.description,
  keywords: [
    "AI infrastructure",
    "business automation",
    "systems integration",
    "custom software",
    "internal tools and portals",
    "operations software",
    "Slovenia",
    "Valor",
  ],
  authors: [{ name: "Valor" }],
  openGraph: {
    type: "website",
    url: brand.url,
    title: "VALOR | AI infrastructure for companies that run on manual work",
    description: brand.description,
    siteName: "Valor",
  },
  twitter: {
    card: "summary_large_image",
    title: "VALOR | AI infrastructure for companies that run on manual work",
    description: brand.description,
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: activePalette.obsidian,
  width: "device-width",
  initialScale: 1,
};

// Structured data, Organization + the service Valor provides. Rendered
// site-wide so search engines get a consistent picture of the company.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  legalName: brand.legal.entity,
  url: brand.url,
  logo: `${brand.url}/brand/valor-mark-light.png`,
  description: brand.description,
  sameAs: [brand.instagramUrl],
  email: brand.email,
  taxID: brand.legal.taxNo,
  identifier: brand.legal.registrationNo,
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
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI infrastructure & custom software",
  provider: { "@type": "Organization", name: brand.name, url: brand.url },
  serviceType: "Custom software, automation and systems integration",
  areaServed: ["Slovenia", "Croatia", "Italy", "European Union"],
  description: brand.description,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </body>
    </html>
  );
}
