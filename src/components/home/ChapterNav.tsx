"use client";

import { useEffect, useState } from "react";
import type { Dict, Locale } from "@/i18n";
import { clsx } from "@/lib/clsx";

/** Homepage chapters, in page order. Each id must exist on the page. */
const chapters: { id: string; label: Dict }[] = [
  { id: "problem", label: { en: "The problem", sl: "Problem" } },
  { id: "who-we-help", label: { en: "Who we help", sl: "Komu pomagamo" } },
  { id: "calculator", label: { en: "Your cost today", sl: "Vaš strošek danes" } },
  { id: "reach", label: { en: "Where we work", sl: "Kje delamo" } },
  { id: "team", label: { en: "Team", sl: "Ekipa" } },
  { id: "faq", label: { en: "Questions", sl: "Vprašanja" } },
  { id: "book", label: { en: "Start", sl: "Začetek" } },
];

/**
 * A numbered chapter rail on the left edge (wide screens only), so the long
 * homepage reads as one story: where you are, and what comes next. Shown
 * only from 1440px, where the page margin is wide enough not to overlap
 * text. Hidden
 * over the hero; the active chapter is the one crossing the screen's middle.
 */
export default function ChapterNav({ locale = "en" }: { locale?: Locale }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    // Above the first chapter (the hero), hide the rail.
    const onScroll = () => {
      const first = els[0];
      if (first && first.getBoundingClientRect().top > window.innerHeight / 2) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      aria-label={locale === "sl" ? "Poglavja" : "Chapters"}
      className={clsx(
        "fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 transition-opacity duration-500 min-[1440px]:block 2xl:left-8",
        active ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <ol className="space-y-1">
        {chapters.map((c, i) => {
          const on = c.id === active;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={on ? "true" : undefined}
                className="group flex items-center gap-3 py-1"
              >
                <span
                  className={clsx(
                    "font-mono text-[0.7rem] tabular-nums transition-colors",
                    on ? "text-gold" : "text-grey group-hover:text-cream",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={clsx(
                    "h-px transition-all duration-300",
                    on ? "w-8 bg-gold" : "w-3 bg-cream/25 group-hover:w-5 group-hover:bg-cream/60",
                  )}
                />
                <span
                  className={clsx(
                    "whitespace-nowrap rounded-full bg-obsidian/80 px-2 py-0.5 text-xs font-medium backdrop-blur transition-opacity duration-300",
                    on ? "text-cream opacity-0 group-hover:opacity-100 2xl:opacity-100" : "text-cream/80 opacity-0 group-hover:opacity-100",
                  )}
                >
                  {c.label[locale]}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
