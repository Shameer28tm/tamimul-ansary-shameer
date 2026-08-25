"use client";
import { motion, useReducedMotion } from "framer-motion";
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 18 }} whileInView={reduce ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: .65, delay, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}
