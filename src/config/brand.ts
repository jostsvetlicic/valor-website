/**
 * VALOR — Central brand configuration.
 * Change anything here (contact details, links, social, copy) and it updates
 * everywhere across the site. This is the single source of truth.
 */

/* ------------------------------------------------------------------ */
/*  PALETTES                                                           */
/*                                                                    */
/*  To preview a different palette, change ONE line — `ACTIVE_PALETTE` */
/*  below — to any of: "gold" | "champagne" | "bone" | "sage"         */
/*  | "terracotta". Everything (including the canvas particle field    */
/*  and the SVG sparkle) re-tints from these values automatically.     */
/* ------------------------------------------------------------------ */
export type PaletteName =
  | "gold"
  | "champagne"
  | "bone"
  | "sage"
  | "terracotta";

export type Palette = {
  /** primary accent */
  gold: string;
  /** brighter accent used for highlights, hover, gradients, particles */
  goldLight: string;
  /** page background */
  obsidian: string;
  /** raised surfaces (cards, glass) */
  charcoal: string;
  /** body/heading text */
  cream: string;
  /** muted text */
  grey: string;
};

export const palettes: Record<PaletteName, Palette> = {
  // The original VALOR champagne-gold.
  gold: {
    gold: "#C9A24B",
    goldLight: "#E0C070",
    obsidian: "#0A0A0A",
    charcoal: "#14110D",
    cream: "#F5F1E8",
    grey: "#BDBDBD",
  },
  // 1. Champagne — soft warm ivory-gold on obsidian.
  champagne: {
    gold: "#E8D9B5",
    goldLight: "#F2E8CE",
    obsidian: "#0A0A0A",
    charcoal: "#14110D",
    cream: "#F5F1E8",
    grey: "#BDBDBD",
  },
  // 2. Bone — near-white warm neutral on obsidian.
  bone: {
    gold: "#F2EDE4",
    goldLight: "#FAF7F1",
    obsidian: "#0A0A0A",
    charcoal: "#141210",
    cream: "#F5F1E8",
    grey: "#BDBDBD",
  },
  // 3. Sage green — muted botanical accent on deep green-black.
  sage: {
    gold: "#A3B18A",
    goldLight: "#BEC9A8",
    obsidian: "#101512",
    charcoal: "#18201B",
    cream: "#F5F1E8",
    grey: "#BDBDBD",
  },
  // 4. Terracotta — warm clay accent on warm near-black.
  terracotta: {
    gold: "#C97D5D",
    goldLight: "#E0997A",
    obsidian: "#14110D",
    charcoal: "#1E1712",
    cream: "#F5F1E8",
    grey: "#BDBDBD",
  },
};

/* >>> ONE-LINE SWITCH: change this to preview a palette. <<< */
export const ACTIVE_PALETTE: PaletteName = "champagne";

export const activePalette: Palette = palettes[ACTIVE_PALETTE];

export const brand = {
  name: "Valor",
  legalName: "Valor",
  domain: "valorai.eu",
  url: "https://valorai.eu",
  tagline: "Websites and AI systems that turn visitors into bookings.",
  description:
    "Premium websites and AI booking systems for hospitality. Every guest answered in 60 seconds. Every booking direct.",

  // The external booking calendar. Only the /call landing page links here
  // directly; everywhere else on the site sends people to /call first.
  bookingUrl: "https://calendar.notion.so/meet/jostsvetlicic/discovery-call",

  // Site-wide "Book a call" destination — the dedicated landing page that
  // does the selling before anyone books. Change in one place.
  callUrl: "/call",

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

  // Brand palette — driven by ACTIVE_PALETTE above. At runtime these are
  // injected as CSS variables (see PaletteVars) so every colour follows.
  colors: activePalette,
};

export const nav = [
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Results", href: "/results" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type NavItem = (typeof nav)[number];
