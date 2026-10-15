"use client";

/**
 * ScrollReveal, adapted from React Bits (https://github.com/DavidHDev/react-bits,
 * src/ts-tailwind), MIT + Commons Clause, (c) David Haz.
 *
 * Changes from the original: animations are scoped with gsap.context, so
 * cleanup no longer kills every ScrollTrigger on the page; the element is a
 * single configurable tag (the original nested a <p> inside an <h2>); no
 * built-in font size, so the site's type scale applies.
 *
 * As the block scrolls through the viewport each word goes from faint and
 * blurred to sharp, scrubbed to the scroll position.
 */

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Tag = "p" | "h2" | "h3" | "div";

export default function ScrollReveal({
  children,
  as = "p",
  className = "",
  // VALOR change: no blur by default. Animating a blur filter on every word
  // while scrolling forces a repaint each frame and makes scrolling stutter.
  enableBlur = false,
  baseOpacity = 0.12,
  blurStrength = 4,
  start = "top 85%",
  end = "top 35%",
}: {
  children: string;
  as?: Tag;
  className?: string;
  enableBlur?: boolean;
  baseOpacity?: number;
  blurStrength?: number;
  start?: string;
  end?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  const words = useMemo(
    () =>
      children.split(/(\s+)/).map((word, i) =>
        /^\s+$/.test(word) ? (
          word
        ) : (
          <span className="sr-word inline-block" key={i}>
            {word}
          </span>
        ),
      ),
    [children],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll<HTMLElement>(".sr-word");
      gsap.fromTo(
        targets,
        { opacity: baseOpacity, filter: enableBlur ? `blur(${blurStrength}px)` : "none" },
        {
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          stagger: 0.05,
          scrollTrigger: { trigger: el, start, end, scrub: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [baseOpacity, blurStrength, enableBlur, start, end]);

  const Component = as as "p";
  return (
    <Component ref={ref as React.RefObject<HTMLParagraphElement>} className={className}>
      {words}
    </Component>
  );
}
