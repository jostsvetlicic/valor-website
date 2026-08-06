import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Infrastructure from "@/components/home/Infrastructure";
import CapabilityGrid from "@/components/home/CapabilityGrid";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Infrastructure",
  description:
    "The four layers Valor builds — interface, automation, operations and integration — and the concrete capabilities inside each. The system your company runs on.",
};

export default function InfrastructurePage() {
  return (
    <>
      <PageHero
        eyebrow="Infrastructure"
        title={
          <>
            The system your company{" "}
            <span className="text-gold">runs on.</span>
          </>
        }
        intro="Four layers, built to work as one — from the public product your customers touch, down to the systems it quietly connects."
      />
      <Infrastructure />
      <CapabilityGrid />
      <CtaBand title="Let's map where the manual work is." />
    </>
  );
}
