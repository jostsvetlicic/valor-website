"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { clsx } from "@/lib/clsx";

type Mode = "single" | "group";

/**
 * Scroll reveals as progressive enhancement: the server HTML is always fully
 * visible. Only once JS runs is below-the-fold content hidden and then faded
 * in on entry, so a failed or stale script can never leave a section blank.
 * Styles live in globals.css under [data-reveal] / [data-reveal-group].
 */
function useReveal(mode: Mode, stagger: number) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    // Anything already on screen when JS arrives stays put, no flash.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;

    const attr = mode === "group" ? "revealGroup" : "reveal";
    if (mode === "group") {
      Array.from(el.children).forEach((child, i) =>
        (child as HTMLElement).style.setProperty("--i", String(i)),
      );
    }
    el.dataset[attr] = "hidden";

    let cleanup = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        el.dataset[attr] = "shown";
        // Hand styling back to the element's own classes (hover transitions etc.)
        const total = 700 + (mode === "group" ? el.children.length * stagger : 0);
        cleanup = window.setTimeout(() => delete el.dataset[attr], total);
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(cleanup);
    };
  }, [mode, stagger]);

  return ref;
}

type Tag =
  | "div"
  | "section"
  | "ul"
  | "ol"
  | "li"
  | "span"
  | "p"
  | "h2"
  | "h3"
  | "figure";

/** A single fade-and-rise reveal, once, when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
}) {
  const ref = useReveal("single", 0);
  const Tag = as as ElementType;
  const style = delay ? ({ "--reveal-delay": `${delay * 1000}ms` } as CSSProperties) : undefined;
  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}

/** Reveals its direct children one after another (short stagger). */
export function RevealGroup({
  children,
  className,
  stagger = 0.07,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: Tag;
}) {
  const ms = Math.round(stagger * 1000);
  const ref = useReveal("group", ms);
  const Tag = as as ElementType;
  return (
    <Tag ref={ref} className={className} style={{ "--stagger": `${ms}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
  hoverLift = false,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** Gently lifts the item on hover (for cards). */
  hoverLift?: boolean;
}) {
  const Tag = as as ElementType;
  return (
    <Tag
      className={clsx(
        hoverLift &&
          "transition-[translate,border-color] duration-300 ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
