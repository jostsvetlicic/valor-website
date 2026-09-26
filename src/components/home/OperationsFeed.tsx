/**
 * The hero's signature: a live operations feed. A quiet vertical stream of
 * events that looks like a real business running itself around the clock —
 * events scroll up continuously and never stop, fading in at the bottom and out
 * at the top through a mask.
 *
 * The loop is pure CSS (see `.ops-feed*` in globals.css): the list is rendered
 * twice and the track slides up by exactly half its height, so the seam is
 * invisible. Under prefers-reduced-motion it sits static, showing the first few
 * rows. Colours come from the tokens (gold #C9A24B, cream ≈ #F5F5F0, muted).
 */

type FeedEvent = {
  time: string;
  label: string;
  detail: string;
  status: string;
};

const events: FeedEvent[] = [
  { time: "23:04", label: "New inquiry received", detail: "Villa booking", status: "auto-replied 0.8s" },
  { time: "23:04", label: "Lead qualified", detail: "budget + dates confirmed", status: "passed to owner" },
  { time: "23:07", label: "Booking confirmed", detail: "calendar updated", status: "reminder scheduled" },
  { time: "01:12", label: "Payment received", detail: "auto-matched to order", status: "reconciled" },
  { time: "02:38", label: "After-hours message", detail: "pricing question", status: "answered instantly" },
  { time: "07:15", label: "Follow-up sent", detail: "no-reply lead", status: "re-engaged" },
  { time: "09:22", label: "Report generated", detail: "weekly revenue", status: "delivered" },
];

function Row({ event }: { event: FeedEvent }) {
  return (
    <li className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-3 py-[0.62rem] md:gap-x-4">
      <time className="font-mono text-[0.72rem] tabular-nums text-gold">
        {event.time}
      </time>
      <span className="min-w-0 truncate text-[0.8rem] leading-relaxed text-cream md:text-[0.85rem]">
        {event.label} <span className="text-grey">— {event.detail}</span>
      </span>
      <span className="whitespace-nowrap font-mono text-[0.72rem] text-gold">
        <span aria-hidden="true">✓</span> {event.status}
      </span>
    </li>
  );
}

export default function OperationsFeed() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.03] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl backdrop-saturate-[180%]">
      {/* live header */}
      <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-5 py-3.5">
        <span
          className="ops-live-dot h-1.5 w-1.5 rounded-full bg-gold"
          aria-hidden="true"
        />
        <span className="text-[0.68rem] uppercase tracking-[0.22em] text-grey">
          Operations · running now
        </span>
      </div>

      {/* masked, auto-scrolling feed */}
      <div
        className="ops-feed relative h-[15rem] overflow-hidden sm:h-[18rem] lg:h-[23rem]"
        role="img"
        aria-label="A live feed of the operations Valor's systems handle automatically, around the clock: inquiries answered in under a second, leads qualified, bookings confirmed, payments reconciled, and follow-ups sent — all while the business is asleep."
      >
        <div className="ops-feed-track">
          <ul className="px-5">
            {events.map((event, i) => (
              <Row key={`a-${i}`} event={event} />
            ))}
          </ul>
          <ul className="px-5" aria-hidden="true">
            {events.map((event, i) => (
              <Row key={`b-${i}`} event={event} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
