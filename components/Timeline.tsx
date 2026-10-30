"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { useRef } from "react";
import type { JourneyEntry } from "@/data/portfolio";
import { duration, ease } from "@/lib/motion";

/** Journey timeline — the spine draws with scroll, entries reveal as they arrive. */
export function Timeline({ entries }: { entries: JourneyEntry[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className="timeline">
      <span className="timeline-track" aria-hidden="true">
        <motion.span className="timeline-fill" style={reduce ? { scaleY: 1 } : { scaleY }} />
      </span>
      <ol className="timeline-list">
      {entries.map((e) => (
        <motion.li
          key={e.period}
          className={`timeline-item ${e.feature ? "is-feature" : ""}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: duration.reveal, ease: ease.out }}
        >
          <span className="timeline-dot" aria-hidden="true" />
          <p className="timeline-period">{e.period}</p>
          <div className="timeline-body">
            <h3>{e.title}</h3>
            <p>{e.copy}</p>
          </div>
        </motion.li>
      ))}
      </ol>
    </div>
  );
}
