"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { FEATURES } from "@/config/features";

const ease = [0.16, 1, 0.3, 1] as const;

type Review = {
  name: string;
  company: string;
  role: string;
  text: string;
  source: "Google" | "LinkedIn" | "Direct";
};

// Real reviews only — never fabricate one. The section stays empty (or hidden
// behind FEATURES.reviews) until genuine reviews exist.
// TODO: real content required
const reviews: Review[] = [];

/**
 * References & reviews. Fully built but gated: renders nothing until
 * FEATURES.reviews is true. When on but empty, it shows an honest empty state
 * rather than a fake review. Aggregate rating and the Google reviews link are
 * driven by env vars (see .env.example) and only appear when set — no invented
 * numbers or URLs.
 */
export default function Reviews() {
  if (!FEATURES.reviews) return null;

  const reviewsUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL;
  const rating = process.env.NEXT_PUBLIC_GOOGLE_RATING;
  const reviewCount = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_COUNT;

  return (
    <Section tone="warm" edges className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="References" title="In their words." />
          {rating && reviewCount && (
            <div className="shrink-0 md:text-right">
              <div className="font-display text-3xl text-gold">
                {rating}
                <span className="text-lg text-grey"> / 5</span>
              </div>
              <div className="text-sm text-grey">{reviewCount} Google reviews</div>
            </div>
          )}
        </div>

        {reviews.length === 0 ? (
          <p className="mt-14 max-w-xl text-lg leading-relaxed text-grey">
            Reviews coming from client work in progress.
          </p>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {reviews.map((r, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease, delay: i * 0.06 }}
                className="flex flex-col rounded-[1.75rem] border border-gold/12 bg-charcoal/50 p-8"
              >
                <blockquote className="flex-1 text-lg leading-relaxed text-cream/90">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-end justify-between gap-4 border-t border-gold/12 pt-5">
                  <div>
                    <div className="font-display text-lg text-cream">
                      {r.name}
                    </div>
                    <div className="mt-1 text-sm text-grey">
                      {r.role}, {r.company}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-gold/25 px-3 py-1 text-xs text-gold">
                    {r.source}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        )}

        {reviewsUrl && (
          <div className="mt-12">
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-pill border border-gold/40 px-6 py-3 text-sm font-medium text-cream transition-colors hover:border-gold hover:text-gold"
            >
              Read all reviews on Google
              <span aria-hidden="true">→</span>
            </a>
          </div>
        )}
      </Container>
    </Section>
  );
}
