"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { FEATURES } from "@/config/features";
import { references, type Reference } from "@/content/references";
import { brand } from "@/config/brand";

/**
 * Anonymised reference cards; each opens its case study in a native <dialog>
 * (focus-trapped, Esc to close, backdrop click closes). Content is only what's
 * in content/references.ts. // TODO: real content required, fuller case
 * studies (the starting problem, timeline, tools) to deepen the modal.
 */
export default function References() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<Reference | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected && !dialog.open) dialog.showModal();
    document.documentElement.style.overflow = selected ? "hidden" : "";
  }, [selected]);

  if (!FEATURES.references || references.length === 0) return null;

  return (
    <Section id="references" className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow="References" title="What we've built" />

        <RevealGroup as="ul" stagger={0.07} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {references.map((r) => (
            <RevealItem as="li" key={r.client} hoverLift className="h-full">
              <button
                type="button"
                onClick={() => setSelected(r)}
                aria-haspopup="dialog"
                className="group flex h-full w-full flex-col justify-between gap-10 rounded-3xl border border-cream/[0.08] bg-charcoal p-6 text-left transition-colors duration-300 hover:border-gold/70"
              >
                <span className="font-display text-xl font-semibold leading-snug text-cream">{r.client}</span>
                <span className="inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border border-gold/40 px-4 py-2.5 text-sm font-medium text-gold transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-obsidian">
                  Read case study
                  <span aria-hidden="true">→</span>
                </span>
              </button>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-10 flex justify-center">
          <Link
            href="/solutions"
            className="group inline-flex items-center gap-2 rounded-full border border-gold/50 px-7 py-3.5 text-sm font-semibold text-gold transition-colors hover:border-gold hover:bg-gold hover:text-obsidian"
          >
            View all solutions
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </Container>

      <dialog
        ref={dialogRef}
        aria-labelledby="case-study-title"
        onClose={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
        className="case-dialog m-auto w-[calc(100%-2rem)] max-w-2xl rounded-3xl border border-gold/30 bg-charcoal p-0 text-cream"
      >
        {selected && (
          <div className="p-7 md:p-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="eyebrow">Case study</p>
                <h3 id="case-study-title" className="mt-3 font-display text-3xl font-semibold leading-tight text-cream md:text-4xl">
                  {selected.client}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close case study"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/15 text-xl leading-none text-cream transition-colors hover:border-gold hover:text-gold"
              >
                ×
              </button>
            </div>

            <div className="mt-8 border-t border-cream/[0.08] pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-grey">What we built</p>
              <p className="mt-3 text-lg leading-relaxed text-cream">{selected.built}</p>
            </div>

            <div className="mt-8 rounded-3xl border border-gold/25 bg-obsidian p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-grey">Result</p>
              <p className="mt-3 font-display text-2xl font-semibold leading-snug text-gold md:text-3xl">{selected.result}</p>
            </div>

            <a
              href={brand.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-obsidian transition-colors hover:bg-gold-light"
            >
              Talk to us about a similar system
              <span aria-hidden="true">→</span>
            </a>
          </div>
        )}
      </dialog>
    </Section>
  );
}
