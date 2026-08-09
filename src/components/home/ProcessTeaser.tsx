"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { TextLink } from "@/components/Button";
import WelcomeVideo from "@/components/home/WelcomeVideo";
import { processSteps } from "@/content/process";
import { walkthroughVideo } from "@/config/media";

const ease = [0.16, 1, 0.3, 1] as const;

/** Condensed five-step process. Full detail lives on /process. */
export default function ProcessTeaser() {
  return (
    <Section tone="warm" edges className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="How we work" title="How a project actually runs." />
          <TextLink href="/process" className="shrink-0">
            The full process
          </TextLink>
        </div>

        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5"
        >
          {processSteps.map((step) => (
            <motion.li
              key={step.number}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
              }}
              className="border-t border-gold/15 pt-5"
            >
              <span className="font-display text-sm text-gold">
                {step.number}
              </span>
              <h3 className="mt-3 font-display text-xl font-medium text-cream">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-grey">
                {step.line}
              </p>
            </motion.li>
          ))}
        </motion.ol>

        {/* Loom walkthrough slot — hidden entirely until a URL is set in
            config/media.ts (walkthroughVideo.loomUrl). */}
        {walkthroughVideo.loomUrl && (
          <div className="mx-auto mt-16 max-w-4xl md:mt-20">
            <WelcomeVideo video={walkthroughVideo} label="Play the walkthrough" />
            {walkthroughVideo.caption && (
              <p className="mt-5 text-center text-sm leading-relaxed text-grey">
                {walkthroughVideo.caption}
              </p>
            )}
          </div>
        )}
      </Container>
    </Section>
  );
}
