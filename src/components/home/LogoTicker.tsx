"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimationFrame, useInView, useReducedMotion } from "framer-motion";
import { FEATURES } from "@/config/features";
import { verifiedBrands, type Brand } from "@/content/brands";
import { clsx } from "@/lib/clsx";
import type { Dict, Locale } from "@/i18n";
import { HONOR_REDUCED_MOTION } from "@/lib/motion";

const ui: Dict<{ label: string; aria: string }> = {
  en: { label: "Trusted by", aria: "Clients" },
  sl: { label: "Zaupajo nam", aria: "Stranke" },
};

const ITEM_W = 176;
const ITEM_H = 48;
const GAP = 40;
const ARC_DESKTOP = 64;
const ARC_COMPACT = 36;
const ARC_MOBILE = 22;
const SPEED_PX_PER_MS = 0.07;

/**
 * Client names/logos drifting left → right along the bottom half of a wide,
 * flat ellipse: low at the edges, rising through the centre. The arc is
 * anchored to the visible width, so it reads on phones too. Without JS the
 * items render as a plain centred row. Renders nothing until
 * FEATURES.brandLogos is on and content/brands.ts has verified entries.
 */
export default function LogoTicker({ compact = false, locale = "en" }: { compact?: boolean; locale?: Locale }) {
  if (!FEATURES.brandLogos || verifiedBrands.length === 0) return null;
  return <Ticker items={verifiedBrands} compact={compact} locale={locale} />;
}

function Ticker({ items, compact, locale }: { items: Brand[]; compact: boolean; locale: Locale }) {
  const t = ui[locale];
  const arcDesktop = compact ? ARC_COMPACT : ARC_DESKTOP;
  const trackH = arcDesktop + ITEM_H + (compact ? 12 : 24);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [animated, setAnimated] = useState(false);
  const inView = useInView(containerRef);
  const reduceMotion = (useReducedMotion() ?? false) && HONOR_REDUCED_MOTION;

  // Switch from the static no-JS row to the absolutely positioned track.
  // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client upgrade
  useEffect(() => setAnimated(true), []);

  useAnimationFrame((time) => {
    const container = containerRef.current;
    if (!animated || !container || !inView) return;
    const W = container.offsetWidth;
    const mobile = W < 768;
    const base = mobile ? 0.8 : 1;
    const arcH = mobile ? ARC_MOBILE : arcDesktop;
    const w = ITEM_W * base;
    const slot = w + GAP * base;
    const loop = Math.max(W + w + GAP, items.length * slot);
    // Under the OS "reduce motion" setting the strip still drifts, at half speed.
    const offset = time * SPEED_PX_PER_MS * (reduceMotion ? 0.5 : 1);

    items.forEach((_, i) => {
      const el = itemRefs.current[i];
      if (!el) return;
      const cx = ((offset + i * slot) % loop) - w / 2;
      const u = Math.min(1, Math.max(0, cx / W));
      const lift = Math.sin(u * Math.PI);
      const top = trackH - (compact ? 6 : 12) - ITEM_H - arcH * lift;
      el.style.transform = `translate(${cx - ITEM_W / 2}px, ${top}px) scale(${base * (1 + 0.08 * lift)})`;
      el.style.opacity = String(0.45 + 0.55 * lift);
    });
  });

  return (
    <section aria-label={t.aria} className={compact ? "py-4" : "py-10 md:py-14"}>
      <p className="eyebrow px-4 text-center">
        {t.label}
      </p>

      <div
        ref={containerRef}
        className={clsx("relative overflow-hidden", compact ? "mt-4" : "mt-6 md:mt-8")}
        style={
          animated
            ? {
                height: trackH,
                maskImage:
                  "linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
              }
            : undefined
        }
      >
        <ul
          className={clsx(
            !animated && "flex flex-wrap justify-center gap-3 px-6",
          )}
        >
          {items.map((brand, i) => (
            <li
              key={brand.name}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className={clsx(
                "flex items-center justify-center rounded-lg border border-cream/15 bg-charcoal px-5 transition-colors duration-300 hover:border-gold/60 hover:bg-[color-mix(in_oklab,var(--color-gold)_16%,var(--color-charcoal))]",
                animated && "absolute left-0 top-0 opacity-0 will-change-transform",
              )}
              style={{
                width: ITEM_W,
                height: ITEM_H,
                transformOrigin: "50% 100%",
              }}
            >
              {brand.logoSrc ? (
                // eslint-disable-next-line @next/next/no-img-element -- logo aspect ratios are arbitrary
                <img
                  src={brand.logoSrc}
                  alt={brand.name}
                  className="max-h-7 w-auto max-w-full object-contain"
                />
              ) : (
                <span className="whitespace-nowrap font-display text-[0.95rem] font-semibold tracking-tight text-cream">
                  {brand.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
