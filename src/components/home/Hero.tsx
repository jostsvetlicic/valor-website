"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import OperationsFeed from "@/components/home/OperationsFeed";
import { BookCallButton } from "@/components/Button";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Homepage hero. Full viewport, obsidian black. The headline, subtext and CTA
 * sit quietly on the left; the signature element — a live operations feed that
 * looks like a business running itself around the clock — sits on the right
 * (below the text on mobile).
 */
export default function Hero() {
  return (
    <section className="surface-base relative flex min-h-[100svh] items-center overflow-hidden py-28 lg:py-24">
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          {/* Left: the quiet type */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="eyebrow"
            >
              AI infrastructure
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.08 }}
              className="mt-6 font-display text-[clamp(2.3rem,4.8vw,4.2rem)] font-medium leading-[1.03] tracking-tight text-cream text-balance"
            >
              <span className="block">We build the system</span>
              <span className="block">
                your company <span className="text-gold">runs on.</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.16 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-grey"
            >
              We fix the manual work inside real estate, hospitality, and other
              operationally heavy businesses — the backend, the CRM, the
              repetitive tasks, and the inquiries that never get answered fast
              enough.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.24 }}
              className="mt-10"
            >
              <BookCallButton className="px-9 py-5 text-base" />
            </motion.div>
          </div>

          {/* Right: the signature — a live operations feed */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
          >
            <OperationsFeed />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
