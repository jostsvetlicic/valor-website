import type { Metadata } from "next";
import { Container } from "@/components/Container";
import PageHero from "@/components/PageHero";
import IndustrySlider from "@/components/industries/IndustrySlider";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "The verticals Valor builds for — real estate, automotive, hospitality, finance and large operational companies. One method — frontend, automation, operations, integration — shaped to what breaks in each.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Built for the businesses that{" "}
            <span className="text-gold">run on manual work.</span>
          </>
        }
        intro="The same method — a frontend that sells, automation, an operations system and the integration layer between them — shaped to what actually breaks in your industry."
      />

      <section className="pb-24 md:pb-32">
        <Container>
          <IndustrySlider />
        </Container>
      </section>

      <CtaBand
        eyebrow="Not sure where you fit?"
        title="Tell us how the work runs today."
        sub="A short call is the fastest way to map where the manual work is."
      />
    </>
  );
}
