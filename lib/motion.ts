/**
 * Motion system — single source of truth for JS-driven animation.
 * CSS-driven motion (loader, hero intro, marquee, hovers) reads the matching
 * custom properties in app/globals.css (`--ease-out`, `--dur-*`, `--intro`).
 * Tune these values against reference screenshots/recordings without touching components.
 */
export type Bezier = [number, number, number, number];

export const ease: Record<"out" | "inOut" | "soft", Bezier> = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.76, 0, 0.24, 1],
  soft: [0.33, 1, 0.68, 1],
};

export const duration = { fast: 0.35, base: 0.7, reveal: 0.9, slow: 1.2 };

export const stagger = { chars: 0.022, words: 0.05, items: 0.08 };

/** Distance (px) content travels during reveal. */
export const distance = { reveal: 28, word: "110%" };

export const motionSettings = {
  /** Custom cursor ring on fine pointers. */
  cursor: true,
  /** Magnetic pull strength for buttons (0 disables). */
  magnetic: 0.35,
  /** Hero portrait parallax as a fraction of scroll. */
  heroParallax: 0.18,
  /** Milliseconds each role stays visible in the hero ticker. */
  roleInterval: 2400,
  /** Floating project preview on desktop work list. */
  projectPreview: true,
  /** Viewport margin for whileInView reveals. */
  revealMargin: "-12% 0px -12% 0px",
};
