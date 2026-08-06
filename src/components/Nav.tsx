"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { brand, nav } from "@/config/brand";
import { BookCallButton } from "./Button";
import Logo from "./Logo";
import { clsx } from "@/lib/clsx";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center"
      >
        <nav
          className={clsx(
            "mt-0 flex w-full items-center justify-between px-6 transition-[padding,background-color,border-color] duration-300 ease-out md:px-10",
            scrolled
              ? "glass border-b border-gold/10 py-3"
              : "border-b border-transparent py-5",
          )}
        >
          <Link
            href="/"
            className="group flex items-center"
            aria-label="Valor home"
          >
            <Logo
              priority
              markClassName={clsx(
                "transition-[height] duration-300 ease-out",
                scrolled ? "h-6" : "h-7",
              )}
              wordClassName={clsx(
                "transition-[font-size] duration-300 ease-out",
                scrolled ? "text-lg" : "text-xl",
              )}
            />
          </Link>

          <div className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-grey transition-colors hover:text-cream"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <BookCallButton
              className={scrolled ? "px-6 py-3 text-sm" : "px-7 py-3.5"}
            />
          </div>

          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 text-cream lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className="block h-px w-5 bg-cream" />
              <span className="block h-px w-5 bg-cream" />
            </div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex flex-col bg-obsidian/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center"
              >
                <Logo markClassName="h-7" wordClassName="text-xl" />
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 text-2xl text-cream"
              >
                ×
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2 px-8">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.5 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl font-light text-cream/90"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="px-8 pb-12">
              <a
                href={brand.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-pill bg-gold px-8 py-4 text-sm font-semibold text-obsidian"
              >
                Book a call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
