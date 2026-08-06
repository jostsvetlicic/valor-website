import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import Sparkle from "@/components/Sparkle";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Valor is an AI infrastructure company. The standard we hold, the way we work, and the bigger vision — building the systems the best businesses of the next decade will run on.",
};

const principles = [
  {
    title: "Start where the manual work is",
    body: "We map the manual work first and rank it by cost. Then we automate the most expensive process, prove it, and move to the next — no eighteen-month rebuild before anything works.",
  },
  {
    title: "One source of truth",
    body: "Everything reads from the same place — the public product, the operations panel, the integrations. Nothing gets typed in twice, and no one argues about which number is right.",
  },
  {
    title: "Build on what you already run",
    body: "We don't rip out your core systems. We build the layer on top of them that people actually use, and integrate through the interfaces they already expose.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Valor"
        title={
          <>
            We build the infrastructure,{" "}
            <span className="text-gold">not the buzzwords.</span>
          </>
        }
        intro="Valor is an AI infrastructure company. We build the software a business actually runs on — the frontend that sells, the automation behind it, the operations system your team works in, and the layer that connects the tools you already use."
      />

      <Section tone="base" className="py-20 md:py-28">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-20">
            <Reveal className="space-y-6 text-lg leading-relaxed text-grey">
              <p>
                Most companies do not have a software problem. They have a dozen
                tools that do not talk to each other, work typed in by hand
                twice, and no single, current view of how the operation is
                running.
              </p>
              <p>
                So we build the whole path instead of a single tool — from the
                interface a customer touches, to the automation that answers and
                follows up, to the operations system the team lives in, to the
                integration layer that ties the existing systems together. One
                system, not ten disconnected ones.
              </p>
              <p className="text-cream/90">
                The standard we hold is simple: if it is not faster, clearer, and
                genuinely less work for a real person on a real Tuesday, it is
                not finished.
              </p>
            </Reveal>

            <Reveal
              delay={0.1}
              className="relative flex flex-col justify-center overflow-hidden rounded-[2rem] border border-gold/20 bg-charcoal/60 p-10"
            >
              <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold opacity-50" />
              <Sparkle id="about" className="h-10 w-10" />
              <p className="mt-6 font-display text-2xl italic leading-snug text-cream">
                &ldquo;We&rsquo;re not building websites. We&rsquo;re building the
                infrastructure the best companies of the next decade will run
                on.&rdquo;
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="warm" edges className="py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="The standard"
            title="The principles we don't bend on."
          />
          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
            {principles.map((p) => (
              <RevealItem
                key={p.title}
                className="rounded-[1.75rem] border border-gold/12 bg-charcoal/40 p-8"
              >
                <Sparkle id={`prin-${p.title}`} className="h-7 w-7" />
                <h3 className="mt-6 font-display text-xl font-medium text-cream">
                  {p.title}
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-grey">
                  {p.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="void" glow edges className="py-20 md:py-28">
        <Container>
          <Reveal className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-gold/20 bg-charcoal/60 p-12 text-center md:p-16">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold opacity-50" />
            <span className="eyebrow">The bigger vision</span>
            <h2 className="mt-5 font-display text-3xl font-medium leading-tight tracking-tight text-cream sm:text-4xl md:text-5xl">
              The infrastructure of tomorrow, built today.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-grey">
              The same intelligence that answers a customer in seconds will
              quietly run the businesses of the next decade. We intend to build
              it — carefully, and for the people who care about how their
              business actually works.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CtaBand title="Let's build yours." />
    </>
  );
}
