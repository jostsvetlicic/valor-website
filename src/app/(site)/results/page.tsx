import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import { RevealGroup, RevealItem } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Results",
  description:
    "The measures Valor holds itself to on every direct-booking website and AI booking system — reply time, direct bookings, and commission saved.",
};

// What we WILL publish here, stated honestly — no fabricated numbers, no empty
// "—" placeholders. Real founding-client figures replace this once they're in.
const measures = [
  {
    label: "Reply time",
    body: "How fast every guest enquiry is answered — day, night, and in their language.",
  },
  {
    label: "Direct bookings",
    body: "Reservations taken directly through your own site, with no platform commission.",
  },
  {
    label: "Commission saved",
    body: "Revenue kept in your pocket each month instead of handed to the booking platforms.",
  },
];

export default function ResultsPage() {
  return (
    <>
      <PageHero
        eyebrow="Results"
        title={
          <>
            The numbers, once they&rsquo;re in.{" "}
            <span className="text-gradient-gold">Measured, not promised.</span>
          </>
        }
        intro="We're building our first founding case studies now. When they land, this is exactly where the measured results will live — no rounded-up marketing figures, only what actually happened."
      />

      <Section tone="warm" edges className="py-20 md:py-28">
        <Container>
          <SectionHeading
            eyebrow="What we measure"
            title="The three numbers we hold ourselves to."
            intro="Every engagement is judged on the same measures. These are the ones that decide whether the work paid for itself."
          />
          <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
            {measures.map((m) => (
              <RevealItem
                key={m.label}
                hoverLift
                className="flex h-full flex-col rounded-[1.75rem] border border-gold/12 bg-charcoal/50 p-8 transition-colors duration-300 ease-out hover:border-gold/30"
              >
                <h3 className="font-display text-2xl font-medium text-cream">
                  {m.label}
                </h3>
                <p className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-grey">
                  {m.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Be one of the first"
        title="Want your property here?"
        sub="Only 3 founding clients taken this month."
      />
    </>
  );
}
