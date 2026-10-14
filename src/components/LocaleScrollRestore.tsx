"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Keeps the reading position when the visitor switches language.
 *
 * Before navigating, `saveLocaleScroll` notes which section is at the top of
 * the screen and how far into it the visitor is. English and Slovenian pages
 * share the same section structure, so after the new page renders we scroll
 * to the same point of the same section (text lengths differ slightly, so a
 * raw pixel offset would drift). Sections that load late (code-split) can
 * shift the page, so the position is re-applied for a short while unless the
 * visitor starts scrolling.
 */

const KEY = "valor:locale-scroll";

type Saved = { to: string; index: number; frac: number; ratio: number };

function sections(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>("main section"));
}

export function saveLocaleScroll(to: string) {
  try {
    const y = window.scrollY;
    let index = -1;
    let frac = 0;
    sections().forEach((s, i) => {
      const r = s.getBoundingClientRect();
      const top = r.top + y;
      if (r.height > 0 && top <= y + 1) {
        index = i;
        frac = Math.min(1, (y - top) / r.height);
      }
    });
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const saved: Saved = { to, index, frac, ratio: max > 0 ? y / max : 0 };
    sessionStorage.setItem(KEY, JSON.stringify(saved));
  } catch {
    // Storage unavailable: the switch still works, it just starts at the top.
  }
}

type LenisLike = { scrollTo: (y: number, opts?: { immediate?: boolean }) => void };

function scrollToY(y: number) {
  const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
  if (lenis) lenis.scrollTo(y, { immediate: true });
  else window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
}

export default function LocaleScrollRestore() {
  const pathname = usePathname();

  useEffect(() => {
    let saved: Saved | null = null;
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) saved = JSON.parse(raw) as Saved;
    } catch {
      return;
    }
    if (!saved || saved.to !== pathname) return;
    sessionStorage.removeItem(KEY);
    const s = saved;

    const target = () => {
      const list = sections();
      const el = s.index >= 0 ? list[s.index] : undefined;
      if (el) {
        const r = el.getBoundingClientRect();
        return r.top + window.scrollY + s.frac * r.height;
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return s.ratio * max;
    };

    let stopped = false;
    const stop = () => {
      stopped = true;
    };
    window.addEventListener("wheel", stop, { passive: true, once: true });
    window.addEventListener("touchstart", stop, { passive: true, once: true });
    window.addEventListener("keydown", stop, { once: true });

    // Apply now, then again as late sections load, for up to ~1.2 s.
    const timers = [0, 60, 150, 300, 500, 800, 1200].map((ms) =>
      window.setTimeout(() => {
        if (!stopped) scrollToY(target());
      }, ms),
    );

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, [pathname]);

  return null;
}
