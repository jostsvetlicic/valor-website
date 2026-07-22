import { brand } from "@/config/brand";
import Logo from "@/components/Logo";
import { Container } from "@/components/Container";

/**
 * Minimal footer for the /call landing page. Deliberately has NO navigation —
 * just the mark, tappable contact links, and a copyright line. No way out
 * except the booking buttons above.
 */
export default function LandingFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/10 bg-charcoal">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 bg-radial-gold" />
      <Container className="relative py-14">
        <div className="flex flex-col items-center gap-8 text-center">
          <Logo markClassName="h-9" wordClassName="text-2xl" />

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-grey">
            <a
              href={brand.phoneHref}
              className="transition-colors hover:text-cream"
            >
              {brand.phoneDisplay}
            </a>
            <a
              href={brand.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-cream"
            >
              WhatsApp
            </a>
            <a
              href={brand.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-cream"
            >
              {brand.instagramHandle}
            </a>
          </div>

          <p className="text-xs text-grey/70">
            © 2026 Valor · {brand.domain}
          </p>
        </div>
      </Container>
    </footer>
  );
}
