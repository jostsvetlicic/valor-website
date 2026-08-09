import { Container, Eyebrow } from "@/components/Container";
import { Section } from "@/components/Section";
import Hero from "@/components/home/Hero";
import BrandLogoBar from "@/components/home/BrandLogoBar";
import SelectedBuilds from "@/components/home/SelectedBuilds";
import WelcomeVideo from "@/components/home/WelcomeVideo";
import Problem from "@/components/home/Problem";
import Infrastructure from "@/components/home/Infrastructure";
import CapabilityGrid from "@/components/home/CapabilityGrid";
import IndustrySlider from "@/components/industries/IndustrySlider";
import ProcessTeaser from "@/components/home/ProcessTeaser";
import Reviews from "@/components/home/Reviews";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import { TextLink } from "@/components/Button";
import { welcomeVideo } from "@/config/media";

export default function HomePage() {
  return (
    <>
      {/* 1. HERO (nav lives in the root layout) */}
      <Hero />

      {/* 2. SELECTED BUILDS / BRAND LOGOS — credibility strip below the hero.
          Both render nothing until their flag + real content exist. */}
      <BrandLogoBar />
      <SelectedBuilds />

      {/* 3. WELCOME VIDEO — raised panel, caption to the side */}
      <Section id="welcome" tone="void" edges className="py-24 md:py-32">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.7fr_1fr] lg:gap-16">
            <WelcomeVideo />
            <div className="lg:pl-2">
              <Eyebrow>The 90-second version</Eyebrow>
              <p className="mt-5 font-display text-2xl font-medium leading-snug text-cream md:text-[1.7rem]">
                {welcomeVideo.caption}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. THE PROBLEM — observations, feel-seen */}
      <Problem />

      {/* 5. INFRASTRUCTURE — the core section */}
      <Infrastructure />

      {/* 6. HOW IT WORKS — condensed five-step process (+ optional Loom slot) */}
      <ProcessTeaser />

      {/* 7. WHAT'S POSSIBLE — capability grid */}
      <CapabilityGrid />

      {/* 8. INDUSTRIES — teaser slider linking to each vertical */}
      <Section tone="warm" edges className="py-24 md:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Industries"
              title="One method, shaped to your business."
            />
            <TextLink href="/industries" className="shrink-0">
              All industries
            </TextLink>
          </div>
          <div className="mt-14">
            <IndustrySlider />
          </div>
        </Container>
      </Section>

      {/* 9. CLIENT REVIEWS — renders nothing until FEATURES.reviews is on */}
      <Reviews />

      {/* 10. CLOSING CTA — one line, one button */}
      <CtaBand title="Let's map where the manual work is." />

      {/* Footer lives in the root layout */}
    </>
  );
}
