type SparkleProps = {
  className?: string;
  /** unique id so multiple gradients can coexist on one page */
  id?: string;
  /** solid gold fill instead of gradient */
  solid?: boolean;
};

/**
 * The VALOR four-pointed sparkle mark — the recurring brand motif.
 * Rendered as SVG so it stays crisp at any size and can carry the gold gradient.
 */
export default function Sparkle({
  className,
  id = "valor-sparkle",
  solid = false,
}: SparkleProps) {
  const gradientId = `${id}-grad`;
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {!solid && (
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="64"
            y2="64"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E0C070" />
            <stop offset="0.5" stopColor="#C9A24B" />
            <stop offset="1" stopColor="#E8D190" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M32 2 C33.6 16 34.4 20.8 48 24 C61.6 27.2 62 31 62 32 C62 33 61.6 36.8 48 40 C34.4 43.2 33.6 48 32 62 C30.4 48 29.6 43.2 16 40 C2.4 36.8 2 33 2 32 C2 31 2.4 27.2 16 24 C29.6 20.8 30.4 16 32 2 Z"
        fill={solid ? "currentColor" : `url(#${gradientId})`}
      />
    </svg>
  );
}
