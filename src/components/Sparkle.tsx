type SparkleProps = {
  className?: string;
  /** Kept for compatibility with earlier call sites; no longer needed. */
  id?: string;
  /** Solid gold instead of the soft gold gradient. */
  solid?: boolean;
};

/**
 * The VALOR star, the same mark as in the logo, used as the recurring brand
 * motif (page headings, cards). The logo file is used as a stencil (CSS mask)
 * so the shape is exactly the logo's while the colour stays brand gold.
 */
export default function Sparkle({ className, solid = false }: SparkleProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 ${className ?? ""}`}
      style={{
        background: solid
          ? "var(--color-gold)"
          : "linear-gradient(135deg, var(--color-gold-light) 0%, var(--color-gold) 50%, var(--color-gold-light) 100%)",
        WebkitMaskImage: "url(/brand/valor-mark-light.png)",
        maskImage: "url(/brand/valor-mark-light.png)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
