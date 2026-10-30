import type { CSSProperties } from "react";
import { profile } from "@/data/portfolio";

/**
 * CSS-only intro: plays before hydration, exits on its own, never blocks content.
 * Skipped on repeat visits in the same session (html.intro-seen) and under reduced motion.
 */
export function Loader() {
  return (
    <div className="loader" aria-hidden="true">
      <div className="loader-inner">
        <p className="loader-name">
          {profile.displayName.split("").map((c, i) => (
            <span key={i} style={{ "--i": i } as CSSProperties}>
              {c}
            </span>
          ))}
        </p>
        <div className="loader-meta">
          <span>Portfolio</span>
          <span>©2026</span>
        </div>
        <div className="loader-bar">
          <span />
        </div>
      </div>
    </div>
  );
}
