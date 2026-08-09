"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import SystemDiagram from "@/components/home/SystemDiagram";
import { BookCallButton } from "@/components/Button";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Homepage hero. Full viewport, obsidian black, with the ambient system
 * diagram drawing in behind the type. The type itself stays deliberately
 * quiet — the diagram is the one bold element on the page.
 */
export default function Hero() {
  return (
    <section className="surface-base relative flex min-h-[100svh] items-center overflow-hidden">
      <SystemDiagram className="pointer-events-none absolute inset-0 z-0" />

      {/* Soft central darkening + bottom fade so the type stays legible over  */}
      {/* the diagram and the section melts into the one below. These sit above */}
      {/* the diagram (z-[1]) but below the type (z-10).                        */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-obsidian/25 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-64 bg-gradient-to-t from-obsidian to-transparent" />

      <Container className="relative z-10 pt-28">
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
          className="mt-6 max-w-4xl font-display text-[clamp(2.6rem,7vw,5.4rem)] font-medium leading-[1.02] tracking-tight text-cream text-balance"
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
          className="mt-7 max-w-2xl text-lg leading-relaxed text-grey md:text-xl"
        >
          We fix the manual work inside real estate, hospitality, and other
          operationally heavy businesses — the backend, the CRM, the repetitive
          tasks, and the inquiries that never get answered fast enough.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.24 }}
          className="mt-10"
        >
          <BookCallButton className="px-9 py-5 text-base" />
        </motion.div>
      </Container>
    </section>
  );
}
