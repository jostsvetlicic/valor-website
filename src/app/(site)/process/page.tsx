import type { Metadata } from "next";
import { Container } from "@/components/Container";
import PageHero from "@/components/PageHero";
import ProcessTimeline from "@/components/process/ProcessTimeline";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How a Valor project actually runs — call, blueprint, build, launch, run. Delivered in working increments you can see, starting with a paid technical blueprint you own.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Process"
        title={
          <>
            How a project <span className="text-gold">actually runs.</span>
          </>
        }
        intro="Five steps, from the first call to a system that keeps improving — delivered in working increments you can see, not a black box."
      />

      <section className="pb-24 md:pb-32">
        <Container>
          <ProcessTimeline />
        </Container>
      </section>

      <CtaBand
        title="Start with a call."
        sub="Thirty minutes to find where the manual work is and what it costs."
      />
    </>
  );
}
