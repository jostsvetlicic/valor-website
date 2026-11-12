"use client";

import { useEffect } from "react";

/**
 * Marks the page as "navigated" the first time the visitor follows an
 * internal link or goes back/forward. Until then (the first page load, which
 * is what Google measures) page content is painted from the first frame and
 * only slides into place; after that, each new page also fades in. See
 * `.page-enter` in globals.css. Set on click, before the next page renders,
 * so its entrance starts with the right animation.
 */
export default function PageEnterFlag() {
  useEffect(() => {
    const root = document.documentElement;
    const mark = () => {
      root.dataset.navigated = "";
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", mark);
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a || a.getAttribute("target") === "_blank") return;
      const url = new URL((a as HTMLAnchorElement).href, location.href);
      if (url.origin === location.origin && url.pathname !== location.pathname) mark();
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", mark);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", mark);
    };
  }, []);
  return null;
}
