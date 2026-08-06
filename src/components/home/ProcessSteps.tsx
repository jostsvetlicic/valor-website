"use client";

import { useEffect, useRef } from "react";
import { steps as defaultSteps } from "@/data/site";

type Step = { number: string; title: string; line: string };

/**
 * The four-step process row with a gold connecting line that draws in on
 * scroll (GSAP ScrollTrigger). Falls back to a static line if GSAP or
 * reduced-motion prevent the animation. Steps default to the shared site
 * copy but can be passed in (e.g. a condensed set for a teaser).
 */
export default function ProcessSteps({
  steps = defaultSteps as readonly Step[],
}: {
  steps?: readonly Step[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      if (lineRef.current) lineRef.current.style.transform = "scaleX(1)";
      return;
    }

    let ctx: { revert: () => void } | undefined;
    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const gsap = gsapMod.default ?? gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 75%",
              end: "bottom 60%",
              scrub: 1,
            },
          },
        );
        gsap.utils
          .toArray<HTMLElement>(".process-step")
          .forEach((el, i) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 28 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 85%" },
                delay: i * 0.05,
              },
            );
          });
      }, rootRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative mt-16">
      {/* connecting line (desktop) */}
      <div className="pointer-events-none absolute left-0 right-0 top-8 hidden md:block">
        <div className="relative mx-[12.5%] h-px bg-gold/12">
          <span
            ref={lineRef}
            className="absolute inset-0 origin-left bg-gradient-to-r from-gold via-gold-light to-gold"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      <ol className="grid gap-12 md:grid-cols-4 md:gap-6">
        {steps.map((step) => (
          <li key={step.number} className="process-step relative">
            <div className="flex items-center gap-4 md:flex-col md:items-start">
              <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-charcoal font-display text-xl text-gold">
                {step.number}
              </span>
            </div>
            <h3 className="mt-6 font-display text-2xl font-medium text-cream">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-grey">
              {step.line}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
