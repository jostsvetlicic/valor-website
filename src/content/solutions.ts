/**
 * VALOR, /solutions content. Adapted from the "solutions-en" and "resitve-sl"
 * source pages. Solution 06 (dealer) is translated from the English version,
 * because the Slovenian source describes a different dealer product.
 *
 * `reference` holds client/reference claims and status badges from the source
 * material. They render only when FEATURES.solutionReferences is true, turn it
 * on only once VALOR can stand behind each reference.
 * // TODO: real content required, confirm which references VALOR may claim.
 */

import type { Dict } from "@/i18n";

export type SolutionReference = {
  status: string;
  text: string;
  /** Replaces the generic savings note when references are shown. */
  note?: string;
  /** Replaces the generic savings label when references are shown. */
  savingsLabel?: string;
};

export type Solution = {
  id: string;
  kicker: string;
  name: string;
  /** Neutral one-paragraph description (not a client reference). */
  summary?: string;
  pain: { headline: string; body: string };
  result: { headline: string; body: string };
  steps: { title: string; text: string }[];
  savingsLabel: string;
  savings: string[];
  savingsNote: string;
  automatic: string[];
  approve: string[];
  bestFit: string[];
  before: string;
  after: string;
  reference?: SolutionReference;
};

export type SampleLead = {
  intro: string;
  score: number;
  fields: { key: string; value: string; ok?: boolean }[];
  signalKey: string;
  signal: string;
  caption: string;
};

export type GuideItem = { title: string; text: string };

const solutionsEn: Solution[] = [
  {
    id: "sales",
    kicker: "Solution 01 · Growth",
    name: "AI Sales Engine",
    pain: {
      headline:
        "Salespeople spend their day searching for new clients, checking the status of leads, and following up to close deals, not selling.",
      body: "Every week, sales teams lose hours to three tasks that should not require human attention: finding new leads worth contacting, tracking where each conversation currently stands, and writing follow-ups to keep deals moving. The more leads in the pipeline, the more time disappears into tracking and administration instead of actual selling.",
    },
    result: {
      headline:
        "The system finds suitable companies, verifies contacts, sends a relevant first message, watches replies, and keeps every opportunity in one clear stage.",
      body: "The added value is in the criteria. Before the system contacts anyone, it defines what a good lead looks like for your business and scores every company against those parameters. This is what makes the results useful rather than generic. A typical match rate is 70 to 80 percent. The salesperson receives a qualified lead with a specific reason for contact, ready for a real conversation.",
    },
    steps: [
      { title: "Find", text: "Companies matching your approved criteria" },
      {
        title: "Verify",
        text: "Contacts and signal evidence from public sources",
      },
      { title: "Reach out", text: "Personalised, brand-safe first message" },
      { title: "Hand off", text: "Qualified reply goes to a salesperson" },
    ],
    savingsLabel: "Savings to measure",
    savings: [
      "Less time spent searching for new clients and verifying contacts manually",
      "More focused conversations. Leads are pre-qualified before the salesperson calls.",
      "Fewer wasted calls on contacts who are not ready or not relevant",
    ],
    savingsNote:
      "Exact savings depend on your industry, current process, and lead volume. We estimate together before launch. No specific number applies to every business.",
    automatic: [
      "Find companies matching your approved criteria",
      "Verify contact availability from public sources",
      "Log replies and update pipeline stage",
      "Send follow-up reminders on open leads",
    ],
    approve: [
      "Review and approve campaigns before sending",
      "Handle uncertain or sensitive replies personally",
      "Manage pricing and negotiation yourself",
    ],
    bestFit: [
      "B2B services",
      "Equipment & machinery",
      "Real estate",
      "Wholesale",
    ],
    before: "3 to 4 hours to find one qualified lead",
    after: "8 seconds. AI-qualified, verified, and ready.",
    reference: {
      status: "Live · Fable Labs",
      text: "Reference: built and tested on Fable Labs' own outreach process. Data and results are ours, available for review.",
    },
  },
  {
    id: "market",
    kicker: "Solution 02 · Market entry",
    name: "AI Market Intelligence",
    pain: {
      headline:
        "Business development teams spend their time building contact lists, researching which companies to approach, and writing outreach that arrives at the wrong moment or to the wrong person.",
      body: "Generic contact lists give you names. They do not show which company is actively expanding, publishing a new tender, or changing suppliers right now. Teams reach out at random, to the same targets every competitor approaches, with no timing advantage and no specific reason to be heard.",
    },
    result: {
      headline:
        "A short, evidence-backed list of companies with a specific reason to reach out today.",
      body: "The system defines what a qualified target looks like for your business, then monitors public sources continuously for companies that match and are showing active signals. Every target delivered comes with a dated, verifiable reason for contact: an expansion announcement, a new tender, a leadership change. The team knows who to contact, why now, and what to open with.",
    },
    steps: [
      { title: "Define", text: "Target market and partner profile" },
      { title: "Detect", text: "Expansion, tender, or investment signals" },
      { title: "Qualify", text: "Fit, timing, and decision route" },
      { title: "Deliver", text: "Evidence-backed target brief" },
    ],
    savingsLabel: "Savings to measure",
    savings: [
      "Less time cleaning generic lists of companies that aren't worth calling",
      "First conversations arrive at the right moment, not at random",
      "Shorter route to the actual decision-maker",
    ],
    savingsNote: "Your scope is adapted to your market.",
    automatic: [
      "Monitor public market signals continuously",
      "Collect and organise source evidence",
      "Remove duplicates and obvious mismatches",
    ],
    approve: [
      "Approve the target profile and exclusions",
      "Validate strategic fit",
      "Choose the relationship approach per target",
    ],
    bestFit: ["Market entry", "Distribution", "Partnerships", "Investment"],
    before: "Weeks of research on lists that go stale before you make the call",
    after:
      "Companies actively expanding, with a specific reason to reach out today.",
    reference: {
      status: "Delivered · NDA",
      text: "Reference: market-entry research for a distributor in the automotive industry. Delivered July 2026. 26 qualified targets delivered, each with current evidence.",
      note: "Delivered reference scope: 26 qualified targets, each supported by current, dated evidence.",
    },
  },
  {
    id: "brain",
    kicker: "Solution 03 · Knowledge",
    name: "Company Brain",
    pain: {
      headline:
        "Staff spend hours searching internal documents, asking the same colleague the same question, or relying on a policy that has already been updated without anyone noticing.",
      body: "Rules live in old chat threads. Procedures are scattered across emails, shared drives, and multiple document versions. No one is certain which version is current. New staff spend their first weeks asking the same questions, and the people who know the answers don't have time to keep repeating themselves.",
    },
    result: {
      headline:
        "Employees ask. The system answers instantly, with the current, verified internal source attached.",
      body: "Approved knowledge, procedures, and company decisions are stored in one verified source. Employees ask in plain language and receive answers linked to the actual internal document, not a guess, not a forwarded email chain, and nothing pulled from outside the company. When a document is updated, the answer updates too.",
    },
    steps: [
      { title: "Collect", text: "Rules, documents, and expert knowledge" },
      { title: "Verify", text: "Owners approve what becomes trusted" },
      { title: "Ask", text: "Employees query one shared context" },
      { title: "Improve", text: "Corrections become permanent knowledge" },
    ],
    savingsLabel: "Savings to measure",
    savings: [
      "Faster onboarding. New employees find answers without asking coworkers.",
      "Less dependence on individual key people for daily decisions",
      "Fewer repeated mistakes caused by unclear or missing procedures",
    ],
    savingsNote:
      "The system assists people with approved knowledge. It does not replace ownership or silently rewrite company rules.",
    automatic: [
      "Answer from approved internal sources only",
      "Surface the relevant procedure before a task",
      "Log frequently asked questions and knowledge gaps",
    ],
    approve: [
      "Approve new content before it becomes trusted",
      "Resolve conflicting information",
      "Change policies and decision authority",
    ],
    bestFit: ["Finance", "Legal", "Multi-entity groups", "Expert teams"],
    before:
      "30 minutes searching for a policy that should take 30 seconds to find",
    after:
      "Any employee gets a verified answer from your own documents, instantly.",
    reference: {
      status: "Live · Private references",
      text: "Reference: Fable Labs' own operating knowledge system. A client version has also been developed for a multi-entity financial business (NDA).",
    },
  },
  {
    id: "analytics",
    kicker: "Solution 04 · Management",
    name: "Business Analytics AI",
    pain: {
      headline:
        "Finance exports one file, operations exports another, and management waits three days for a reconciled report that is already outdated by the time it arrives.",
      body: "Finance, operations, and project teams export separate files, reconcile numbers by hand, and produce a report that may already be outdated when management finally sees it. Important decisions wait on the next report cycle.",
    },
    result: {
      headline:
        "The CEO asks. The answer arrives in 30 seconds, not in three days.",
      body: "The system connects to your existing data sources and builds a single, queryable view across all departments and projects. There is no manual export, no reconciliation step. Leadership asks in plain language and receives an answer drawn from live, connected business data.",
    },
    steps: [
      { title: "Connect", text: "Existing systems and project data" },
      { title: "Align", text: "Shared definitions and access roles" },
      { title: "Analyse", text: "Portfolio, finance, trends, bottlenecks" },
      { title: "Decide", text: "Full context available in one conversation" },
    ],
    savingsLabel: "Savings to measure",
    savings: [
      "Selected reporting processes: from days to minutes",
      "Less manual reconciliation across disconnected spreadsheets",
      "Faster access to cross-project context for decisions",
    ],
    savingsNote:
      "Not every report or decision is automated; the scope is defined together before launch.",
    automatic: [
      "Refresh approved data connections",
      "Prepare recurring report views",
      "Flag missing or conflicting data",
    ],
    approve: [
      "Approve financial interpretations",
      "Validate strategic recommendations",
      "Control access by role and entity",
    ],
    bestFit: [
      "Business groups",
      "Real estate portfolios",
      "Finance teams",
      "Project organisations",
    ],
    before:
      "Finance exports one file, operations another: 3 days to reconcile a report that's already outdated",
    after: "The CEO asks in plain language. The answer arrives in 30 seconds.",
    reference: {
      status: "Live · Nuanu Creative City",
      text: "Reference: Nuanu Creative City, Bali, a portfolio of 40+ businesses and projects. The CEO queries the system directly about profit, loss, and performance. Client name disclosed with permission.",
      savingsLabel: "Measured impact",
      note: "The measured improvement applies to selected reporting workflows.",
    },
  },
  {
    id: "service",
    kicker: "Solution 05 · Customer experience",
    name: "AI Customer Service",
    pain: {
      headline:
        "Staff spend their day confirming availability, repeating pricing information, and walking customers through the same booking steps, while serious enquiries wait in the same queue.",
      body: "Most incoming messages are routine: availability, pricing, booking steps, status updates. These take the same time to answer as the serious ones. Outside working hours, nothing gets answered. When an important enquiry finally reaches the right person, the context is scattered across different chats and the customer has already decided.",
    },
    result: {
      headline:
        "Immediate answers for routine requests. A clean handoff for everything else.",
      body: "The system is set up with your specific service information: what you offer, your pricing, your booking process, and your policies. It answers routine questions from this approved content only, across every channel, at any hour. When a question requires human judgement, the team member receives the full conversation already gathered, with context.",
    },
    steps: [
      { title: "Receive", text: "WhatsApp, web, social or voice" },
      { title: "Understand", text: "Language, intent, and urgency" },
      { title: "Resolve", text: "Approved routine questions answered" },
      { title: "Escalate", text: "Human takes over with full context" },
    ],
    savingsLabel: "Savings to measure",
    savings: [
      "Faster first response, including outside working hours",
      "Fewer repetitive messages for staff to handle manually",
      "More complete and organised incoming enquiries",
    ],
    savingsNote:
      "Automation coverage is defined from real conversation history and approved by you before launch. We don't automate what shouldn't be automated.",
    automatic: [
      "Answer approved FAQs and availability queries",
      "Collect contact and booking details",
      "Classify topics and urgency level",
    ],
    approve: [
      "Suggest replies to unusual questions for review",
      "Escalate complaints and sensitive topics",
      "Approve prices, exceptions, and commitments",
    ],
    bestFit: ["Hospitality", "Clinics", "Education", "Property", "Retail"],
    before:
      "Missed calls after hours, every inquiry waits for a human to respond",
    after:
      "First response in under 10 seconds, 24/7, ready to book or escalate.",
    reference: {
      status: "Pilot · Jakarta",
      text: "Reference: customer-service pilot for a business in the services sector in Jakarta. AI receptionist responds across channels: WhatsApp, web, and voice.",
    },
  },
  {
    id: "dealer",
    kicker: "Solution 06 · Dealership performance",
    name: "Car Dealer 360",
    summary:
      "A whole-dealership performance view: six departments scored and mapped in one interactive wheel. The general manager sees where the business is strong, where margin is leaking, and what to fix first, all in one screen.",
    pain: {
      headline:
        "The general manager gets six separate monthly reports, each showing one department's numbers, and no clear picture of how they connect or where the biggest problem actually is.",
      body: "Sales, service, F&I, inventory, marketing, and customer retention each produce their own data. Numbers sit in separate systems, spreadsheets, and dashboards. By the time someone reconciles them, the month is over. Structural problems (aged stock, low F&I attachment, poor service-to-sales conversion) persist for quarters before they are noticed.",
    },
    result: {
      headline:
        "Every department scored, compared to benchmark, and explained, in one visual. Click any node to see exactly what is happening and why.",
      body: "The Car Dealer 360 wheel maps all six departments as scored nodes. Each score is benchmarked against peer dealerships. One click opens the detail: metrics by channel, key observations from the data, and a quote from the team. The AI identifies the top revenue priorities for the next 90 days in under a minute.",
    },
    steps: [
      { title: "Connect", text: "Sales, service, stock, and CRM data sources" },
      { title: "Score", text: "Each department against peer benchmarks" },
      { title: "Identify", text: "Margin leaks and structural gaps" },
      { title: "Prioritise", text: "90-day action plan with expected impact" },
    ],
    savingsLabel: "Savings to measure",
    savings: [
      "One consolidated view instead of six separate monthly reports",
      "Structural problems identified within days, not quarters",
      "Revenue priority decisions based on benchmark data, not gut feel",
    ],
    savingsNote:
      "Exact impact depends on dealership size and current performance. Inventory and loyalty gaps are typically the fastest wins: both are quantifiable within the first month.",
    automatic: [
      "Score all six departments from connected data",
      "Benchmark against the peer cohort",
      "Generate the 90-day priority analysis",
      "Flag anomalies and sudden score changes",
    ],
    approve: [
      "Validate the benchmarking parameters",
      "Approve and prioritise the recommended actions",
      "Share selected department views with team leads",
    ],
    bestFit: [
      "Dealer groups",
      "Multi-brand franchises",
      "Dealer principals",
      "Automotive groups",
    ],
    before:
      "Which department is losing money? No one knows until the quarterly review.",
    after: "Real-time 360 scorecard across all six dealership functions.",
  },
];

/** Illustrative sample for the Sales Engine, not a real company or person. */
const sampleLeadEn: SampleLead = {
  intro:
    "Not a list of a thousand contacts. One qualified lead, at the right moment, with a specific reason to reach out. The system's value is defining the right criteria. 70 to 80% accuracy on delivered leads is the target.",
  score: 82,
  fields: [
    { key: "Company", value: "Mid-sized equipment manufacturer" },
    { key: "Industry", value: "Industrial equipment · B2B" },
    { key: "Contact", value: "Head of Procurement" },
    { key: "Email", value: "verified ✓", ok: true },
    { key: "LinkedIn", value: "active profile ✓", ok: true },
    { key: "Size", value: "42 employees · €3.1M revenue" },
  ],
  signalKey: "Signal: why now",
  signal:
    "Published a supplier tender 3 days ago. Company recently expanded its production line and is actively sourcing new vendors.",
  caption:
    "The system does not send mass emails. It finds companies that match your specific criteria and delivers them to the salesperson only once the contact is verified and the reason for outreach is clear.",
};

/** "How to read this", the four questions every solution answers. */
const readingGuideEn: GuideItem[] = [
  {
    title: "Pain",
    text: "Where does the business lose time, money, or control today? Named specifically, not in general.",
  },
  {
    title: "Result",
    text: "What changes in the team's daily work after the system is in place?",
  },
  {
    title: "Savings",
    text: "What do we measure before and after? Described qualitatively; exact numbers are estimated per business.",
  },
  {
    title: "Options",
    text: "What runs automatically, and what stays under your approval?",
  },
];

const solutionsSl: Solution[] = [
  {
    id: "sales",
    kicker: "Rešitev 01 · Rast",
    name: "AI prodajni motor",
    pain: {
      headline:
        "Prodajalci preživijo dan z iskanjem novih strank, preverjanjem stanja pogovorov in pošiljanjem sledečih sporočil, ne s prodajo.",
      body: "Vsak teden prodajne ekipe izgubijo ure za tri naloge, ki ne bi smele zahtevati človekove pozornosti: iskanje novih potencialnih strank, sledenje stanju vsakega pogovora in pisanje sledečih sporočil za zaključevanje poslov. Več leadov v lijaku pomeni več časa za administracijo namesto za prodajo.",
    },
    result: {
      headline:
        "Sistem poišče ustrezna podjetja, preveri kontakte, pošlje relevantno prvo sporočilo, spremlja odgovore in ohranja vsako priložnost v enem jasnem stanju.",
      body: "Dodana vrednost je v kriterijih. Preden sistem kontaktira kogarkoli, določi, kako izgleda dober lead za vaše podjetje, in oceni vsako podjetje po teh parametrih. Zato so rezultati uporabni in ne generični. Tipična stopnja ujemanja je 70 do 80 odstotkov. Prodajalec dobi kvalificiran stik z razlogom za pogovor, pripravljen za pravo konverzacijo.",
    },
    steps: [
      { title: "Poišče", text: "Podjetja po vaših odobrenih kriterijih" },
      { title: "Preveri", text: "Kontakte in dokaze iz javnih virov" },
      { title: "Vzpostavi stik", text: "Personalizirano prvo sporočilo v slogu vaše znamke" },
      { title: "Preda", text: "Kvalificiran odgovor gre prodajalcu" },
    ],
    savingsLabel: "Prihranki za merjenje",
    savings: [
      "Manj časa za iskanje novih strank in ročno preverjanje kontaktov",
      "Bolj osredotočeni pogovori. Leadi so kvalificirani, preden prodajalec pokliče.",
      "Manj zapravljenih klicev na kontakte, ki niso pripravljeni ali relevantni",
    ],
    savingsNote:
      "Točni prihranki so odvisni od vaše panoge, trenutnega procesa in obsega leadov. Skupaj jih ocenimo pred začetkom. Nobena konkretna številka ne velja za vsako podjetje.",
    automatic: [
      "Iskanje podjetij po vaših odobrenih kriterijih",
      "Preverjanje dostopnosti kontaktov iz javnih virov",
      "Beleženje odgovorov in posodabljanje faz v lijaku",
      "Opomniki za sledenje odprtim leadom",
    ],
    approve: [
      "Pregled in odobritev kampanj pred pošiljanjem",
      "Negotove ali občutljive odgovore obravnavate osebno",
      "Cene in pogajanja vodite sami",
    ],
    bestFit: ["B2B storitve", "Oprema in stroji", "Nepremičnine", "Veleprodaja"],
    before: "3 do 4 ure za en kvalificiran lead",
    after: "8 sekund. Kvalificiran z AI, preverjen in pripravljen.",
    reference: {
      status: "V uporabi · Fable Labs",
      text: "Referenca: zgrajeno in preizkušeno na lastnem prodajnem procesu Fable Labs. Podatki in rezultati so naši, na voljo za vpogled.",
    },
  },
  {
    id: "market",
    kicker: "Rešitev 02 · Vstop na trg",
    name: "AI tržni radar",
    pain: {
      headline:
        "Ekipe za razvoj poslovanja porabijo čas za gradnjo seznamov kontaktov, raziskovanje, katera podjetja nagovoriti, in pisanje sporočil, ki pridejo ob napačnem trenutku ali do napačne osebe.",
      body: "Generični seznami kontaktov vam dajo imena. Ne pokažejo, katero podjetje se ta trenutek aktivno širi, objavlja nov razpis ali menja dobavitelje. Ekipe nagovarjajo naključno, iste cilje kot vsi konkurenti, brez časovne prednosti in brez konkretnega razloga, da bi jih slišali.",
    },
    result: {
      headline: "Kratek, z dokazi podprt seznam podjetij z razlogom za stik danes.",
      body: "Sistem določi, kako izgleda kvalificiran cilj za vaše podjetje, nato neprestano spremlja javne vire in išče podjetja, ki se ujemajo in kažejo aktivne signale. Vsak dostavljen cilj pride z datiranim, preverljivim razlogom za stik: napovedjo širitve, novim razpisom, spremembo vodstva. Ekipa ve, koga kontaktirati, zakaj zdaj in s čim začeti.",
    },
    steps: [
      { title: "Opredeli", text: "Profil ciljnega trga in partnerja" },
      { title: "Zazna", text: "Signale širitve, razpisov ali naložb" },
      { title: "Kvalificira", text: "Primernost, časovnost, pot odločanja" },
      { title: "Preda", text: "Z dokazi podprt opis cilja" },
    ],
    savingsLabel: "Prihranki za merjenje",
    savings: [
      "Manj časa za čiščenje generičnih seznamov podjetij, ki niso vredna klica",
      "Prvi pogovori pridejo ob pravem trenutku, ne naključno",
      "Krajša pot do dejanskega odločevalca",
    ],
    savingsNote: "Obseg prilagodimo vašemu trgu.",
    automatic: [
      "Neprestano spremljanje javnih tržnih signalov",
      "Zbiranje in urejanje izvornih dokazov",
      "Odstranjevanje dvojnikov in očitnih neskladij",
    ],
    approve: [
      "Odobritev ciljnega profila in izjem",
      "Potrditev strateške primernosti",
      "Izbira pristopa za vsak cilj",
    ],
    bestFit: ["Vstop na nove trge", "Distribucija", "Partnerstva", "Naložbe"],
    before: "Tedni raziskovanja seznamov, ki zastarijo, preden pokličete",
    after: "Podjetja, ki se aktivno širijo, s konkretnim razlogom za stik danes.",
    reference: {
      status: "Izvedeno · NDA",
      text: "Referenca: raziskava za vstop na trg za distributerja v avtomobilski industriji. Izvedeno julija 2026. Dostavljenih 26 kvalificiranih ciljev, vsak z aktualnimi dokazi.",
      note: "Obseg referenčnega projekta: 26 kvalificiranih ciljev, vsak podprt z aktualnimi, datiranimi dokazi.",
    },
  },
  {
    id: "brain",
    kicker: "Rešitev 03 · Znanje",
    name: "Možgani podjetja",
    pain: {
      headline:
        "Zaposleni izgubljajo ure z iskanjem po internih dokumentih, postavljanjem istih vprašanj istemu sodelavcu ali zanašanjem na pravilnik, ki je bil že posodobljen, pa tega nihče ni opazil.",
      body: "Pravila živijo v starih klepetih. Postopki so raztreseni po e-pošti, skupnih diskih in več različicah dokumentov. Nihče ne ve, katera različica je aktualna. Novi zaposleni prve tedne sprašujejo ista vprašanja, tisti, ki poznajo odgovore, pa nimajo časa, da bi jih nenehno ponavljali.",
    },
    result: {
      headline:
        "Zaposleni vprašajo. Sistem takoj odgovori in priloži aktualen, preverjen interni vir.",
      body: "Odobreno znanje, postopki in odločitve podjetja so shranjeni v enem preverjenem viru. Zaposleni vprašajo v navadnem jeziku in dobijo odgovor, vezan na dejanski interni dokument. Ne ugibanja, ne posredovane verige e-pošte in nič, kar bi prišlo izven podjetja. Ko se dokument posodobi, se posodobi tudi odgovor.",
    },
    steps: [
      { title: "Zbere", text: "Pravila, dokumente in strokovno znanje" },
      { title: "Potrdi", text: "Lastniki odobrijo, čemu se lahko zaupa" },
      { title: "Odgovori", text: "Zaposleni sprašujejo en skupni kontekst" },
      { title: "Izboljša", text: "Popravki postanejo trajno znanje" },
    ],
    savingsLabel: "Prihranki za merjenje",
    savings: [
      "Hitrejše uvajanje. Novi zaposleni najdejo odgovore brez spraševanja sodelavcev.",
      "Manj odvisnosti od posameznih ključnih oseb pri vsakodnevnih odločitvah",
      "Manj ponavljajočih se napak zaradi nejasnih ali manjkajočih postopkov",
    ],
    savingsNote:
      "Sistem ljudem pomaga z odobrenim znanjem. Ne nadomešča lastništva in ne prepisuje pravil podjetja brez vednosti.",
    automatic: [
      "Odgovori samo iz odobrenih internih virov",
      "Prikaz ustreznega postopka pred nalogo",
      "Beleženje pogostih vprašanj in vrzeli v znanju",
    ],
    approve: [
      "Odobritev nove vsebine, preden ji lahko zaupamo",
      "Reševanje nasprotujočih si informacij",
      "Spremembe pravilnikov in pooblastil za odločanje",
    ],
    bestFit: ["Finance", "Pravo", "Skupine z več podjetji", "Strokovne ekipe"],
    before: "30 minut iskanja pravilnika, ki bi ga morali najti v 30 sekundah",
    after: "Vsak zaposleni takoj dobi preverjen odgovor iz vaših lastnih dokumentov.",
    reference: {
      status: "V uporabi · zasebne reference",
      text: "Referenca: lasten operativni sistem znanja Fable Labs. Različica za stranko je bila razvita tudi za finančno skupino z več podjetji (NDA).",
    },
  },
  {
    id: "analytics",
    kicker: "Rešitev 04 · Vodenje",
    name: "AI poslovna analitika",
    pain: {
      headline:
        "Finance izvozijo eno datoteko, operativa drugo, vodstvo pa tri dni čaka na usklajeno poročilo, ki je ob prihodu že zastarelo.",
      body: "Finance, operativa in projektne ekipe izvažajo ločene datoteke, številke usklajujejo ročno in pripravijo poročilo, ki je morda že zastarelo, ko ga vodstvo končno vidi. Pomembne odločitve čakajo na naslednji cikel poročanja.",
    },
    result: {
      headline: "Direktor vpraša. Odgovor pride v 30 sekundah, ne v treh dneh.",
      body: "Sistem se poveže z obstoječimi viri podatkov in zgradi enoten pogled, ki ga lahko sprašujete prek vseh oddelkov in projektov. Brez ročnega izvoza, brez usklajevanja. Vodstvo vpraša v navadnem jeziku in dobi odgovor iz živih, povezanih poslovnih podatkov.",
    },
    steps: [
      { title: "Poveže", text: "Obstoječe sisteme in projektne podatke" },
      { title: "Uskladi", text: "Skupne definicije in vloge dostopa" },
      { title: "Analizira", text: "Portfelj, finance, trende, ozka grla" },
      { title: "Odloči", text: "Celoten kontekst v enem pogovoru" },
    ],
    savingsLabel: "Prihranki za merjenje",
    savings: [
      "Izbrani poročevalski procesi: z dni na minute",
      "Manj ročnega usklajevanja med nepovezanimi preglednicami",
      "Hitrejši dostop do konteksta med projekti za odločitve",
    ],
    savingsNote:
      "Ni avtomatizirano vsako poročilo ali odločitev; obseg skupaj določimo pred začetkom.",
    automatic: [
      "Osveževanje odobrenih podatkovnih povezav",
      "Priprava ponavljajočih se pogledov poročil",
      "Označevanje manjkajočih ali nasprotujočih si podatkov",
    ],
    approve: [
      "Odobritev finančnih interpretacij",
      "Potrditev strateških priporočil",
      "Nadzor dostopa po vlogi in podjetju",
    ],
    bestFit: ["Poslovne skupine", "Nepremičninski portfelji", "Finančne ekipe", "Projektne organizacije"],
    before: "Finance izvozijo eno datoteko, operativa drugo: 3 dni za usklajeno poročilo, ki je že zastarelo",
    after: "Direktor vpraša v navadnem jeziku. Odgovor pride v 30 sekundah.",
    reference: {
      status: "V uporabi · Nuanu Creative City",
      text: "Referenca: Nuanu Creative City, Bali, portfelj več kot 40 podjetij in projektov. Direktor sistem neposredno sprašuje o dobičku, izgubi in uspešnosti. Ime stranke je objavljeno z dovoljenjem.",
      savingsLabel: "Izmerjeni učinki",
      note: "Izmerjena izboljšava velja za izbrane poročevalske procese.",
    },
  },
  {
    id: "service",
    kicker: "Rešitev 05 · Izkušnja strank",
    name: "AI podpora strankam",
    pain: {
      headline:
        "Zaposleni preživijo dan s potrjevanjem razpoložljivosti, ponavljanjem cen in vodenjem strank skozi iste korake rezervacije, medtem ko resna povpraševanja čakajo v isti vrsti.",
      body: "Večina dohodnih sporočil je rutinskih: razpoložljivost, cene, koraki rezervacije, stanje naročila. Za odgovor vzamejo enako časa kot resna vprašanja. Izven delovnega časa ne odgovori nihče. Ko resno povpraševanje končno pride do prave osebe, je kontekst raztresen po različnih klepetih, stranka pa se je že odločila.",
    },
    result: {
      headline: "Takojšnji odgovori na rutinska vprašanja. Čista predaja za vse ostalo.",
      body: "Sistem nastavimo z vašimi informacijami o storitvi: kaj ponujate, vaše cene, postopek rezervacije in vaša pravila. Na rutinska vprašanja odgovarja samo iz te odobrene vsebine, prek vsakega kanala, ob vsaki uri. Ko vprašanje zahteva človeško presojo, član ekipe dobi celoten že zbran pogovor s kontekstom.",
    },
    steps: [
      { title: "Sprejme", text: "WhatsApp, splet, družbena omrežja ali glas" },
      { title: "Razume", text: "Jezik, namen in nujnost" },
      { title: "Reši", text: "Odobrena rutinska vprašanja" },
      { title: "Preda", text: "Človek prevzame s celotnim kontekstom" },
    ],
    savingsLabel: "Prihranki za merjenje",
    savings: [
      "Hitrejši prvi odgovor, tudi izven delovnega časa",
      "Manj ponavljajočih se sporočil, ki jih zaposleni obravnavajo ročno",
      "Bolj popolna in urejena dohodna povpraševanja",
    ],
    savingsNote:
      "Obseg avtomatizacije določimo iz dejanske zgodovine pogovorov in ga pred začetkom odobrite vi. Ne avtomatiziramo tistega, česar ne bi smeli.",
    automatic: [
      "Odgovori na odobrena pogosta vprašanja in razpoložljivost",
      "Zbiranje kontaktnih in rezervacijskih podatkov",
      "Razvrščanje tem in stopnje nujnosti",
    ],
    approve: [
      "Predlogi odgovorov na nenavadna vprašanja v pregled",
      "Eskalacija pritožb in občutljivih tem",
      "Odobritev cen, izjem in zavez",
    ],
    bestFit: ["Gostinstvo", "Ambulante", "Izobraževanje", "Nepremičnine", "Maloprodaja"],
    before: "Zgrešeni klici po delovnem času, vsako povpraševanje čaka na človeka",
    after: "Prvi odgovor v manj kot 10 sekundah, 24/7, pripravljen za rezervacijo ali predajo.",
    reference: {
      status: "Pilot · Džakarta",
      text: "Referenca: pilot podpore strankam za storitveno podjetje v Džakarti. AI receptor odgovarja prek vseh kanalov: WhatsApp, splet in glas.",
    },
  },
  {
    id: "dealer",
    kicker: "Rešitev 06 · Uspešnost avtohiše",
    name: "Avtohiša 360",
    summary:
      "Pogled na uspešnost celotne avtohiše: šest oddelkov, ocenjenih in prikazanih v enem interaktivnem kolesu. Direktor na enem zaslonu vidi, kje je posel močan, kje odteka marža in kaj popraviti najprej.",
    pain: {
      headline:
        "Direktor dobi šest ločenih mesečnih poročil, vsako s številkami enega oddelka, brez jasne slike, kako so povezani in kje je največja težava.",
      body: "Prodaja, servis, financiranje in zavarovanje, zaloga, marketing in zadrževanje strank imajo vsak svoje podatke. Številke so v ločenih sistemih, preglednicah in nadzornih ploščah. Ko jih nekdo uskladi, je mesec že mimo. Strukturne težave, kot so stara zaloga, nizek delež financiranja ali slaba pretvorba iz servisa v prodajo, ostanejo neopažene celo četrtletje.",
    },
    result: {
      headline:
        "Vsak oddelek ocenjen, primerjan z merili in pojasnjen v enem prikazu. Kliknite katerokoli vozlišče in vidite, kaj se dogaja in zakaj.",
      body: "Kolo Avtohiša 360 prikaže vseh šest oddelkov kot ocenjena vozlišča. Vsaka ocena je primerjana s primerljivimi avtohišami. En klik odpre podrobnosti: kazalnike po kanalih, ključne ugotovitve iz podatkov in mnenje ekipe. AI v manj kot minuti določi glavne prihodkovne prioritete za naslednjih 90 dni.",
    },
    steps: [
      { title: "Poveže", text: "Podatke prodaje, servisa, zaloge in CRM" },
      { title: "Oceni", text: "Vsak oddelek glede na primerljive avtohiše" },
      { title: "Prepozna", text: "Odtekanje marže in strukturne vrzeli" },
      { title: "Določi prioritete", text: "90-dnevni načrt s pričakovanim učinkom" },
    ],
    savingsLabel: "Prihranki za merjenje",
    savings: [
      "En združen pogled namesto šestih ločenih mesečnih poročil",
      "Strukturne težave prepoznane v dneh, ne v četrtletjih",
      "Odločitve o prihodkovnih prioritetah na podlagi primerjalnih podatkov, ne občutka",
    ],
    savingsNote:
      "Točen učinek je odvisen od velikosti avtohiše in trenutne uspešnosti. Vrzeli pri zalogi in zvestobi strank so običajno najhitrejše zmage: obe je mogoče izmeriti v prvem mesecu.",
    automatic: [
      "Ocena vseh šestih oddelkov iz povezanih podatkov",
      "Primerjava s skupino primerljivih avtohiš",
      "Priprava 90-dnevne analize prioritet",
      "Označevanje odstopanj in nenadnih sprememb ocen",
    ],
    approve: [
      "Potrditev parametrov primerjave",
      "Odobritev in razvrstitev priporočenih ukrepov",
      "Deljenje izbranih pogledov oddelkov z vodji ekip",
    ],
    bestFit: ["Skupine avtohiš", "Večznamčni zastopniki", "Lastniki avtohiš", "Avtomobilske skupine"],
    before: "Kateri oddelek izgublja denar? Nihče ne ve do četrtletnega pregleda.",
    after: "Sprotna ocena 360 za vseh šest funkcij avtohiše.",
  },
];

/** Illustrative sample for the Sales Engine, not a real company or person. */
const sampleLeadSl: SampleLead = {
  intro:
    "Ne seznam tisoč kontaktov. En kvalificiran lead, ob pravem trenutku, s konkretnim razlogom za stik. Vrednost sistema je v določanju pravih kriterijev. Cilj je 70 do 80 % natančnost dostavljenih leadov.",
  score: 82,
  fields: [
    { key: "Podjetje", value: "Srednje velik proizvajalec opreme" },
    { key: "Panoga", value: "Industrijska oprema · B2B" },
    { key: "Kontakt", value: "Vodja nabave" },
    { key: "E-naslov", value: "preverjen ✓", ok: true },
    { key: "LinkedIn", value: "aktiven profil ✓", ok: true },
    { key: "Velikost", value: "42 zaposlenih · 3,1 mio € prihodkov" },
  ],
  signalKey: "Signal: zakaj zdaj",
  signal:
    "Pred 3 dnevi je objavilo razpis za dobavitelje. Podjetje je nedavno razširilo proizvodno linijo in aktivno išče nove dobavitelje.",
  caption:
    "Sistem ne pošilja masovne e-pošte. Poišče podjetja, ki ustrezajo vašim točnim kriterijem, in jih preda prodajalcu šele, ko je kontakt preverjen in razlog za stik jasen.",
};

const readingGuideSl: GuideItem[] = [
  {
    title: "Bolečina",
    text: "Kje podjetje danes izgublja čas, denar ali nadzor? Konkretno poimenovano, ne na splošno.",
  },
  {
    title: "Rezultat",
    text: "Kaj se po uvedbi sistema spremeni v vsakodnevnem delu ekipe?",
  },
  {
    title: "Prihranki",
    text: "Kaj merimo pred in po? Opisano kvalitativno; točne številke ocenimo za vsako podjetje posebej.",
  },
  {
    title: "Opcije",
    text: "Kaj teče samodejno in kaj ostane pod vašo odobritvijo?",
  },
];

export const solutionsByLocale: Dict<Solution[]> = { en: solutionsEn, sl: solutionsSl };
export const sampleLeadByLocale: Dict<SampleLead> = { en: sampleLeadEn, sl: sampleLeadSl };
export const readingGuideByLocale: Dict<GuideItem[]> = { en: readingGuideEn, sl: readingGuideSl };

export const solutions = solutionsEn;
