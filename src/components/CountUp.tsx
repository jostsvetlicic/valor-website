"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

const DURATION_MS = 1400;

/**
 * The final number is what the server renders, so the stat is always correct
 * without JS. The count-up is layered on top and replays on every entry.
 */
export default function CountUp({ number, suffix }: { number: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (prefersReducedMotion()) return;
    // Counts up from 0 each time the stat scrolls into view (down or up).
    // The real number stays in place at all other times, so a missed or
    // interrupted animation can never leave a 0 on screen.
    const final = `${number}${suffix}`;
    let armed = el.getBoundingClientRect().top >= window.innerHeight;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          // Fully off screen: the next entry counts again.
          cancelAnimationFrame(frame);
          el.textContent = final;
          el.classList.remove("stat-flash");
          armed = true;
          return;
        }
        if (!armed) return;
        armed = false;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION_MS);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = t < 1 ? `${Math.round(number * eased)}${suffix}` : final;
          if (t < 1) frame = requestAnimationFrame(tick);
          else el.classList.add("stat-flash");
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = final;
    };
  }, [number, suffix]);

  return (
    <span ref={ref} aria-hidden="true">
      {`${number}${suffix}`}
    </span>
  );
}
