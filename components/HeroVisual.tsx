"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useEffect, useRef } from "react";
import { motionSettings } from "@/lib/motion";

/** Pointer-following light for the hero. Writes CSS variables only — no React re-renders. */
export function HeroLight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el || !window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(2)}%`);
        el.style.setProperty("--my", `${(((e.clientY - r.top) / r.height) * 100).toFixed(2)}%`);
      });
    };
    el.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", move);
    };
  }, []);
  return <div ref={ref} className="hero-light" aria-hidden="true" />;
}

/** Portrait with intro clip reveal (CSS) and scroll parallax (Framer). */
export function HeroPortrait({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${motionSettings.heroParallax * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  return (
    <div ref={ref} className="hero-portrait intro-clip">
      <motion.div className="hero-portrait-inner" style={reduce ? undefined : { y, scale }}>
        <Image src={src} alt={alt} fill priority sizes="(max-width: 900px) 70vw, 30vw" />
      </motion.div>
      <span className="hero-portrait-tag" aria-hidden="true">
        <i /> Kanyakumari, IN
      </span>
    </div>
  );
}
