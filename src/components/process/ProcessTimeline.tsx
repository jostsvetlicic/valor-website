"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { processStepsByLocale } from "@/content/process";
import type { Locale } from "@/i18n";
import { Reveal } from "@/components/Reveal";

/**
 * Vertical process timeline. A gold connecting line draws down as you scroll
 * (scroll-linked scaleY), and each step fades in as it scrolls into view.
 */
export default function ProcessTimeline({ locale = "en" }: { locale?: Locale }) {
  const processSteps = processStepsByLocale[locale];
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 65%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className="relative mx-auto max-w-3xl">
      {/* connecting line: a faint track with a gold fill that draws down */}
      <div
        aria-hidden="true"
        className="absolute bottom-3 left-[1.375rem] top-3 w-px bg-gold/15 md:left-8"
      >
        <motion.div
          className="timeline-fill absolute inset-x-0 top-0 h-full origin-top bg-gold"
          style={{ scaleY }}
        />
      </div>

      {processSteps.map((step) => (
        <li
          key={step.number}
          className="relative grid grid-cols-[auto_1fr] gap-6 pb-14 last:pb-0 md:gap-10"
        >
          <span
            className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-charcoal font-display text-base text-gold md:h-16 md:w-16 md:text-xl"
          >
            {step.number}
          </span>

          <Reveal className="pt-1 md:pt-3.5">
            <h2 className="font-display text-2xl font-semibold text-cream md:text-3xl">
              {step.title}
            </h2>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-grey">
              {step.body}
            </p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
