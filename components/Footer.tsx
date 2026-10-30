import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { profile, socialLinks } from "@/data/portfolio";
import { LocalTime } from "@/components/ContactActions";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div className="footer-col">
          <p className="label">Navigate</p>
          <ul>
            {[
              ["About", "/#about"],
              ["Work", "/#work"],
              ["Journey", "/#journey"],
              ["Certificates", "/#certificates"],
              ["Contact", "/#contact"],
            ].map(([l, h]) => (
              <li key={l}>
                <Link href={h}>{l}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <p className="label">Elsewhere</p>
          <ul>
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noopener noreferrer me">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${profile.email}`}>Email</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <p className="label">Local time</p>
          <p className="footer-time">
            <LocalTime /> · {profile.location}
          </p>
        </div>
        <a href="#main" className="back-top" data-cursor>
          Back to top <ArrowUp size={16} aria-hidden="true" />
        </a>
      </div>
      <p className="footer-mark" aria-hidden="true">
        Shameer<span>.</span>
      </p>
      <div className="shell footer-base">
        <span>© 2026 {profile.fullName}</span>
        <span>Built with curiosity, experiments, and too many ideas.</span>
      </div>
    </footer>
  );
}
