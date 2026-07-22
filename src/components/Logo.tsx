import Image from "next/image";
import { clsx } from "@/lib/clsx";

/**
 * The Valor lockup: the real sparkle mark (a transparent PNG derived from the
 * brand logo files) beside the VALOR wordmark. Use `variant="light"` (cream
 * mark) on dark backgrounds and `variant="dark"` on light ones. The whole site
 * runs dark, so light is the default.
 *
 * Size the mark via `markClassName` (height-based, width stays auto so the
 * mark's natural portrait ratio is preserved) and the wordmark via
 * `wordClassName`.
 */
export default function Logo({
  variant = "light",
  markClassName = "h-7",
  wordClassName = "text-xl",
  withWord = true,
  priority = false,
  className,
}: {
  variant?: "light" | "dark";
  markClassName?: string;
  wordClassName?: string;
  withWord?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const src =
    variant === "dark"
      ? "/brand/valor-mark-dark.png"
      : "/brand/valor-mark-light.png";
  return (
    <span className={clsx("flex items-center gap-2.5", className)}>
      <Image
        src={src}
        alt="Valor"
        width={331}
        height={475}
        priority={priority}
        className={clsx("w-auto", markClassName)}
      />
      {withWord && (
        <span
          className={clsx(
            "font-display font-semibold tracking-[0.2em] text-cream",
            wordClassName,
          )}
        >
          VALOR
        </span>
      )}
    </span>
  );
}
