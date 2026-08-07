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
    obsidian: "#0A0A0B", // base
    charcoal: "#141416", // elevated surface
    cream: "#F2EFE9", // text
    grey: "rgba(242, 239, 233, 0.62)", // muted text
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
/* "gold" = the specified champagne gold #C9A24B accent. */
export const ACTIVE_PALETTE: PaletteName = "gold";

export const activePalette: Palette = palettes[ACTIVE_PALETTE];

export const brand = {
  name: "Valor",
  legalName: "Valor",
  domain: "valorai.eu",
  url: "https://valorai.eu",
  tagline: "The AI infrastructure your business runs on.",
  description:
    "Valor builds the AI infrastructure a company runs on: the frontend that sells, the automation behind it, the operations system your team works in, and the integration layer between the tools you already use.",

  // The single site-wide "Book a call" destination — the external booking
  // calendar. Every CTA links straight here and opens in a new tab. Change
  // it in this one place.
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

  // Brand palette — driven by ACTIVE_PALETTE above. At runtime these are
  // injected as CSS variables (see PaletteVars) so every colour follows.
  colors: activePalette,
};

export const nav = [
  { label: "Infrastructure", href: "/infrastructure" },
  { label: "Industries", href: "/industries" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type NavItem = (typeof nav)[number];
