/** Thin gold line icons used across the Services cards and pages. */

type IconProps = { className?: string };

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function IconWebsite({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="3" y="4" width="18" height="14" rx="2.5" />
      <path d="M3 8h18" />
      <circle cx="5.6" cy="6" r="0.5" fill="currentColor" />
      <circle cx="7.4" cy="6" r="0.5" fill="currentColor" />
      <path d="M8 21h8M12 18v3" />
    </svg>
  );
}

export function IconAssistant({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 19 15.5H9l-4 3.5V7A1.5 1.5 0 0 1 6.5 5.5" />
      <path d="M9 10.5h.01M12 10.5h.01M15 10.5h.01" />
    </svg>
  );
}

export function IconSeo({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.2-4.2" />
      <path d="M8.5 11.5l1.8 1.8L14 9.5" />
    </svg>
  );
}

export function IconAutomation({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21M5.6 5.6l2.5 2.5M15.9 15.9l2.5 2.5M18.4 5.6l-2.5 2.5M8.1 15.9l-2.5 2.5" />
    </svg>
  );
}

export function IconClock({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function IconShield({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M12 3l7 2.5v5.5c0 4.5-3 8-7 9.5-4-1.5-7-5-7-9.5V5.5L12 3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
