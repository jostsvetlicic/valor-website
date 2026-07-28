"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";
import { stats } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The "loud" numbers moment — deliberately oversized figures filling the
 * width, with quiet supporting labels beside them, so the hierarchy of loud
 * and quiet reads as expensive. Gold is used ONLY on the numerals.
 */
export default function StatsGrid() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
      className="grid gap-x-10 gap-y-12 md:grid-cols-2"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 26 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
          }}
          className="flex flex-col gap-3 border-t border-gold/15 pt-8 lg:flex-row lg:items-baseline lg:gap-6"
        >
          {/* whitespace-nowrap keeps each figure (e.g. "€1,500 to 2,500")   */}
          {/* on a single line; the clamp is sized so it never overflows the  */}
          {/* column at any width, including beside its label on desktop.     */}
          <div className="shrink-0 whitespace-nowrap font-display text-[clamp(1.85rem,3vw,2.75rem)] font-medium leading-[0.95] tracking-tight text-gradient-gold tabular-nums">
            {"prefix" in stat && stat.prefix}
            <CountUp
              to={stat.value}
              toEnd={"valueEnd" in stat ? stat.valueEnd : undefined}
            />
            {"suffix" in stat && stat.suffix}
          </div>
          <p className="min-w-0 max-w-[11rem] text-base leading-relaxed text-grey lg:pb-1.5">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
