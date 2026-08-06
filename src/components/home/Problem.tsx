"use client";

import { motion } from "framer-motion";
import { Container, Eyebrow } from "@/components/Container";
import { Section } from "@/components/Section";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * The problem — written as observations, not sales copy. The section that
 * makes the visitor feel seen.
 */
const observations = [
  "Everything is typed in by hand, twice, into systems that do not talk to each other.",
  "Inquiries are answered in hours, or days. The buyer goes with whoever replies first.",
  "Service, payments, scheduling, inventory — all running separately.",
  "Nobody has one clear view of the business.",
];

export default function Problem() {
  return (
    <Section tone="warm" edges className="py-24 md:py-32">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>The reality today</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.02] tracking-tight text-cream text-balance">
            You already know where the time goes.
          </h2>
        </div>
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2"
        >
          {observations.map((o, i) => (
            <motion.li
              key={i}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="border-t border-gold/15 pt-6 font-display text-xl leading-snug text-cream/90 md:text-2xl"
            >
              {o}
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
