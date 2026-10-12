import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import ChapterNav from "@/components/home/ChapterNav";
import { brand } from "@/config/brand";
import { demoVideo, type VideoConfig } from "@/config/media";
import { alternates, type Locale } from "@/i18n";

// Below-fold components, code-split into separate JS chunks so the
// initial bundle only contains what's visible above the fold.
const WelcomeFilm = dynamic(() => import("@/components/home/WelcomeFilm"));
const Problem = dynamic(() => import("@/components/home/Problem"));
const Solution = dynamic(() => import("@/components/home/Solution"));
const SavingsCalculator = dynamic(() => import("@/components/SavingsCalculator"));
const HomeVideo = dynamic(() => import("@/components/home/HomeVideo"));
const WhoWeHelp = dynamic(() => import("@/components/home/WhoWeHelp"));
const WhatWeBuild = dynamic(() => import("@/components/home/WhatWeBuild"));
const ProcessTeaser = dynamic(() => import("@/components/home/ProcessTeaser"));
const GlobeSection = dynamic(() => import("@/components/home/GlobeSection"));
const CaseStudies = dynamic(() => import("@/components/home/CaseStudies"));
const References = dynamic(() => import("@/components/home/References"));
const Team = dynamic(() => import("@/components/home/Team"));
const Faq = dynamic(() => import("@/components/home/Faq"));
const ClosingCta = dynamic(() => import("@/components/home/ClosingCta"));

const hasSource = (v: VideoConfig) => (v.mode === "loom" ? !!v.loomUrl : !!v.mp4);

export function homeMetadata(locale: Locale): Metadata {
  if (locale === "en") return { alternates: alternates("/", "en") };
  const title = `VALOR | ${brand.taglineSl.replace(/\.$/, "")}`;
  return {
    title: { absolute: title },
    description: brand.descriptionSl,
    alternates: alternates("/", "sl"),
    openGraph: { title, description: brand.descriptionSl, locale: "sl_SI" },
  };
}

export function HomeView({ locale }: { locale: Locale }) {
  // The page reads as one story, in numbered chapters (see ChapterNav):
  // problem, answer, fit, cost, process, proof, people, questions, booking.
  return (
    <>
      <ChapterNav locale={locale} />

      {/* Nav and footer live in the layouts. Hero includes the client ticker. */}
      <Hero locale={locale} />

      {/* Welcome video, right after the client logos. */}
      <WelcomeFilm locale={locale} />

      {/* 01 The problem, then the answer: "We make it stop." */}
      <Problem locale={locale} />
      <Solution locale={locale} />

      {/* 02 What we build: six service groups. */}
      <WhatWeBuild locale={locale} />

      {/* 03 Who we help: the signs, plus the industries. */}
      <WhoWeHelp locale={locale} />

      {/* 04 What manual work costs today, from the visitor's own numbers. */}
      <SavingsCalculator locale={locale} />

      {/* Demo video appears once it has a real source in config/media.ts. */}
      {hasSource(demoVideo) && (
        <HomeVideo id="demo" label={locale === "sl" ? "Poglejte v praksi" : "See it in action"} video={demoVideo} />
      )}

      {/* 05 How we work, horizontal, draggable 5-step carousel. */}
      <ProcessTeaser locale={locale} />

      {/* 06 Proof: globe + verified numbers, then measured case studies
          (hidden until one is verified) and references (off until
          FEATURES.references is on). */}
      <GlobeSection locale={locale} />
      <CaseStudies locale={locale} />
      <References />

      {/* 07 Team */}
      <Team locale={locale} />

      {/* 08 Questions */}
      <Faq locale={locale} />

      {/* 09 Booking: the closing call to action (#book). */}
      <ClosingCta locale={locale} />
    </>
  );
}
