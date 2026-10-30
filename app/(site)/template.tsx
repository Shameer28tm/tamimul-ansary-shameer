"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { ease } from "@/lib/motion";

/** Client-side only flag: false after the first hydrated mount. Never mutated on the server. */
let hydrated = false;

/**
 * Route transition. template.tsx re-mounts on every navigation; the first
 * (server-rendered) mount is static so the CSS intro owns the initial load.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const animate = typeof window !== "undefined" && hydrated;
  useEffect(() => {
    hydrated = true;
  }, []);
  return (
    <>
      {animate && (
        <motion.div
          className="route-curtain"
          aria-hidden="true"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.8, ease: ease.inOut }}
        />
      )}
      <motion.div
        initial={animate ? { opacity: 0, y: 40 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: ease.out, delay: animate ? 0.25 : 0 }}
      >
        {children}
      </motion.div>
    </>
  );
}
