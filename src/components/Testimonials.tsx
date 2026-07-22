"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Testimonials() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: 0.14 } } }}
      className="grid gap-6 md:grid-cols-3"
    >
      {testimonials.map((t, i) => (
        <motion.figure
          key={i}
          variants={{
            hidden: { opacity: 0, y: 28 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
          }}
          className="relative flex flex-col rounded-[1.75rem] border border-gold/12 bg-charcoal/50 p-8"
        >
          <span className="font-display text-5xl leading-none text-gold/40">
            &ldquo;
          </span>
          <blockquote className="mt-2 flex-1 text-lg leading-relaxed text-cream/90">
            {t.quote}
          </blockquote>
          <figcaption className="mt-8 border-t border-gold/12 pt-5">
            <div className="font-display text-lg text-cream">{t.name}</div>
            <div className="mt-1 text-sm text-grey">{t.property}</div>
          </figcaption>
        </motion.figure>
      ))}
    </motion.div>
  );
}
