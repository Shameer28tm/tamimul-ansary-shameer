"use client";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Like Framer's useReducedMotion, but always `false` on the server render and
 * the first client render, so components that switch markup on it never cause
 * a hydration mismatch. Flips to the user's real preference right after mount.
 */
export function useReducedMotionSafe() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !!reduce;
}
