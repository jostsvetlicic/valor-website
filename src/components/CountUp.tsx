"use client";

import { useEffect, useRef } from "react";

const DURATION_MS = 1400;

/**
 * The final number is what the server renders, so the stat is always correct
 * without JS. The count-up is layered on only when the stat starts off-screen.
 */
export default function CountUp({ number, suffix }: { number: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.textContent = `0${suffix}`;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION_MS);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = `${Math.round(number * eased)}${suffix}`;
          if (t < 1) frame = requestAnimationFrame(tick);
          else el.classList.add("stat-flash");
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [number, suffix]);

  return (
    <span ref={ref} aria-hidden="true">
      {`${number}${suffix}`}
    </span>
  );
}
