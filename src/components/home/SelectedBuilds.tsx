import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Section } from "@/components/Section";
import { FEATURES } from "@/config/features";
import { builds } from "@/content/builds";

/**
 * "Selected builds" — a horizontal strip of real project screenshots, each with
 * the project name and one line. Renders NOTHING until FEATURES.selectedBuilds
 * is true AND content/builds.ts has real projects. Never invented.
 */
export default function SelectedBuilds() {
  if (!FEATURES.selectedBuilds || builds.length === 0) return null;

  return (
    <Section tone="base" className="py-16 md:py-20">
      <Container>
        <span className="eyebrow">Selected builds</span>
        <div className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {builds.map((b) => {
            const inner = (
              <>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[1.25rem] border border-gold/12 bg-charcoal">
                  <Image
                    src={b.image}
                    alt={b.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 85vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 font-display text-xl font-medium text-cream">
                  {b.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-grey">{b.line}</p>
              </>
            );
            return (
              <div
                key={b.name}
                className="w-[85%] shrink-0 snap-start sm:w-[26rem]"
              >
                {b.url ? (
                  <Link
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
