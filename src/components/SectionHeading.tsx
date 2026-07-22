"use client";

import { motion } from "framer-motion";
import { clsx } from "@/lib/clsx";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="eyebrow block"
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>
      {intro && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className={clsx(
            "mt-6 text-lg leading-relaxed text-grey",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}
