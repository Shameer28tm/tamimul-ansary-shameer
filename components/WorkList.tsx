"use client";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { Project } from "@/data/portfolio";
import { ProjectArt } from "@/components/ProjectArt";
import { duration, ease, motionSettings } from "@/lib/motion";

/**
 * Selected work index. Every row is a real link to its case study.
 * Fine-pointer desktops get a floating preview that follows the cursor; everyone
 * else sees the artwork inline. The switch is a CSS media query matching the JS
 * check, so nothing shifts on hydration and no content is hover-only.
 */
export function WorkList({ projects }: { projects: Project[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const [preview, setPreview] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (!motionSettings.projectPreview) return;
    const mq = window.matchMedia("(pointer: fine) and (hover: hover) and (min-width: 1100px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPreview(mq.matches && !rm.matches);
    update();
    mq.addEventListener("change", update);
    rm.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      rm.removeEventListener("change", update);
    };
  }, []);

  return (
    <div
      className={`work-list ${preview ? "has-preview" : ""}`}
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setHover(null)}
    >
      <ol>
        {projects.map((p, i) => (
          <motion.li
            key={p.slug}
            className={`work-row ${hover !== null && hover !== i ? "is-dim" : ""}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: duration.reveal, ease: ease.out, delay: (i % 3) * 0.06 }}
            onPointerEnter={() => setHover(i)}
          >
            <Link href={`/projects/${p.slug}`} className="work-link" data-cursor-label="View" onFocus={() => setHover(i)} onBlur={() => setHover(null)}>
              <span className="work-num">{p.number}</span>
              <div className="work-main">
                <h3 className="work-title">{p.title}</h3>
                <p className="work-desc">{p.description}</p>
              </div>
              <span className="work-cat">{p.category}</span>
              <span className="work-stack">{p.stack.slice(0, 3).join(" · ")}</span>
              <span className="work-arrow" aria-hidden="true">
                <ArrowUpRight size={22} />
              </span>
              <span className="work-line" aria-hidden="true" />
            </Link>
            <ProjectArt accent={p.accent} className="work-inline-art" />
          </motion.li>
        ))}
      </ol>

      {preview && (
        <motion.div className="work-preview" style={{ x: sx, y: sy }} aria-hidden="true">
          <AnimatePresence>
            {hover !== null && (
              <motion.div
                key={projects[hover].slug}
                className="work-preview-card"
                initial={{ opacity: 0, scale: 0.85, clipPath: "inset(50% 50% 50% 50%)" }}
                animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.55, ease: ease.out }}
              >
                <ProjectArt accent={projects[hover].accent} label={projects[hover].category} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
