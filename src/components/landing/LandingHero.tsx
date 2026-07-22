"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import ParticleField from "@/components/ParticleField";
import { BookingButton } from "@/components/Button";
import Sparkle from "@/components/Sparkle";
import { landing } from "@/config/landing";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The /call hero. Same visual language as the homepage hero — gold particle
 * field, staggered reveal — but a single action: book a call.
 */
export default function LandingHero() {
  const { eyebrow, headline, subline, cta } = landing.hero;
  // Split the two-sentence headline so the second half carries the gold accent.
  const firstStop = headline.indexOf(". ");
  const headA =
    firstStop === -1 ? headline : headline.slice(0, firstStop + 1);
  const headB = firstStop === -1 ? "" : headline.slice(firstStop + 2);
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden">
      <ParticleField className="absolute inset-0 -z-10 h-full w-full" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.07] blur-[130px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-obsidian to-transparent" />

      <Container className="relative pt-10 text-center md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center justify-center gap-3"
        >
          <Sparkle id="call-hero" className="h-6 w-6" />
          <span className="eyebrow">{eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.15 }}
          className="mx-auto mt-7 max-w-4xl font-display text-[clamp(2.4rem,6vw,4.8rem)] font-medium leading-[1.02] tracking-tight text-cream"
        >
          {headA}{" "}
          {headB && <span className="text-gradient-gold">{headB}</span>}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.4 }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-grey md:text-xl"
        >
          {subline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.55 }}
          className="mt-10 flex justify-center"
        >
          <BookingButton label={cta} className="px-10 py-5 text-base" />
        </motion.div>
      </Container>
    </section>
  );
}
