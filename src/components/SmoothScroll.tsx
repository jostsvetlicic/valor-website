"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scrolling (https://github.com/darkroomengineering/lenis),
 * synced with GSAP ScrollTrigger (https://github.com/greensock/GSAP).
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Runs for everyone, including the OS "reduce motion" setting: smoothing
    // the wheel is not large on-screen movement, and without it the site
    // feels stiff (owner's call, 15 Oct 2026).
    const lenis = new Lenis({
      // Lenis's standard smoothing: each frame moves 10% of the way to the
      // target, which reads as soft and even at any wheel speed.
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Native scroll on touch, smoothing wheel only avoids the mushy,
      // laggy feel on phones where the OS already handles momentum.
      syncTouch: false,
    });

    // Shared so other code (e.g. LocaleScrollRestore) can jump without Lenis
    // easing back to its own stale target.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Until GSAP arrives, Lenis runs on its own animation frame loop.
    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    // Then one shared clock: GSAP's ticker drives Lenis and ScrollTrigger in
    // the same frame (the setup the Lenis docs recommend), so scroll-linked
    // animations never lag a frame behind the page. GSAP is loaded after
    // first paint so it never weighs on the initial bundle.
    let alive = true;
    let detach: (() => void) | undefined;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (!alive) return;
      gsap.registerPlugin(ScrollTrigger);
      cancelAnimationFrame(frame);
      // Same clock as the frame loop above, so the hand-over has no jump.
      const tick = () => lenis.raf(performance.now());
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      const off = lenis.on("scroll", ScrollTrigger.update);
      detach = () => {
        gsap.ticker.remove(tick);
        if (typeof off === "function") off();
      };
    });

    // Lenis doesn't intercept in-page hash links, so a plain <a href="#id">
    // (e.g. the hero's "See what we build") wouldn't scroll. Handle those here
    // and leave room for the fixed nav. Links to other routes are untouched.
    const NAV_OFFSET = -140;
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: NAV_OFFSET });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onAnchorClick);

    // Honour a hash the visitor lands on directly (e.g. /#infrastructure).
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        requestAnimationFrame(() =>
          lenis.scrollTo(target as HTMLElement, {
            offset: NAV_OFFSET,
            immediate: true,
          }),
        );
      }
    }

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onAnchorClick);
      alive = false;
      detach?.();
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
