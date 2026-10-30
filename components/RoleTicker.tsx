"use client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ease, motionSettings } from "@/lib/motion";

/** Cycles through roles with a masked vertical slide. All roles stay in the DOM for crawlers/screen readers. */
export function RoleTicker({ roles }: { roles: string[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || roles.length < 2) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setI((n) => (n + 1) % roles.length);
    }, motionSettings.roleInterval);
    return () => window.clearInterval(id);
  }, [reduce, roles.length]);

  return (
    <span className="ticker">
      <span className="sr-only">{roles.join(", ")}</span>
      <span className="ticker-mask" aria-hidden="true">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={roles[i]}
            className="ticker-word"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-105%" }}
            transition={{ duration: 0.75, ease: ease.out }}
          >
            {roles[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
