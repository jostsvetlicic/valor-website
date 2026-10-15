/**
 * Partners and platforms VALOR works with, shown in the moving strip on the
 * homepage. Labelled "Partners and platforms we work with" (owner's choice,
 * 15 Oct 2026): it stays accurate for every name without a written
 * partnership. "Official partner" needs written confirmation from the company
 * (see officialPartners.ts).
 *
 * Logos: Simple Icons (CC0, https://simpleicons.org), which copies each mark
 * from the company's official brand guidelines. Files in /public/tech.
 */

export type Tech = { name: string; logo: string };

export const techStack: Tech[] = [
  { name: "Anthropic", logo: "/tech/anthropic.svg" },
  { name: "Claude", logo: "/tech/claude.svg" },
  { name: "n8n", logo: "/tech/n8n.svg" },
  { name: "Wise", logo: "/tech/wise.svg" },
  { name: "ChatGPT", logo: "/tech/openai.svg" },
];
