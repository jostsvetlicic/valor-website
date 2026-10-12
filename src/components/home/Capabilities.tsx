"use client";

import { useId, useState } from "react";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import {
  IconCalendar,
  IconChat,
  IconDocument,
  IconLead,
  IconMobile,
  IconNetwork,
  IconPayment,
  IconWorkflow,
} from "@/components/Icons";
import { clsx } from "@/lib/clsx";

type Example = { client: string; text: string };

/**
 * Examples come only from real, delivered client work (see content/references.ts).
 * A card without one is not expandable. // TODO: real content required,
 * examples for Document, Payment and Mobile Apps.
 */
const capabilities: {
  Icon: typeof IconCalendar;
  title: string;
  detail: string;
  example?: Example;
}[] = [
  {
    Icon: IconCalendar,
    title: "Booking Automation",
    detail: "Calendar sync and double-booking prevention.",
    example: {
      client: "Boat charter company, Croatia",
      text: "We synced the company's calendars across 4 booking platforms, so every booking updates everywhere automatically and double bookings are blocked before they happen. Live in 5 days, with zero double bookings since launch.",
    },
  },
  {
    Icon: IconChat,
    title: "Guest and Client Communication",
    detail: "WhatsApp AI with instant replies, 24/7.",
    example: {
      client: "Tutoring company, Hong Kong",
      text: "A WhatsApp AI now answers parent and student messages automatically, backed by a student intake form and automated reminders. The team saves 2 hours per day on manual messaging.",
    },
  },
  {
    Icon: IconLead,
    title: "Lead Handling",
    detail: "Instant response, qualification and CRM sync.",
    example: {
      client: "Real estate agency, Croatia",
      text: "Email enquiries are handled automatically and prioritised, so the strongest leads reach the team first, and WhatsApp voice messages are transcribed and searchable. The team stopped losing leads to slow response times.",
    },
  },
  {
    Icon: IconWorkflow,
    title: "Internal Process Automation",
    detail: "Staff briefings, task routing and reminders.",
    example: {
      client: "Tutoring company, Hong Kong",
      text: "Before every lesson, the tutor automatically receives a brief on the student. Reminders go out on their own. Nobody has to remember to send them.",
    },
  },
  {
    Icon: IconDocument,
    title: "Document and Paperwork Automation",
    detail: "Contracts and confirmations, sent automatically.",
  },
  {
    Icon: IconPayment,
    title: "Payment and Invoice Automation",
    detail: "Deposit requests, reminders and reconciliation.",
  },
  {
    Icon: IconMobile,
    title: "Mobile Apps",
    detail: "iOS and Android: bookings, payments, push notifications.",
  },
  {
    Icon: IconNetwork,
    title: "Full AI Infrastructure",
    detail: "Every system connected into one intelligent backend.",
    example: {
      client: "Fitness franchise, Slovenia",
      text: "Instagram and Facebook DMs are automated, and an AI client intake form feeds straight into the CRM, with each franchise studio seeing only its own clients. Manual DM handling is gone across every location.",
    },
  },
];

const ICON_BOX =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/25 text-gold transition-[color,border-color,box-shadow] duration-300 group-hover:border-gold group-hover:text-gold-light group-hover:shadow-[0_0_22px_-2px_color-mix(in_oklab,var(--color-gold)_65%,transparent)]";

function Card({ item, open, onToggle }: { item: (typeof capabilities)[number]; open: boolean; onToggle: () => void }) {
  const id = useId();
  const { Icon, title, detail, example } = item;
  const head = (
    <>
      <span className={clsx(ICON_BOX, open && "border-gold text-gold-light")}>
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-6 font-display text-lg font-semibold leading-snug text-cream">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-grey">{detail}</p>
    </>
  );

  if (!example) return <div className="p-6">{head}</div>;

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="block w-full p-6 pb-4 text-left"
      >
        {head}
        <span className="mt-5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
          {open ? "Hide example" : "Real example"}
          <svg viewBox="0 0 16 16" className={clsx("h-3 w-3 transition-transform duration-300", open && "rotate-45")} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
            <path d="M8 3v10M3 8h10" />
          </svg>
        </span>
      </button>
      <div
        id={id}
        role="region"
        aria-label={`Example: ${title}`}
        inert={!open}
        className={clsx(
          "grid transition-[grid-template-rows] duration-400 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="mx-6 mb-6 border-t border-gold/25 pt-4">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-gold">{example.client}</p>
            <p className="mt-2 text-sm leading-relaxed text-cream">{example.text}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Capabilities() {
  const [openTitle, setOpenTitle] = useState<string | null>(null);

  return (
    <Section id="capabilities" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow="What's possible"
          title="What we can build for you"
          intro="From a single automation to a full AI infrastructure. Every system is built around how your business actually works."
        />

        <RevealGroup as="ul" stagger={0.05} className="mt-14 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item) => {
            const open = openTitle === item.title;
            return (
              <RevealItem
                as="li"
                key={item.title}
                hoverLift={!open}
                className={clsx(
                  "group rounded-2xl border bg-charcoal transition-colors duration-300",
                  open ? "border-gold/70 sm:col-span-2" : "border-cream/[0.08] hover:border-gold/70",
                )}
              >
                <Card item={item} open={open} onToggle={() => setOpenTitle(open ? null : item.title)} />
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
