/**
 * VALOR — /call landing page content & settings.
 *
 * This is the SINGLE place to edit everything on the /call page: copy, the
 * video paths, and the feature flags that switch whole sections on/off.
 *
 * FEATURE FLAGS
 *   Sections behind a flag render NOTHING until you flip the flag to `true`.
 *   Nothing is faked or mocked — enable a section only once you have the real
 *   content (a live chatbot, real case studies, real testimonials).
 */

import {
  IconWebsite,
  IconAssistant,
  IconSeo,
  IconAutomation,
} from "@/components/Icons";

export const landing = {
  /* ---------------------------------------------------------------- */
  /*  FEATURE FLAGS — default OFF. Flip to true when the real content   */
  /*  exists. While false, the section renders nothing at all.          */
  /* ---------------------------------------------------------------- */
  flags: {
    liveAgent: false, // 7. Live AI agent — needs a real embedded chat widget
    results: false, // 9. Results — needs real case studies
    testimonials: false, // 10. Testimonials — needs real quotes
  },

  /* ---------------------------------------------------------------- */
  /*  VIDEO — drop your files at these exact public paths.              */
  /*  Video : public/video/call.mp4     ->  served at /video/call.mp4   */
  /*  Poster: public/video/call-poster.jpg -> served at /video/...      */
  /*  Until the video file exists an elegant placeholder shows instead. */
  /* ---------------------------------------------------------------- */
  video: {
    src: "/video/call.mp4",
    poster: "/video/call-poster.jpg",
    caption:
      "Watch this before booking. It explains exactly how this works and whether it is right for your property.",
  },

  /* 2. HERO */
  hero: {
    eyebrow: "Premium websites & AI for hospitality",
    headline: "Every guest answered in 60 seconds. Every booking direct.",
    subline:
      "Premium websites and AI booking systems that turn your visitors into direct bookings, and stop you losing guests to slow replies.",
    cta: "Book a call",
  },

  /* 5. THE PROBLEM */
  problem: {
    eyebrow: "The problem",
    headline: "Your guests book whoever answers first. Right now, that isn't you.",
    points: [
      "Guests message several properties and book the one that replies fastest.",
      "Booking platforms take 15 to 25 percent of every reservation.",
      "Nobody answers at night, or in another language, so the booking is gone.",
    ],
  },

  /* 6. WHAT WE BUILD */
  build: {
    eyebrow: "What we build",
    cards: [
      {
        icon: IconWebsite,
        title: "Direct-Booking Website",
        line: "A premium site that turns visitors into direct bookings and cuts your commission.",
      },
      {
        icon: IconAssistant,
        title: "AI Booking Assistant",
        line: "Answers and books every guest in under 60 seconds, 24/7, in their language.",
      },
      {
        icon: IconSeo,
        title: "SEO and Google",
        line: "Get found in your area, more inquiries every month.",
      },
      {
        icon: IconAutomation,
        title: "Automation",
        line: "Every channel in one place. No missed messages, no manual work.",
      },
    ],
  },

  /* 7. LIVE AI AGENT (flag: liveAgent) */
  liveAgent: {
    eyebrow: "Try it yourself",
    headline: "Talk to the assistant, right now.",
    sub: "Ask it anything a guest would. See how it answers and books, in seconds.",
  },

  /* 8. HOW IT WORKS */
  how: {
    eyebrow: "How it works",
    steps: [
      {
        number: "01",
        title: "Discovery",
        line: "We map your property, your channels, and where you are losing bookings.",
      },
      {
        number: "02",
        title: "Build",
        line: "We design and build your website and AI system, done for you.",
      },
      {
        number: "03",
        title: "Launch",
        line: "Live in 14 days, tested on every device and language.",
      },
      {
        number: "04",
        title: "Optimize",
        line: "We keep tuning it until it is answering and booking perfectly.",
      },
    ],
  },

  /* 9. RESULTS (flag: results) */
  results: {
    eyebrow: "Results",
    headline: "The numbers speak for themselves.",
  },

  /* 10. TESTIMONIALS (flag: testimonials) */
  testimonials: {
    eyebrow: "In their words",
    headline: "Quietly making properties busier.",
  },

  /* 11. GUARANTEE */
  guarantee: {
    headline: "Live in 14 days, or you do not pay.",
    sub: "We launch your site and system within 14 days. If we do not, you pay nothing more until it is live. Then we keep optimizing until it is converting.",
  },

  /* 12. FINAL CTA */
  finalCta: {
    headline: "Ready to stop losing bookings?",
    cta: "Book a call",
    note: "Only 3 founding clients taken this month.",
  },
} as const;
