import type { CSSProperties } from "react";

// template.tsx re-mounts on every route change (unlike layout.tsx), so the CSS
// entrance replays on each navigation. CSS rather than JS so a page can never
// be left invisible if scripts fail to hydrate.
export default function PageTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="enter"
      style={{ "--enter-y": "14px", "--enter-duration": "0.35s" } as CSSProperties}
    >
      {children}
    </div>
  );
}
