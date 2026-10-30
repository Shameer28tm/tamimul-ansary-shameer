"use client";
import { motion } from "framer-motion";
import { Fragment } from "react";
import { duration, ease, motionSettings, stagger } from "@/lib/motion";

type Segment = { text: string; em?: boolean };

/**
 * Masked word-by-word reveal for headings. Accepts plain text or segments
 * (segments with `em` render in the editorial serif). `|` forces a line break.
 * Screen readers get the plain sentence once via aria-label on the wrapper.
 */
export function SplitReveal({ segments, className = "", as = "h2", delay = 0, id }: { segments: Segment[] | string; className?: string; as?: "h1" | "h2" | "h3" | "p" | "blockquote"; delay?: number; id?: string }) {
  const segs: Segment[] = typeof segments === "string" ? [{ text: segments }] : segments;
  const label = segs.map((s) => s.text).join(" ").replace(/\s*\|\s*/g, " ").replace(/\s+/g, " ").trim();
  let index = 0;
  const Tag = motion[as] as typeof motion.h2;

  return (
    <Tag
      id={id}
      className={`split ${className}`}
      aria-label={label}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: motionSettings.revealMargin }}
    >
      {segs.map((seg, si) =>
        seg.text.split(/(\|)/).map((chunk, ci) =>
          chunk === "|" ? (
            <br key={`${si}-${ci}`} />
          ) : (
            <Fragment key={`${si}-${ci}`}>
              {chunk
                .split(/\s+/)
                .filter(Boolean)
                .map((word, wi) => {
                  const i = index++;
                  return (
                    <Fragment key={wi}>
                      <span className="split-mask" aria-hidden="true">
                        <motion.span
                          className={seg.em ? "split-word em" : "split-word"}
                          variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
                          transition={{ duration: duration.reveal, ease: ease.out, delay: delay + i * stagger.words }}
                        >
                          {word}
                        </motion.span>
                      </span>{" "}
                    </Fragment>
                  );
                })}
            </Fragment>
          ),
        ),
      )}
    </Tag>
  );
}
