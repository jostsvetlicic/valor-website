import {
  IconAssistant,
  IconAutomation,
  IconSeo,
  IconWebsite,
} from "@/components/Icons";

export const services = [
  {
    slug: "direct-booking-websites",
    icon: IconWebsite,
    title: "Direct-Booking Websites",
    line: "Premium sites that turn visitors into direct bookings and cut your commission.",
    outcome: "More direct bookings. Less commission. A brand that looks the part.",
    included: [
      "Bespoke, conversion-focused design tuned to your property",
      "Built-in direct booking flow, no third-party redirect",
      "Lightning-fast, mobile-perfect, and SEO-ready from day one",
      "Multi-language ready for international guests",
      "Photography direction and copy that sells the experience",
    ],
  },
  {
    slug: "ai-booking-assistant",
    icon: IconAssistant,
    title: "AI Booking Assistant",
    line: "Answers and books every guest in under 60 seconds, 24/7, in their language.",
    outcome: "Every enquiry answered instantly, every hour, in any language.",
    included: [
      "Replies to every guest in under 60 seconds, day or night",
      "Speaks your guests' language automatically",
      "Answers questions, checks availability, and takes the booking",
      "Trained on your property, your rules, and your tone",
      "Hands over to you cleanly when a human touch is needed",
    ],
  },
  {
    slug: "seo-and-google",
    icon: IconSeo,
    title: "SEO & Google",
    line: "Get found in your area, with more inquiries every month.",
    outcome: "Steady, compounding visibility where your guests are searching.",
    included: [
      "Local SEO so you rank where guests are searching",
      "Google Business Profile set up and optimised",
      "Fast, technically clean pages Google loves",
      "Content built around what your guests actually search for",
      "Ongoing tuning as the results come in",
    ],
  },
  {
    slug: "automation",
    icon: IconAutomation,
    title: "Automation",
    line: "Every channel in one place, no missed messages, no manual work.",
    outcome: "One tidy inbox. Nothing slips. No busywork.",
    included: [
      "All your channels — web, WhatsApp, Instagram, email — in one place",
      "Automatic follow-ups so no enquiry goes cold",
      "Bookings and guest details synced where you need them",
      "Alerts for the moments that genuinely need you",
      "Workflows shaped around how you already work",
    ],
  },
] as const;

export const steps = [
  {
    number: "01",
    title: "Discovery",
    line: "We map your property, your channels, and where you are losing bookings.",
  },
  {
    number: "02",
    title: "Build",
    line: "We design and build your website and AI system — done for you.",
  },
  {
    number: "03",
    title: "Launch",
    line: "Tested on every device and in every language before it goes live.",
  },
  {
    number: "04",
    title: "Optimize",
    line: "We keep tuning it until it is answering and booking perfectly.",
  },
] as const;

export const stats = [
  {
    value: 15,
    valueEnd: 25,
    suffix: "%",
    label: "commission kept on every direct booking",
  },
  {
    value: 1500,
    valueEnd: 2500,
    prefix: "€",
    label: "saved each month versus a receptionist",
  },
  {
    value: 24,
    suffix: "/7",
    label: "every guest answered, in under 60 seconds",
  },
  {
    value: 0,
    suffix: "",
    label: "bookings lost to slow replies",
  },
] as const;

export const trustStats = [
  { value: "60 sec", label: "reply" },
  { value: "24/7", label: "always on" },
  { value: "15–25%", label: "commission saved" },
] as const;

export const problems = [
  {
    title: "They book the fastest reply",
    body: "Guests message several properties at once and book whoever answers first. If that isn't you, the booking is already gone.",
  },
  {
    title: "Platforms take 15–25%",
    body: "Every reservation through a booking platform quietly hands over 15 to 25 percent of your revenue in commission.",
  },
  {
    title: "Nobody answers at night",
    body: "No reply after hours or in another language means the guest simply moves on — and you never even knew they came.",
  },
] as const;

/**
 * Real client testimonials ONLY. Empty until we have genuine quotes: the UI
 * hides the whole testimonials section while this is empty, because to a
 * prospect a visible "Client name / placeholder" quote reads as "no clients".
 * Empty beats visibly fake. Add objects of the shape below to switch it on:
 *   { quote: "…", name: "Real name", property: "Property · City" }
 */
export const testimonials: {
  quote: string;
  name: string;
  property: string;
}[] = [];
