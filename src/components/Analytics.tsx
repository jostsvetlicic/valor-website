import Script from "next/script";
import { brand } from "@/config/brand";

/**
 * Plausible Analytics: cookie-free, no personal data, no consent banner
 * needed. Loads only in production builds. The outbound-links variant also
 * counts clicks on external links, which includes every "Book a call" click
 * (they open the Notion booking page).
 *
 * Setup (owner): create the site "valorai.eu" at plausible.io. Nothing else
 * is needed in code. Set NEXT_PUBLIC_PLAUSIBLE=off to switch it off.
 */
export default function Analytics() {
  if (process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_PLAUSIBLE === "off") return null;
  return (
    <Script
      defer
      strategy="afterInteractive"
      data-domain={brand.domain}
      src="https://plausible.io/js/script.outbound-links.js"
    />
  );
}
