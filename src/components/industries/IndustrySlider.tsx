"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { industries } from "@/content/industries";
import { clsx } from "@/lib/clsx";

/**
 * Horizontal snap slider of industry cards. Native scroll-snap gives smooth
 * drag on touch and trackpad; arrow buttons and the left/right arrow keys move
 * one card at a time on desktop, with a progress thumb tracking position.
 *
 * Under prefers-reduced-motion the whole thing collapses to a plain stacked
 * grid (Tailwind `motion-reduce:` variants) and the controls are hidden — no
 * horizontal motion at all.
 */
export default function IndustrySlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ width: 30, left: 0 });
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const progress = max > 0 ? el.scrollLeft / max : 0;
    const visible = el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1;
    const width = Math.min(1, visible) * 100;
    setThumb({ width, left: progress * (100 - width) });
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scrollByCards = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByCards(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByCards(-1);
    }
  }

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={update}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="group"
        aria-label="Industries — use the arrow keys to browse"
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian motion-reduce:grid motion-reduce:snap-none motion-reduce:grid-cols-1 motion-reduce:overflow-visible sm:motion-reduce:grid-cols-2 lg:motion-reduce:grid-cols-3 [&::-webkit-scrollbar]:hidden"
      >
        {industries.map((ind) => (
          <Link
            key={ind.slug}
            href={`/industries/${ind.slug}`}
            data-card
            className="group relative flex w-[85%] shrink-0 snap-start flex-col rounded-[1.75rem] border border-gold/12 bg-charcoal/40 p-8 transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-gold/35 hover:bg-charcoal/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:w-[24rem] motion-reduce:w-auto motion-reduce:hover:translate-y-0"
          >
            <span className="eyebrow">{ind.shortName}</span>
            <h3 className="mt-4 font-display text-2xl font-medium leading-snug tracking-tight text-cream md:text-[1.7rem]">
              {ind.tagline}
            </h3>
            <ul className="mt-6 flex-1 space-y-2.5 border-t border-gold/12 pt-6">
              {ind.whatWeDo.slice(0, 3).map((w) => (
                <li
                  key={w}
                  className="flex gap-3 text-sm leading-relaxed text-grey"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                  {w}
                </li>
              ))}
            </ul>
            <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-gold">
              View industry
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        ))}
      </div>

      {/* controls: progress thumb + arrows (hidden under reduced motion) */}
      <div className="mt-8 flex items-center gap-6 motion-reduce:hidden">
        <div className="relative h-px flex-1 bg-gold/15">
          <div
            className="absolute inset-y-0 rounded-full bg-gold transition-[left,width] duration-200 ease-out"
            style={{ width: `${thumb.width}%`, left: `${thumb.left}%` }}
          />
        </div>
        <div className="flex gap-2.5">
          <SliderArrow
            dir="prev"
            disabled={atStart}
            onClick={() => scrollByCards(-1)}
          />
          <SliderArrow
            dir="next"
            disabled={atEnd}
            onClick={() => scrollByCards(1)}
          />
        </div>
      </div>
    </div>
  );
}

function SliderArrow({
  dir,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Previous industries" : "Next industries"}
      className={clsx(
        "flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 text-cream transition-[opacity,border-color,background-color,transform] duration-200 ease-out active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold",
        disabled
          ? "cursor-not-allowed opacity-30"
          : "hover:border-gold/60 hover:bg-gold/10",
      )}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
