/**
 * VALOR — the process. One real sequence, shared by the /process timeline and
 * the homepage teaser. No delivery-time guarantees are stated anywhere.
 */

export type ProcessStep = {
  number: string;
  title: string;
  /** Condensed one-liner for the homepage teaser. */
  line: string;
  /** Fuller detail for the /process timeline. */
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Call",
    line: "Thirty minutes to find where the manual work is and what it costs.",
    body: "Thirty minutes. We find where the manual work is and what it costs. No deck.",
  },
  {
    number: "02",
    title: "Blueprint",
    line: "A paid technical blueprint you own — map, scope, architecture, fixed price.",
    body: "A paid technical blueprint: a system map, scope, architecture, timeline and a fixed price. You own it whether or not you build with us.",
  },
  {
    number: "03",
    title: "Build",
    line: "Interface, automation, operations and integration — in working increments.",
    body: "The interface, automation, operations and integration layers, delivered in working increments you can see — not a black box.",
  },
  {
    number: "04",
    title: "Launch",
    line: "Deployed, your team trained, real data migrated.",
    body: "Deployed, your team trained, and your real data migrated across.",
  },
  {
    number: "05",
    title: "Run",
    line: "Monitoring, iteration and new automation on retainer.",
    body: "Monitoring, iteration, and new automation on retainer.",
  },
];
