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
    default: "Valor — AI booking systems & premium websites for hospitality",
    template: "%s — Valor",
  },
  description: brand.description,
  keywords: [
    "hospitality AI",
    "direct booking website",
    "AI booking assistant",
    "hotel website",
    "reduce booking commission",
    "Valor",
  ],
  authors: [{ name: "Valor" }],
  openGraph: {
    type: "website",
    url: brand.url,
    title: "Valor — Every guest answered in 60 seconds. Every booking direct.",
    description: brand.description,
    siteName: "Valor",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valor — Every guest answered in 60 seconds. Every booking direct.",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-obsidian text-cream antialiased">
        <PaletteVars />
        <SmoothScroll />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
