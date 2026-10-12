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

export function IconCalendar({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <path d="M8.5 14.5l2 2 4-4" />
    </svg>
  );
}

export function IconChat({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M20 11.5a7.5 7.5 0 0 1-11 6.6L4 19.5l1.4-4.6A7.5 7.5 0 1 1 20 11.5Z" />
      <path d="M8.8 11.5h.01M12 11.5h.01M15.2 11.5h.01" />
    </svg>
  );
}

export function IconLead({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M4 5h16l-6 7.5V19l-4-2v-4.5L4 5Z" />
    </svg>
  );
}

export function IconWorkflow({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="3.5" y="4" width="6" height="5" rx="1.2" />
      <rect x="14.5" y="4" width="6" height="5" rx="1.2" />
      <rect x="9" y="15" width="6" height="5" rx="1.2" />
      <path d="M6.5 9v2.5a1.5 1.5 0 0 0 1.5 1.5h8a1.5 1.5 0 0 0 1.5-1.5V9M12 13v2" />
    </svg>
  );
}

export function IconDocument({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8L14 3.5Z" />
      <path d="M14 3.5V8h4.5M8.5 12.5h7M8.5 16h4.5" />
    </svg>
  );
}

export function IconPayment({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3 10h18M6.5 14.5h4" />
    </svg>
  );
}

export function IconMobile({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </svg>
  );
}

export function IconNetwork({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <circle cx="12" cy="12" r="2.5" />
      <circle cx="5" cy="5.5" r="1.8" />
      <circle cx="19" cy="5.5" r="1.8" />
      <circle cx="5" cy="18.5" r="1.8" />
      <circle cx="19" cy="18.5" r="1.8" />
      <path d="M6.4 6.8l3.8 3.6M17.6 6.8l-3.8 3.6M6.4 17.2l3.8-3.6M17.6 17.2l-3.8-3.6" />
    </svg>
  );
}

export function IconHotel({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M3 19.5V6M3 15h18v4.5M21 15v-3a3 3 0 0 0-3-3h-7v6" />
      <circle cx="7" cy="11" r="1.8" />
    </svg>
  );
}

export function IconBoat({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M12 3.5v11M12 4.5l6 8.5h-6" />
      <path d="M3.5 15h17l-2.2 3.2a2 2 0 0 1-1.6.8H7.3a2 2 0 0 1-1.6-.8L3.5 15Z" />
      <path d="M3 21.5c1.5 0 1.5-.8 3-.8s1.5.8 3 .8 1.5-.8 3-.8 1.5.8 3 .8 1.5-.8 3-.8 1.5.8 3 .8" />
    </svg>
  );
}

export function IconBuilding({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M4.5 20.5V5.5A1.5 1.5 0 0 1 6 4h7a1.5 1.5 0 0 1 1.5 1.5v15M14.5 10H18a1.5 1.5 0 0 1 1.5 1.5v9M3 20.5h18" />
      <path d="M8 8h3M8 11.5h3M8 15h3" />
    </svg>
  );
}

export function IconBank({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M3.5 9 12 4l8.5 5h-17ZM3 20.5h18M5.5 17.5h13" />
      <path d="M6.5 9.5v8M10 9.5v8M14 9.5v8M17.5 9.5v8" />
    </svg>
  );
}

export function IconCog({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18.4 5.6l-1.6 1.6M7.2 16.8l-1.6 1.6M18.4 18.4l-1.6-1.6M7.2 7.2 5.6 5.6" />
    </svg>
  );
}

export function IconSpark({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7Z" />
      <path d="M18.5 15.5c.25 1.6 1 2.35 2.5 2.5-1.5.15-2.25.9-2.5 2.5-.25-1.6-1-2.35-2.5-2.5 1.5-.15 2.25-.9 2.5-2.5Z" />
    </svg>
  );
}

export function IconMail({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}
