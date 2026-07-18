"use client";

import { motion } from "framer-motion";
import { Container } from "./Container";
import Sparkle from "./Sparkle";

/**
 * Shared hero band for interior pages — quieter than the homepage hero.
 */
export default function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-40 pb-16 md:pt-48 md:pb-24">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[50rem] -translate-x-1/2 bg-radial-gold opacity-70" />
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3">
            <Sparkle id="page-hero" className="h-6 w-6" />
            <span className="eyebrow">{eyebrow}</span>
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.03] tracking-tight text-cream sm:text-6xl md:text-7xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-grey md:text-xl">
              {intro}
            </p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
