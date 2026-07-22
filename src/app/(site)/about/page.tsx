import type { Metadata } from "next";
import { Container } from "@/components/Container";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import Sparkle from "@/components/Sparkle";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Valor story — the standard we hold, and the bigger vision of building the AI infrastructure of tomorrow for hospitality.",
};

const principles = [
  {
    title: "Nothing ships that isn't beautiful",
    body: "Your property is a premium experience. The systems around it should feel the same — considered, calm, and quietly expensive.",
  },
  {
    title: "Speed is respect",
    body: "A guest who waits is a guest who leaves. Answering in seconds, at any hour, in their language, is the least we can do for them and for you.",
  },
  {
    title: "Direct is the future",
    body: "Every booking you own is a relationship you own. We build so the platforms become optional, not essential.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Valor"
        title={
          <>
            Built for hospitality.{" "}
            <span className="text-gradient-gold">
              Obsessed with the details.
            </span>
          </>
        }
        intro="Valor is an AI and web studio for hospitality. We build the websites and booking systems that let beautiful properties be booked as effortlessly as they deserve to be."
      />

      <section className="py-12 md:py-20">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-20">
            <Reveal className="space-y-6 text-lg leading-relaxed text-grey">
              <p>
                Valor started from a simple frustration: extraordinary
                properties losing bookings to whoever happened to reply first,
                and handing a quarter of their revenue to platforms in the
                process. The experience of staying was world-class. The
                experience of booking was anything but.
              </p>
              <p>
                So we set out to fix the whole path a guest travels — from the
                first search, to the first message, to the confirmed
                reservation. Premium websites that make direct the obvious
                choice. AI that answers in seconds, around the clock, in any
                language. Automation that means nothing is ever missed.
              </p>
              <p className="text-cream/90">
                The standard we hold is uncompromising: if it isn&rsquo;t fast,
                beautiful, and genuinely useful to a real guest at 2am, it
                isn&rsquo;t finished.
              </p>
            </Reveal>

            <Reveal
              delay={0.1}
              className="relative flex flex-col justify-center overflow-hidden rounded-[2rem] border border-gold/20 bg-charcoal/60 p-10"
            >
              <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold opacity-50" />
              <Sparkle id="about" className="h-10 w-10" />
              <p className="mt-6 font-display text-2xl italic leading-snug text-cream">
                &ldquo;We&rsquo;re not building websites. We&rsquo;re building
                the AI infrastructure the best properties of tomorrow will run
                on.&rdquo;
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
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
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <Reveal className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-gold/20 bg-charcoal/60 p-12 text-center md:p-16">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-gold opacity-50" />
            <span className="eyebrow">The bigger vision</span>
            <h2 className="mt-5 font-display text-3xl font-medium leading-tight tracking-tight text-cream sm:text-4xl md:text-5xl">
              The infrastructure of tomorrow, built today.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-grey">
              Hospitality is only the beginning. The same intelligence that
              answers a guest in 60 seconds will quietly run the businesses of
              the next decade. We intend to build it — carefully, beautifully,
              and for the people who care about their craft.
            </p>
          </Reveal>
        </Container>
      </section>

      <CtaBand
        title="Let's build yours."
        sub="Only 3 founding clients taken this month."
      />
    </>
  );
}
