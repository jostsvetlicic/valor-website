"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { processSteps } from "@/content/process";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Vertical process timeline. A gold connecting line draws down as you scroll
 * (scroll-linked scaleY), and each step fades and scales in as it reaches the
 * centre of the viewport. Under prefers-reduced-motion the line is drawn in
 * full and static, and Framer suppresses the transforms — the sequence is
 * simply presented, not animated.
 */
export default function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
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
          className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-gold to-gold-light"
          style={{ scaleY: reduce ? 1 : scaleY }}
        />
      </div>

      {processSteps.map((step) => (
        <li
          key={step.number}
          className="relative grid grid-cols-[auto_1fr] gap-6 pb-14 last:pb-0 md:gap-10"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40% 0px -40% 0px" }}
            transition={{ duration: 0.4, ease }}
            className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-charcoal font-display text-base text-gold md:h-16 md:w-16 md:text-xl"
          >
            {step.number}
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease }}
            className="pt-1 md:pt-3.5"
          >
            <h2 className="font-display text-2xl font-medium text-cream md:text-3xl">
              {step.title}
            </h2>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-grey">
              {step.body}
            </p>
          </motion.div>
        </li>
      ))}
    </ol>
  );
}
