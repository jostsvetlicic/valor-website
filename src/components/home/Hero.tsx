"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import ParticleField from "@/components/ParticleField";
import { BookCallButton, MagneticButton } from "@/components/Button";
import Sparkle from "@/components/Sparkle";
import { clsx } from "@/lib/clsx";

const line1 = ["Every", "guest", "answered", "in", "60", "seconds."];
const line2 = ["Every", "booking", "direct."];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* particle field */}
      <ParticleField className="absolute inset-0 -z-10 h-full w-full" />
      {/* ambient glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.07] blur-[130px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-obsidian to-transparent" />

      <Container className="relative pt-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-3"
        >
          <Sparkle id="hero" className="h-6 w-6" />
          <span className="eyebrow">Premium websites & AI for hospitality</span>
        </motion.div>

        {/*
          Each word is its own inline-block so it can be transformed for the
          stagger, but the words are separated by REAL space text nodes (the
          " " between them). That keeps the headline's actual text correct —
          "Every guest answered in 60 seconds." — for selection, SEO and
          screen readers, and lets it wrap naturally at any width, instead of
          the old margin-only spacing that rendered as one long word.
        */}
        <h1 className="mt-7 max-w-5xl text-balance font-display text-[clamp(2.6rem,7vw,5.6rem)] font-medium leading-[1.02] tracking-tight text-cream">
          <span className="block">
            {line1.flatMap((word, i) => [
              <Word key={`a-${i}`} delay={0.12 + i * 0.05}>
                {word}
              </Word>,
              " ",
            ])}
          </span>
          <span className="mt-1 block">
            {line2.flatMap((word, i) => [
              <Word
                key={`b-${i}`}
                delay={0.12 + (line1.length + i) * 0.05}
                gold
              >
                {word}
              </Word>,
              " ",
            ])}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.58 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-grey md:text-xl"
        >
          Premium websites and AI booking systems that turn your visitors into
          direct bookings — and stop you losing guests to slow replies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.68 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <BookCallButton className="px-9 py-5 text-base" />
          <MagneticButton
            href="#services"
            variant="ghost"
            className="px-9 py-5 text-base"
          >
            See what we build
          </MagneticButton>
        </motion.div>
      </Container>

      {/* Static scroll cue — a quiet label over a thin gold hairline. No
          looping animation; it simply fades in with the rest of the hero. */}
      <motion.a
        href="#welcome"
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-grey transition-colors hover:text-cream sm:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-9 w-px bg-gradient-to-b from-gold/60 to-transparent" />
      </motion.a>
    </section>
  );
}

function Word({
  children,
  delay,
  gold,
}: {
  children: React.ReactNode;
  delay: number;
  gold?: boolean;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: "0.35em" }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay }}
      className={clsx("inline-block", gold && "text-gradient-gold")}
    >
      {children}
    </motion.span>
  );
}
