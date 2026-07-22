import { activePalette } from "@/config/brand";

/**
 * Injects the active palette as :root CSS variables. Rendered as the first
 * child of <body> so it overrides the @theme defaults in globals.css by
 * source order — every Tailwind utility that reads var(--color-*) re-tints,
 * and the canvas particle field / SVG sparkle read the same variables.
 *
 * Plain <style> with no `href`/`precedence` stays inline in the body (React 19
 * only hoists stylesheet links), so the cascade order is preserved.
 */
export default function PaletteVars() {
  const p = activePalette;
  const css = `:root{--color-obsidian:${p.obsidian};--color-charcoal:${p.charcoal};--color-gold:${p.gold};--color-gold-light:${p.goldLight};--color-cream:${p.cream};--color-grey:${p.grey};--color-background:${p.obsidian};--color-foreground:${p.cream};}`;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
