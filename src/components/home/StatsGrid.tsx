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
      className="grid gap-x-10 gap-y-14 md:grid-cols-2"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 26 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
          }}
          className="flex flex-col gap-4 border-t border-gold/15 pt-8 md:flex-row md:items-baseline md:gap-8"
        >
          <div className="font-display text-[clamp(3.4rem,8vw,6.5rem)] font-medium leading-[0.85] tracking-tight text-gradient-gold">
            {"prefix" in stat && stat.prefix}
            <CountUp
              to={stat.value}
              toEnd={"valueEnd" in stat ? stat.valueEnd : undefined}
            />
            {"suffix" in stat && stat.suffix}
          </div>
          <p className="max-w-[16rem] text-base leading-relaxed text-grey md:pb-3">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
