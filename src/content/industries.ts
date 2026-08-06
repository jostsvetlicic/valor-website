/**
 * VALOR — industries content.
 *
 * The single source of truth for every vertical. The index, the slider, the
 * homepage teaser and each /industries/[slug] page all render from here — no
 * hardcoded copy in components. Every line is a defensible capability claim;
 * there are no invented clients, metrics or certifications.
 */

export type Industry = {
  slug: string;
  /** Full name, used as the eyebrow / page title. */
  name: string;
  /** Short name for compact places (nav, cards). */
  shortName: string;
  /** The pain in one line — the hook that leads the card and the page. */
  tagline: string;
  /** What is broken today, in their words. */
  pains: string[];
  /** The deliverables. */
  whatWeDo: string[];
  /** The mechanism, plainly. */
  howWeDoIt: string[];
  /** What changes operationally — no invented numbers. */
  outcomes: string[];
  /** The single most impressive thing we can build here. */
  flagship?: string;
  /** Finance only: an explicit line on security, access control and audit. */
  securityNote?: string;
};

export const industries: Industry[] = [
  {
    slug: "real-estate",
    name: "Real estate agencies & developers",
    shortName: "Real estate",
    tagline: "The listings move, the paperwork does not.",
    pains: [
      "Listings maintained by hand across portals and the agency site.",
      "Inquiries sitting unanswered while the buyer contacts three other agencies.",
      "Viewings booked over phone tag.",
      "Contracts and documents retyped for every deal.",
      "No single view of which agent has which lead.",
    ],
    whatWeDo: [
      "Premium sales frontend with full listing search.",
      "Portal and listing sync.",
      "Instant inquiry response across web, email and WhatsApp.",
      "Viewing scheduler tied to agent calendars.",
      "Admin panel for listings, leads, deals and commissions.",
      "Client portal with document history.",
    ],
    howWeDoIt: [
      "One database is the source of truth for every listing.",
      "Everything else — the public site, the portals, the agent panel — reads from it.",
      "Inquiries are answered on arrival by an agent trained on the actual listing data, then routed to the right person with full context.",
    ],
    outcomes: [
      "Buyers get an answer immediately instead of the next business day.",
      "Listings updated once, everywhere.",
      "Agents stop retyping and start closing.",
      "Owners see the pipeline without asking for it.",
    ],
    flagship:
      "A full agency platform — public marketplace plus internal operating system — replacing the site, the spreadsheets and the manual portal uploads.",
  },
  {
    slug: "automotive",
    name: "Automotive dealerships",
    shortName: "Automotive",
    tagline: "The buyer goes to whoever replies first.",
    pains: [
      "Everything typed into the system by hand.",
      "Service, tyre changes, registration and payments running as separate, disconnected processes.",
      "Inquiries lost between the website and the inbox.",
      "No record the customer can see themselves.",
    ],
    whatWeDo: [
      "Sales frontend built to buy and sell vehicles.",
      "Instant inquiry and booking response, 24/7.",
      "Connected service, tyre, registration and payment flow in one place.",
      "Admin panel for customers, deals, stock, reporting and commissions.",
      "Customer mobile app with service and tyre-change history.",
      "Vehicle configurator — add parts and see the result before ordering.",
    ],
    howWeDoIt: [
      "We start where the manual work is, automate that first, then connect the next system.",
      "Stock, service and customer records live in one place, and every channel reads from it.",
    ],
    outcomes: [
      "Every inquiry answered on arrival.",
      "One record per customer instead of four.",
      "Staff stop double-entering.",
      "Service revenue becomes predictable because the customer is reminded automatically.",
    ],
    flagship:
      "A vehicle configurator plus a connected service-and-ownership app the customer keeps.",
  },
  {
    slug: "hospitality",
    name: "Hospitality — hotels & villas",
    shortName: "Hospitality",
    tagline: "Bookings do not wait for office hours.",
    pains: [
      "Direct inquiries arriving at night and answered the next morning, after the guest booked elsewhere.",
      "Commission bleeding to booking platforms.",
      "Availability managed in a spreadsheet.",
      "Guest questions repeated a hundred times a season.",
    ],
    whatWeDo: [
      "Direct booking frontend built to take the reservation without a platform in between.",
      "Instant multilingual inquiry response, 24/7.",
      "Availability and rate sync.",
      "Guest portal for pre-arrival, upsells and requests.",
      "Owner dashboard with occupancy and revenue.",
    ],
    howWeDoIt: [
      "The inquiry is answered in the guest's language within seconds, with real availability and real pricing.",
      "Then it is converted to a direct booking with payment collected on the spot.",
    ],
    outcomes: [
      "Late-night inquiries convert instead of expiring.",
      "A larger share of bookings arrive direct.",
      "Staff answer fewer repeat questions.",
    ],
    flagship:
      "A direct booking engine with automated multilingual guest handling, end to end.",
  },
  {
    slug: "finance",
    name: "Banking & financial services",
    shortName: "Finance",
    tagline: "Compliance is the constraint, not the excuse.",
    pains: [
      "Client onboarding running on paper and email.",
      "Document collection chased manually.",
      "Internal systems that cannot expose data to the people who need it.",
      "Reporting assembled by hand each month.",
    ],
    whatWeDo: [
      "Client onboarding and document-collection flows with a full audit trail.",
      "Internal portals over existing core systems.",
      "Document generation and review automation.",
      "Reporting and reconciliation dashboards.",
      "Secure client portals with role-based access.",
    ],
    howWeDoIt: [
      "We do not replace the core system. We build the layer on top of it that people actually use.",
      "Access control, logging and data residency are handled properly, integrating through the interfaces the core system already exposes.",
    ],
    outcomes: [
      "Onboarding measured in hours instead of weeks.",
      "Document chasing becomes automatic.",
      "Reporting stops being a manual monthly project.",
    ],
    flagship:
      "A compliant client-onboarding and document-automation layer over your existing core banking systems.",
    securityNote:
      "Security is the design constraint, not an afterthought: role-based access, full audit logging, and data residency handled to your requirements. We make no claim to any certification we do not hold.",
  },
  {
    slug: "enterprise",
    name: "Large operational companies",
    shortName: "Enterprise",
    tagline: "Ten systems, none of them talking.",
    pains: [
      "Departments running separate tools with no shared data.",
      "Work duplicated across teams.",
      "Reports that are out of date before they are read.",
      "Processes that only exist in one person's head.",
    ],
    whatWeDo: [
      "A systems audit mapping where time and data are lost.",
      "An integration layer between existing tools.",
      "Internal platforms and portals.",
      "Process automation for the highest-cost manual work.",
      "Custom dashboards per role.",
    ],
    howWeDoIt: [
      "We map the manual work first and rank it by cost.",
      "We automate the most expensive process, prove it, then move to the next.",
      "No eighteen-month rebuild before anything works.",
    ],
    outcomes: [
      "One source of truth.",
      "Manual handoffs removed one process at a time.",
      "Leadership sees current numbers instead of last month's.",
    ],
    flagship:
      "A full internal platform — custom CMS, portals, document automation and ERP integration.",
  },
  {
    slug: "other",
    name: "Every other operationally heavy business",
    shortName: "Everyone else",
    tagline: "Not on the list? The method still applies.",
    pains: [
      "The same data typed into different tools that do not talk.",
      "Business lost to whoever answers faster.",
      "No single, current view of how the operation is actually running.",
    ],
    whatWeDo: [
      "A frontend built to convert.",
      "Automation for your highest-cost manual work.",
      "The operations system your team actually runs on.",
      "Integration across the tools you already use.",
    ],
    howWeDoIt: [
      "We map where the manual work is and rank it by cost.",
      "We automate the most expensive process first, prove it, then move to the next.",
    ],
    outcomes: [
      "One source of truth.",
      "Manual work removed one process at a time.",
      "Answers and reporting that keep up with the business.",
    ],
    flagship: undefined,
  },
];

export const industrySlugs = industries.map((i) => i.slug);

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
