import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Discovery, build, launch, optimise. The full Valor process and 14-day timeline — done for you, with the lightest possible lift on your side.",
};

const detail = [
  {
    number: "01",
    title: "Discovery",
    line: "We map your property, your channels, and where you are losing bookings.",
    body: "We start with a short call and a look at how enquiries reach you today — your website, your inboxes, the platforms taking a cut. We pinpoint exactly where guests slip away so everything we build is aimed at a real leak, not a guess.",
    days: "Days 1–3",
  },
  {
    number: "02",
    title: "Build",
    line: "We design and build your website and AI system — done for you.",
    body: "We design and build your direct-booking website and train your AI assistant on your property, your rules, and your tone. You review, we refine. The heavy lifting sits entirely with us.",
    days: "Days 3–12",
  },
  {
    number: "03",
    title: "Launch",
    line: "Live in 14 days, tested on every device and language.",
    body: "We take it live within 14 days, tested across phones, tablets, and desktops, and across the languages your guests actually speak. Nothing ships until it feels effortless.",
    days: "Day 14",
  },
  {
    number: "04",
    title: "Optimize",
    line: "We keep tuning it until it is answering and booking perfectly.",
    body: "Launch is the start, not the finish. We watch how real guests behave and keep tuning the replies, the flow, and the copy until it is answering and booking exactly as it should.",
    days: "Ongoing",
  },
];

const you = [
  "Introduce us to your property and your guests",
  "Share your existing photos, rates, and house rules",
  "Give feedback on one or two review rounds",
  "Then step back and let it run",
];

const valor = [
  "Audit where bookings are leaking today",
  "Design and build the website end to end",
  "Train, test, and launch the AI assistant",
  "Keep optimising after launch",
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How we work"
        title={
          <>
            Live in <span className="text-gradient-gold">14 days.</span> Done
            for you, start to finish.
          </>
        }
        intro="A calm, four-step process with almost no lift on your side. Here is exactly what happens, and who does what."
      />

      <Section tone="base" className="py-16 md:py-24">
        <Container>
          <div className="space-y-6">
            {detail.map((step, i) => (
              <Reveal
                key={step.number}
                delay={i * 0.04}
                className="grid gap-6 rounded-[2rem] border border-gold/12 bg-charcoal/40 p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10 md:p-10"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 font-display text-xl text-gold">
                  {step.number}
                </span>
                <div>
                  <h2 className="font-display text-2xl font-medium text-cream md:text-3xl">
                    {step.title}
                  </h2>
                  <p className="mt-3 max-w-2xl leading-relaxed text-grey">
                    {step.body}
                  </p>
                </div>
                <span className="text-sm uppercase tracking-[0.2em] text-gold md:text-right">
                  {step.days}
                </span>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="warm" edges className="py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="Who does what"
            title="You bring the property. We bring everything else."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <RevealGroup className="rounded-[2rem] border border-gold/12 bg-charcoal/40 p-8 md:p-10">
              <h3 className="eyebrow">Your part</h3>
              <ul className="mt-6 space-y-4">
                {you.map((item) => (
                  <RevealItem
                    key={item}
                    as="li"
                    className="flex gap-3.5 text-cream/85"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-grey" />
                    {item}
                  </RevealItem>
                ))}
              </ul>
            </RevealGroup>
            <RevealGroup className="rounded-[2rem] border border-gold/25 bg-charcoal/60 p-8 md:p-10">
              <h3 className="eyebrow">Valor&rsquo;s part</h3>
              <ul className="mt-6 space-y-4">
                {valor.map((item) => (
                  <RevealItem
                    key={item}
                    as="li"
                    className="flex gap-3.5 text-cream/90"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {item}
                  </RevealItem>
                ))}
              </ul>
            </RevealGroup>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Ready when you are"
        title="Start with a discovery call."
        sub="Fifteen focused minutes to see if we're the right fit."
      />
    </>
  );
}
