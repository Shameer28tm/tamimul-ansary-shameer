"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { profile, socialLinks } from "@/data/portfolio";
import { ease } from "@/lib/motion";

const links = [
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "work", label: "Work" },
  { id: "journey", label: "Journey" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(!open && y > 320 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  // Active section highlight (home only).
  useEffect(() => {
    if (!isHome) {
      setActive(null);
      return;
    }
    const sections = links.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome]);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Close on route change.
  useEffect(() => setOpen(false), [pathname]);

  // Menu: scroll lock, Escape, focus trap.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add("menu-open");
    const first = menuRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !menuRef.current) return;
      const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a,button"));
      const all = [toggleRef.current, ...items].filter(Boolean) as HTMLElement[];
      const idx = all.indexOf(document.activeElement as HTMLElement);
      if (e.shiftKey && idx <= 0) {
        e.preventDefault();
        all[all.length - 1].focus();
      } else if (!e.shiftKey && idx === all.length - 1) {
        e.preventDefault();
        all[0].focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.classList.remove("menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""} ${hidden ? "is-hidden" : ""} ${open ? "is-open" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="wordmark" aria-label={`${profile.fullName} — home`} data-cursor>
          <span className="wordmark-mark" aria-hidden="true">
            TAS
          </span>
          <span className="wordmark-name">
            Tamimul Ansary <em>Shameer</em>
          </span>
        </Link>
        <nav aria-label="Main" className="nav-links">
          {links.map((l) => (
            <Link key={l.id} href={`/#${l.id}`} aria-current={active === l.id ? "true" : undefined} className="nav-link">
              <span className="roll" data-text={l.label}>
                <span>{l.label}</span>
              </span>
            </Link>
          ))}
        </nav>
        <a className="nav-cta" href={`mailto:${profile.email}`}>
          <span className="pulse" aria-hidden="true" />
          Available for work
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="menu-label" aria-hidden="true">
            {open ? "Close" : "Menu"}
          </span>
          <span className="menu-icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: ease.inOut }}
          >
            <nav aria-label="Mobile" className="mobile-links">
              {links.map((l, i) => (
                <div className="mask" key={l.id}>
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.8, ease: ease.out, delay: 0.15 + i * 0.05 }}
                  >
                    <Link href={`/#${l.id}`} onClick={() => close(false)}>
                      <span className="mobile-index">0{i + 1}</span>
                      {l.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
            <motion.div
              className="mobile-foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <div>
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
