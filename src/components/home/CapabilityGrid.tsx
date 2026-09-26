"use client";

import { motion } from "framer-motion";
import { Container, Eyebrow } from "@/components/Container";
import { Section } from "@/components/Section";

const ease = [0.16, 1, 0.3, 1] as const;

/** Concrete capabilities — one line each. Expand as more become obviously true. */
const capabilities = [
  { title: "Instant inquiry response", detail: "24/7, across web, email and WhatsApp." },
  { title: "Listing & inventory sync", detail: "Updated once, everywhere, automatically." },
  { title: "Document & contract generation", detail: "Drafted, filled and sent on their own." },
  { title: "Booking & viewing scheduling", detail: "Tied to the right calendars." },
  { title: "Payment collection & reconciliation", detail: "Collected on the spot, reconciled automatically." },
  { title: "Client portal", detail: "Full history, self-service." },
  { title: "Internal admin panel", detail: "The one that replaces the spreadsheets." },
  { title: "Reporting & forecasting", detail: "Dashboards that stay current." },
  { title: "Multilingual sales frontend", detail: "Built to convert, in every language." },
  { title: "Product & vehicle configurator", detail: "See it before you order it." },
  { title: "Mobile app", detail: "Per-user login and service history." },
  { title: "Data migration", detail: "Off the legacy systems, cleaned up." },
  { title: "Lead scoring & routing", detail: "The right lead to the right person." },
  { title: "Automated follow-up", detail: "Sequences that never let an enquiry go cold." },
];

export default function CapabilityGrid() {
  return (
    <Section tone="panel" edges glow className="py-24 md:py-32">
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>What&rsquo;s possible</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4rem)] font-medium leading-[1.02] tracking-tight text-cream text-balance">
            A concrete list of what we build.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-grey text-pretty">
            Pick the ones that map to your operation. Most businesses need six
            or seven of them, working as one system.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ show: { transition: { staggerChildren: 0.04 } } }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {capabilities.map((c, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
              }}
              className="group glass-card rounded-2xl border border-white/[0.07] bg-charcoal/40 p-6 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-gold/35 hover:shadow-[0_8px_32px_-8px_rgba(201,162,75,0.15)] motion-reduce:hover:translate-y-0"
            >
              <h3 className="font-display text-lg font-medium text-cream">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-grey">{c.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
