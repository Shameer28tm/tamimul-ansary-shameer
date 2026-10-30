"use client";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useRef } from "react";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <>
      <motion.span className="scroll-word" style={{ opacity }}>
        {children}
      </motion.span>{" "}
    </>
  );
}

/** Paragraph whose words brighten in reading order as it scrolls through the viewport. */
export function ScrollText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(/\s+/).filter(Boolean);
  if (reduce)
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  return (
    <p ref={ref} className={`scroll-text ${className}`}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}
