import { Container } from "@/components/Container";
import { FEATURES } from "@/config/features";
import { brands, type Brand } from "@/content/brands";

/**
 * Client / brand logo bar directly below the hero. Renders NOTHING until
 * FEATURES.brandLogos is true AND content/brands.ts has real logos — never a
 * placeholder, grey box or invented company.
 *
 * Logos render greyscale at ~55% and go full colour on hover. On desktop it's
 * a single static row; on mobile a snap-scroll row with no scrollbar. With more
 * than eight logos it becomes a slow marquee (paused on hover, off under
 * reduced motion — see `.logo-marquee` in globals.css).
 */
function LogoItem({ brand }: { brand: Brand }) {
  const img = (
    // Height-capped with width:auto so mismatched logo dimensions align
    // optically. Plain <img> because logo aspect ratios are arbitrary.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={brand.logoSrc}
      alt={brand.alt}
      className="h-6 w-auto shrink-0 object-contain opacity-55 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 md:h-8"
    />
  );
  return brand.url ? (
    <a
      href={brand.url}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      title={brand.name}
    >
      {img}
    </a>
  ) : (
    <span className="shrink-0">{img}</span>
  );
}

export default function BrandLogoBar() {
  if (!FEATURES.brandLogos || brands.length === 0) return null;

  const marquee = brands.length > 8;

  return (
    <section className="border-y border-gold/15 bg-charcoal">
      <Container className="py-8 md:py-10">
        <p className="text-center text-xs uppercase tracking-[0.28em] text-grey">
          Worked with
        </p>

        <div className="mt-6">
          {marquee ? (
            <div className="logo-marquee">
              <div className="logo-marquee-track items-center gap-12 md:gap-16">
                {[...brands, ...brands].map((brand, i) => (
                  <LogoItem key={`${brand.name}-${i}`} brand={brand} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-10 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x md:justify-between md:gap-12 md:overflow-visible">
              {brands.map((brand) => (
                <div key={brand.name} className="snap-start">
                  <LogoItem brand={brand} />
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
