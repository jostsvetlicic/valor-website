/**
 * VALOR — Central brand configuration.
 * Change anything here (contact details, links, social, copy) and it updates
 * everywhere across the site. This is the single source of truth.
 */

export const brand = {
  name: "Valor",
  legalName: "Valor",
  domain: "valorai.eu",
  url: "https://valorai.eu",
  tagline: "Websites and AI systems that turn visitors into bookings.",
  description:
    "Premium websites and AI booking systems for hospitality. Every guest answered in 60 seconds. Every booking direct.",

  // Primary call to action — every "Book a call" points here.
  bookingUrl: "https://calendar.notion.so/meet/jostsvetlicic/discovery-call",

  // Contact
  phoneDisplay: "+386 69 636 766",
  phoneHref: "tel:+38669636766",
  whatsappUrl: "https://wa.me/38669636766",

  // Instagram
  instagramHandle: "@ai_valor",
  instagramUrl: "https://instagram.com/ai_valor",

  // EMAIL IS NOT SET UP YET.
  // >>> PLACEHOLDER: replace this one value when your inbox is live. <<<
  email: "hello@valorai.eu", // TODO: VALOR — set real email address here
  emailIsPlaceholder: true,

  // Brand palette (kept in sync with globals.css @theme tokens)
  colors: {
    obsidian: "#0A0A0A",
    charcoal: "#14110D",
    gold: "#C9A24B",
    goldLight: "#E0C070",
    cream: "#F5F1E8",
    grey: "#BDBDBD",
  },
} as const;

export const nav = [
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Results", href: "/results" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type NavItem = (typeof nav)[number];
