"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scrolling, wired into GSAP's ScrollTrigger via a shared RAF loop.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    // Keep GSAP ScrollTrigger in sync if it is present.
    let cleanupGsap = () => {};
    (async () => {
      try {
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        lenis.on("scroll", ScrollTrigger.update);
        cleanupGsap = () => lenis.off("scroll", ScrollTrigger.update);
      } catch {
        /* ScrollTrigger not loaded — ignore */
      }
    })();

    return () => {
      cancelAnimationFrame(frame);
      cleanupGsap();
      lenis.destroy();
    };
  }, []);

  return null;
}
