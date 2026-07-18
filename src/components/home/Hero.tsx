"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import ParticleField from "@/components/ParticleField";
import { BookCallButton, MagneticButton } from "@/components/Button";
import Sparkle from "@/components/Sparkle";

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
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center gap-3"
        >
          <Sparkle id="hero" className="h-6 w-6" />
          <span className="eyebrow">Premium websites & AI for hospitality</span>
        </motion.div>

        <h1 className="mt-7 max-w-5xl font-display text-[clamp(2.6rem,7vw,5.6rem)] font-medium leading-[0.98] tracking-tight text-cream">
          <span className="block">
            {line1.map((word, i) => (
              <Word key={word + i} delay={0.15 + i * 0.09}>
                {word}
              </Word>
            ))}
          </span>
          <span className="mt-2 block">
            {line2.map((word, i) => (
              <Word
                key={word + i}
                delay={0.15 + (line1.length + i) * 0.09}
                gold
              >
                {word}
              </Word>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.05 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-grey md:text-xl"
        >
          Premium websites and AI booking systems that turn your visitors into
          direct bookings — and stop you losing guests to slow replies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.2 }}
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

      {/* scroll cue */}
      <motion.a
        href="#welcome"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-grey"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative flex h-9 w-[1px] overflow-hidden bg-gold/20">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-gold"
            animate={{ y: ["-12px", "36px"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
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
    <span className="mr-[0.28em] inline-block overflow-hidden align-bottom">
      <motion.span
        className={gold ? "inline-block text-gradient-gold" : "inline-block"}
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.85, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}
