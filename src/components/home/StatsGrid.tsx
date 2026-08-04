"use client";

import { motion } from "framer-motion";
import { stats } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

const fmt = (n: number) => n.toLocaleString("en-US");

/**
 * Renders each figure as its TRUE value, statically — "15 to 25%",
 * "€1,500 to 2,500", "24/7", "0". These numbers are the content, so they are
 * correct on first paint and in screenshots; they never count up from zero
 * (which read as "we save you nothing" and looked broken). The only motion is
 * the quiet reveal of the whole row on scroll into view.
 */
function figure(stat: (typeof stats)[number]) {
  const prefix = "prefix" in stat ? stat.prefix : "";
  const suffix = "suffix" in stat ? stat.suffix : "";
  const range = "valueEnd" in stat ? ` to ${fmt(stat.valueEnd)}` : "";
  return `${prefix}${fmt(stat.value)}${range}${suffix}`;
}

export default function StatsGrid() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: 0.07 } } }}
      className="grid gap-x-10 gap-y-12 md:grid-cols-2"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
          }}
          className="flex flex-col gap-3 border-t border-gold/15 pt-8 lg:flex-row lg:items-baseline lg:gap-6"
        >
          {/* whitespace-nowrap keeps each figure (e.g. "€1,500 to 2,500")   */}
          {/* on a single line; the clamp is sized so it never overflows the  */}
          {/* column at any width, including beside its label on desktop.     */}
          <div className="shrink-0 whitespace-nowrap font-display text-[clamp(1.85rem,3vw,2.75rem)] font-medium leading-[0.95] tracking-tight text-gradient-gold tabular-nums">
            {figure(stat)}
          </div>
          <p className="min-w-0 max-w-[11rem] text-base leading-relaxed text-grey lg:pb-1.5">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
