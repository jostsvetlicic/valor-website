import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main>
        <div className="flex min-h-[80vh] items-center pb-24 pt-40 md:pb-32 md:pt-48">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow">404</p>
              <h1 className="mt-4 font-display text-[clamp(2.8rem,6vw,5rem)] font-medium leading-tight tracking-tight text-cream">
                Page not found.
              </h1>
              <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-grey">
                The page you&rsquo;re looking for doesn&rsquo;t exist or has
                been moved.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/"
                  className="rounded-pill bg-gold px-8 py-3.5 text-sm font-semibold text-obsidian transition-colors hover:bg-gold-light"
                >
                  Back to home
                </Link>
                <Link
                  href="/contact"
                  className="rounded-pill border border-white/[0.12] px-8 py-3.5 text-sm font-medium text-cream transition-colors hover:border-gold/40 hover:text-gold"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
