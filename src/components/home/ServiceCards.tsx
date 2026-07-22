"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { services } from "@/data/site";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ServiceCards() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
      className="grid gap-6 sm:grid-cols-2"
    >
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <motion.div
            key={service.slug}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
            }}
          >
            <Link
              href={`/services#${service.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-gold/12 bg-charcoal/60 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/35 hover:shadow-[0_30px_80px_-30px_color-mix(in_oklab,var(--color-gold)_35%,transparent)]"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/25 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-obsidian">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="mt-7 font-display text-2xl font-medium text-cream">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-grey">
                {service.line}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gold">
                Learn more
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
