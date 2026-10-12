/**
 * VALOR, "What we've built" case cards (homepage). Anonymised by client type.
 *
 * A card only renders once BOTH `built` and `result` are filled in, and the
 * whole section stays hidden while FEATURES.references is false. Never fill
 * these with estimates, only what was actually delivered and measured.
 *
 * Content supplied by the owner, 2026-09-29.
 */

export type Reference = {
  /** Anonymised client type, e.g. "Boat charter, Croatia". */
  client: string;
  /** What was built, 1-2 lines. */
  built: string;
  /** Key result, a stat or outcome, shown bold. */
  result: string;
};

export const references: Reference[] = [
  {
    client: "Tutoring company, Hong Kong",
    built:
      "WhatsApp AI answering parent and student messages automatically, a student intake form, a tutor brief before each lesson, and automated reminders.",
    result: "2 hours per day saved on manual messaging.",
  },
  {
    client: "Fitness franchise, Slovenia",
    built:
      "Instagram and Facebook DM automation and an AI client intake form connected to the CRM. Each franchise studio sees only its own clients.",
    result: "Manual DM handling eliminated across all franchise locations.",
  },
  {
    client: "Boat charter company, Croatia",
    built:
      "Calendar sync across 4 booking platforms, with automatic updates and double-booking prevention.",
    result: "Zero double bookings since launch. Live in 5 days.",
  },
  {
    client: "Real estate agency, Croatia",
    built:
      "WhatsApp voice message transcription and search, plus automated email enquiry handling with lead prioritisation.",
    result: "Team stopped losing leads to slow response times.",
  },
];
