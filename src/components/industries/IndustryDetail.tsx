"use client";

import { motion } from "framer-motion";
import { Container, Eyebrow } from "@/components/Container";
import { Section } from "@/components/Section";
import { BookCallButton } from "@/components/Button";
import type { Industry } from "@/content/industries";

const ease = [0.16, 1, 0.3, 1] as const;

/** A labelled two-column block: sticky label on the left, content on the right. */
function Part({
  eyebrow,
  title,
  tone,
  edges,
  children,
}: {
  eyebrow: string;
  title?: string;
  tone: "base" | "warm" | "panel" | "void";
  edges?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Section tone={tone} edges={edges} className="py-16 md:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>{eyebrow}</Eyebrow>
              {title && (
                <h2 className="mt-4 font-display text-2xl font-medium leading-tight tracking-tight text-cream md:text-3xl">
                  {title}
                </h2>
              )}
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">{children}</div>
        </div>
      </Container>
    </Section>
  );
}

/** Bullets that slide in from the left, staggered. */
function SlideList({ items }: { items: string[] }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: 0.07 } } }}
      className="space-y-4"
    >
      {items.map((item) => (
        <motion.li
          key={item}
          variants={{
            hidden: { opacity: 0, x: -24 },
            show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
          }}
          className="flex gap-4 border-t border-gold/12 pt-4 text-lg leading-relaxed text-cream/90 first:border-t-0 first:pt-0"
        >
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}

/** Plain fade-and-rise reveal for a block of lines. */
function FadeList({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: 0.06 } } }}
      className={className ?? "space-y-4"}
    >
      {items.map((item) => (
        <motion.li
          key={item}
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
          }}
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default function IndustryDetail({ industry }: { industry: Industry }) {
  return (
    <>
      {/* 1. THE PAIN — revealed first, in larger type */}
      <Section tone="base" className="py-16 md:py-24">
        <Container>
          <Eyebrow>What&rsquo;s broken today</Eyebrow>
          <div className="mt-8 max-w-4xl">
            <FadeList
              items={industry.pains}
              className="space-y-5 border-l border-gold/20 pl-6 md:pl-8"
            />
          </div>
        </Container>
      </Section>

      {/* 2. WHAT WE DO — bullets slide in from the left */}
      <Part eyebrow="What we do" title="The deliverables." tone="warm" edges>
        <SlideList items={industry.whatWeDo} />
      </Part>

      {/* 3. HOW WE DO IT — the mechanism, plainly */}
      <Part eyebrow="How we do it" title="The mechanism, plainly." tone="base">
        <FadeList
          items={industry.howWeDoIt}
          className="space-y-5 text-lg leading-relaxed text-grey"
        />
      </Part>

      {/* 4. WHAT CHANGES — operational outcomes */}
      <Part eyebrow="What changes" title="What actually changes." tone="warm" edges>
        <ul className="space-y-4">
          {industry.outcomes.map((o) => (
            <motion.li
              key={o}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease }}
              className="flex gap-4 text-lg leading-relaxed text-cream/90"
            >
              <span className="mt-1 shrink-0 text-gold">→</span>
              {o}
            </motion.li>
          ))}
        </ul>
      </Part>

      {/* 5. FLAGSHIP + (finance) the security line */}
      {(industry.flagship || industry.securityNote) && (
        <Section tone="panel" glow edges className="py-20 md:py-28">
          <Container>
            {industry.flagship && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease }}
                className="mx-auto max-w-4xl rounded-[2rem] border border-gold/25 bg-charcoal/60 p-10 text-center md:p-14"
              >
                <span className="eyebrow">Flagship build</span>
                <p className="mx-auto mt-6 max-w-3xl font-display text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-snug tracking-tight text-cream text-balance">
                  {industry.flagship}
                </p>
              </motion.div>
            )}

            {industry.securityNote && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease, delay: 0.05 }}
                className="mx-auto mt-8 max-w-2xl border-t border-gold/15 pt-8 text-center text-sm leading-relaxed text-grey"
              >
                {industry.securityNote}
              </motion.p>
            )}
          </Container>
        </Section>
      )}

      {/* Closing CTA */}
      <Section tone="void" glow className="py-24 md:py-32">
        <Container className="text-center">
          <h2 className="mx-auto max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] font-medium leading-tight tracking-tight text-cream text-balance">
            Let&rsquo;s map where the manual work is.
          </h2>
          <div className="mt-9 flex justify-center">
            <BookCallButton className="px-10 py-5 text-base" />
          </div>
        </Container>
      </Section>
    </>
  );
}
