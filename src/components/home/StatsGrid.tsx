"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";
import { stats } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

export default function StatsGrid() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
      className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 26 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
          }}
          className="border-t border-gold/15 pt-6"
        >
          <div className="font-display text-5xl font-medium leading-none tracking-tight text-gradient-gold md:text-6xl">
            {"prefix" in stat && stat.prefix}
            <CountUp
              to={stat.value}
              toEnd={"valueEnd" in stat ? stat.valueEnd : undefined}
            />
            {"suffix" in stat && stat.suffix}
          </div>
          <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-grey">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
