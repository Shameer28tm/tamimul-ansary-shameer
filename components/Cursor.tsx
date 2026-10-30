"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { motionSettings } from "@/lib/motion";

const INTERACTIVE = "a, button, [data-cursor], input, textarea, select, label";

/** Desktop-only cursor ring. Native cursor stays visible for accuracy and accessibility. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<"idle" | "hover" | "label">("idle");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!motionSettings.cursor) return;
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduce.matches);
    update();
    fine.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(INTERACTIVE) as HTMLElement | null;
      const l = el?.dataset.cursorLabel;
      if (l) {
        setLabel(l);
        setState("label");
      } else setState(el ? "hover" : "idle");
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div className={`cursor is-${state} ${visible ? "is-visible" : ""}`} style={{ x: sx, y: sy }} aria-hidden="true">
      <span className="cursor-ring">{state === "label" ? label : null}</span>
    </motion.div>
  );
}
