import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import { FEATURES } from "@/config/features";
import ChapterNav from "@/components/home/ChapterNav";
import OfficialPartners from "@/components/home/OfficialPartners";
import { demoVideo, type VideoConfig } from "@/config/media";
import type { Locale } from "@/i18n";
import { seoMetadata } from "@/lib/seo";

// Below-fold components, code-split into separate JS chunks so the
// initial bundle only contains what's visible above the fold.
const WelcomeFilm = dynamic(() => import("@/components/home/WelcomeFilm"));
const Problem = dynamic(() => import("@/components/home/Problem"));
const Solution = dynamic(() => import("@/components/home/Solution"));
const SavingsCalculator = dynamic(() => import("@/components/SavingsCalculator"));
const HomeVideo = dynamic(() => import("@/components/home/HomeVideo"));
const WhoWeHelp = dynamic(() => import("@/components/home/WhoWeHelp"));
const GlobeSection = dynamic(() => import("@/components/home/GlobeSection"));
const CaseStudies = dynamic(() => import("@/components/home/CaseStudies"));
const References = dynamic(() => import("@/components/home/References"));
const Team = dynamic(() => import("@/components/home/Team"));
const Faq = dynamic(() => import("@/components/home/Faq"));
const ClosingCta = dynamic(() => import("@/components/home/ClosingCta"));

const hasSource = (v: VideoConfig) => (v.mode === "loom" ? !!v.loomUrl : !!v.mp4);

export function homeMetadata(locale: Locale): Metadata {
  return seoMetadata(locale, "home", "/");
}

export function HomeView({ locale }: { locale: Locale }) {
  // The page reads as one story, in numbered chapters (see ChapterNav):
  // problem, answer, fit, cost, process, proof, people, questions, booking.
  return (
    <>
      <ChapterNav locale={locale} />

      {/* Nav and footer live in the layouts. Hero includes the client ticker. */}
      <Hero locale={locale} />

      {/* Official partners strip (off on the live site until confirmed). */}
      <OfficialPartners locale={locale} />

      {/* Welcome video, right after the client logos. */}
      {FEATURES.welcomeFilm && <WelcomeFilm locale={locale} />}

      {/* 01 The problem, then the answer: "We make it stop." */}
      <Problem locale={locale} />
      <Solution locale={locale} />

      {/* 02 Who we help: the industries, plus the "Is this you?" check.
          (The service list lives on /services: everything is custom, so the
          homepage shows the problem, the answer and the fit instead.) */}
      <WhoWeHelp locale={locale} />

      {/* 03 What manual work costs today, from the visitor's own numbers. */}
      <SavingsCalculator locale={locale} />

      {/* Demo video appears once it has a real source in config/media.ts. */}
      {hasSource(demoVideo) && (
        <HomeVideo id="demo" label={locale === "sl" ? "Poglejte v praksi" : "See it in action"} video={demoVideo} />
      )}

      {/* 04 Proof: globe + verified numbers, then measured case studies
          (hidden until one is verified) and references (off until
          FEATURES.references is on). */}
      <GlobeSection locale={locale} />
      <CaseStudies locale={locale} />
      <References />

      {/* 05 Team */}
      <Team locale={locale} />

      {/* 06 Questions */}
      <Faq locale={locale} />

      {/* 07 Start: what happens after you book (the five process steps)
          and the booking button (#book). */}
      <ClosingCta locale={locale} />
    </>
  );
}
