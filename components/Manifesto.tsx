"use client";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useRef } from "react";

const WORDS = ["Build.", "Break.", "Learn.", "Improve.", "Repeat."];

function Step({ word, i, progress }: { word: string; i: number; progress: MotionValue<number> }) {
  const start = 0.1 + i * 0.15;
  const opacity = useTransform(progress, [start, start + 0.12], [0.12, 1]);
  const x = useTransform(progress, [start, start + 0.12], ["4%", "0%"]);
  return (
    <motion.span className={`manifesto-word ${i === WORDS.length - 1 ? "accent" : ""}`} style={{ opacity, x }}>
      {word}
    </motion.span>
  );
}

/**
 * Sticky scroll sequence (no pinning library): the section is taller than the
 * viewport and its inner stage sticks while the mantra lights up word by word.
 */
export function Manifesto({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (reduce) {
    return (
      <div ref={ref} className="manifesto is-static">
        <div className="manifesto-stage shell">
          <div className="manifesto-copy">{children}</div>
          <p className="manifesto-words">
            {WORDS.map((w, i) => (
              <span key={w} className={`manifesto-word ${i === WORDS.length - 1 ? "accent" : ""}`}>
                {w}
              </span>
            ))}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="manifesto">
      <div className="manifesto-sticky">
        <div className="manifesto-stage shell">
          <div className="manifesto-copy">{children}</div>
          <p className="manifesto-words" aria-label={WORDS.join(" ")}>
            {WORDS.map((w, i) => (
              <Step key={w} word={w} i={i} progress={scrollYProgress} />
            ))}
          </p>
          <motion.span className="manifesto-progress" style={{ scaleX: bar }} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
