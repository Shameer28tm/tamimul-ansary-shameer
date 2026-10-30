"use client";
import { motion, type HTMLMotionProps } from "framer-motion";
import { distance, duration, ease, motionSettings } from "@/lib/motion";

type Props = { children: React.ReactNode; delay?: number; className?: string; y?: number; as?: "div" | "li" | "article" | "section" };

/** Fade-and-rise when entering the viewport (once). Reduced motion is handled by MotionConfig. */
export function Reveal({ children, delay = 0, className = "", y = distance.reveal, as = "div" }: Props) {
  const props: HTMLMotionProps<"div"> = {
    className,
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: motionSettings.revealMargin },
    transition: { duration: duration.reveal, delay, ease: ease.out },
  };
  const Tag = motion[as] as typeof motion.div;
  return <Tag {...props}>{children}</Tag>;
}

/** Clip-path image/panel reveal (bottom → top wipe). */
export function ClipReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: motionSettings.revealMargin }}
      transition={{ duration: duration.slow, delay, ease: ease.inOut }}
    >
      {children}
    </motion.div>
  );
}
