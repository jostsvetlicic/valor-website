import type { CSSProperties } from "react";

// template.tsx re-mounts on every route change (unlike layout.tsx), so the CSS
// entrance replays on each navigation. CSS rather than JS so a page can never
// be left invisible if scripts fail to hydrate. `.page-enter` only slides on
// the first load (fast Largest Contentful Paint) and also fades afterwards.
export default function PageTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="page-enter"
      style={{ "--enter-y": "14px", "--enter-duration": "0.35s" } as CSSProperties}
    >
      {children}
    </div>
  );
}
