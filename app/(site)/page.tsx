import { Fragment, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { articles, certificates, current, exploring, journey, profile, projects, socialLinks, toolkit } from "@/data/portfolio";
import { Reveal, ClipReveal } from "@/components/Reveal";
import { SplitReveal } from "@/components/SplitReveal";
import { RoleTicker } from "@/components/RoleTicker";
import { HeroLight, HeroPortrait } from "@/components/HeroVisual";
import { Marquee } from "@/components/Marquee";
import { ScrollText } from "@/components/ScrollText";
import { WorkList } from "@/components/WorkList";
import { Manifesto } from "@/components/Manifesto";
import { Timeline } from "@/components/Timeline";
import { Magnetic } from "@/components/Magnetic";
import { CopyEmail } from "@/components/ContactActions";
import { homeGraph, jsonLd } from "@/lib/schema";

const icons = { GitHub: Github, LinkedIn: Linkedin, Instagram };
const published = <T extends { published?: boolean }>(items: T[]) => items.filter((i) => i.published !== false);

/** Splits a line into characters for the CSS intro (screen readers get the line via the parent's sr-only copy). */
function Chars({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span className="line" aria-hidden="true">
      {text.split(" ").map((word, wi, arr) => (
        <Fragment key={wi}>
          <span className="word">
            {word.split("").map((c, ci) => {
              const i = offset + arr.slice(0, wi).join("").length + ci;
              return (
                <span className="char" key={ci} style={{ "--i": i } as CSSProperties}>
                  {c}
                </span>
              );
            })}
          </span>
          {wi < arr.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
}

function SectionHead({ index, label, id, children }: { index: string; label: string; id?: string; children: React.ReactNode }) {
  return (
    <div className="section-head">
      <Reveal className="section-label">
        <span className="label">
          <span className="label-index">{index}</span> {label}
        </span>
      </Reveal>
      <div className="section-title" id={id}>
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const projectList = published(projects);
  const certs = published(certificates).sort((a, b) => a.order - b.order);
  const posts = published(articles);

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(homeGraph()) }} />

      {/* ───────────── Hero ───────────── */}
      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-grid" />
          <div className="hero-orb" />
          <svg className="hero-orbit" viewBox="0 0 800 800">
            <circle cx="400" cy="400" r="300" pathLength={1} />
            <circle cx="400" cy="400" r="390" pathLength={1} />
          </svg>
        </div>
        <HeroLight />

        <div className="shell hero-inner">
          <div className="hero-meta intro-fade" style={{ "--d": 0 } as CSSProperties}>
            <span className="label">Portfolio ©2026</span>
            <span className="label">Based in {profile.location}</span>
            <span className="label hero-status">
              <span className="pulse" aria-hidden="true" /> Open to freelance AI &amp; automation work
            </span>
          </div>

          <h1 id="hero-title" className="hero-title">
            <span className="sr-only">
              {profile.fullName} — {profile.roles.join(", ")}
            </span>
            <Chars text="Tamimul Ansary" />
            <span className="line-break" />
            <span className="hero-title-row">
              <Chars text="Shameer" offset={13} />
              <em className="hero-dot intro-fade" style={{ "--d": 7 } as CSSProperties} aria-hidden="true">
                .
              </em>
            </span>
          </h1>

          <div className="hero-body">
            <HeroPortrait src={profile.image} alt={`Portrait of ${profile.fullName}`} />
            <div className="hero-copy">
              <p className="hero-role intro-fade" style={{ "--d": 4 } as CSSProperties}>
                <span className="label">Currently</span>
                <RoleTicker roles={profile.roles} />
              </p>
              <p className="hero-statement intro-fade" style={{ "--d": 5 } as CSSProperties}>
                {profile.hero}
              </p>
              <div className="hero-actions intro-fade" style={{ "--d": 6 } as CSSProperties}>
                <Magnetic>
                  <a href="#work" className="btn btn-primary" data-cursor>
                    <span>Explore my work</span>
                    <ArrowDown size={16} aria-hidden="true" />
                  </a>
                </Magnetic>
                <Magnetic>
                  <a href="#about" className="btn btn-ghost" data-cursor>
                    <span>Read my story</span>
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
        <a href="#about" className="scroll-cue intro-fade" style={{ "--d": 8 } as CSSProperties} aria-label="Scroll to About">
          <span />
        </a>
      </section>

      <Marquee items={[...profile.roles, "AI Agents", "Intelligent Automation"]} />

      {/* ───────────── About ───────────── */}
      <section id="about" className="section about" aria-labelledby="about-title">
        <div className="shell">
          <SectionHead index="01" label="About">
            <SplitReveal id="about-title" segments={[{ text: "Curiosity starts it. | Building makes it" }, { text: "real.", em: true }]} />
          </SectionHead>

          <div className="about-grid">
            <Reveal className="about-answer">
              <h3 className="label">Who is Tamimul Ansary Shameer?</h3>
              <p>
                Tamimul Ansary Shameer is an AI engineer, automation builder and content creator based in {profile.location}. He
                builds AI agents, automation systems and full-stack products, and is currently working on Zcloud Digitech, an
                AI-focused startup initiative.
              </p>
            </Reveal>
            <div className="about-story">
              <ScrollText className="about-lead" text={profile.about[0]} />
              {profile.about.slice(1).map((p, i) => (
                <Reveal key={p} delay={i * 0.08}>
                  <p className="about-p">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <dl className="now-grid" aria-label="Right now">
            {current.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08} className="now-item">
                <dt className="label">{t}</dt>
                <dd>{d}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────────── Expertise ───────────── */}
      <section id="expertise" className="section expertise" aria-labelledby="expertise-title">
        <div className="shell">
          <SectionHead index="02" label="Expertise">
            <SplitReveal id="expertise-title" segments={[{ text: "Tools I work" }, { text: "with.", em: true }]} />
          </SectionHead>
          <ol className="skills">
            {toolkit.map(([title, items], i) => (
              <Reveal as="li" key={title} className="skill-row" delay={i * 0.05}>
                <span className="skill-num">0{i + 1}</span>
                <h3>{title}</h3>
                <ul className="chips" aria-label={`${title} tools`}>
                  {items.split(" · ").map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── Work ───────────── */}
      <section id="work" className="section work" aria-labelledby="work-title">
        <div className="shell">
          <SectionHead index="03" label="Selected work">
            <div className="work-head">
              <SplitReveal id="work-title" segments={[{ text: "Things I've" }, { text: "built.", em: true }]} />
              <Reveal className="work-intro">
                <p>
                  Experiments made useful. Products made real.
                  <span className="label"> ({String(projectList.length).padStart(2, "0")}) projects</span>
                </p>
              </Reveal>
            </div>
          </SectionHead>
          <WorkList projects={projectList} />
        </div>
      </section>

      {/* ───────────── Practice ───────────── */}
      <section className="practice" aria-labelledby="practice-title">
        <Manifesto>
          <p className="label">
            <span className="label-index">04</span> Practice
          </p>
          <h2 id="practice-title">
            I learn by <em>building.</em>
          </h2>
          <p>I do not believe the best way to understand technology is only through tutorials.</p>
          <p>Most of what I learn comes from trying to build something real, breaking it, debugging it, and rebuilding it.</p>
        </Manifesto>
      </section>

      {/* ───────────── Journey ───────────── */}
      <section id="journey" className="section journey" aria-labelledby="journey-title">
        <div className="shell journey-grid">
          <div className="journey-side">
            <SectionHead index="05" label="Journey">
              <SplitReveal id="journey-title" segments={[{ text: "How curiosity became | a" }, { text: "direction.", em: true }]} />
            </SectionHead>
          </div>
          <Timeline entries={journey} />
        </div>
      </section>

      {/* ───────────── Certificates ───────────── */}
      <section id="certificates" className="section certificates" aria-labelledby="certificates-title">
        <div className="shell">
          <SectionHead index="06" label="Achievements & certifications">
            <SplitReveal id="certificates-title" segments={[{ text: "Verified" }, { text: "learning.", em: true }]} />
          </SectionHead>
          <div className="cert-grid">
            {certs.map((c, i) => (
              <Reveal as="article" key={c.id} className="cert-card" delay={(i % 2) * 0.08}>
                <ClipReveal className="cert-media">
                  <Image src={c.image} alt={c.imageAlt} fill sizes="(max-width: 768px) 100vw, 45vw" />
                </ClipReveal>
                <div className="cert-copy">
                  <p className="label">
                    {c.issuer}
                    {c.issueDate ? ` · ${c.issueDate}` : ""}
                  </p>
                  <h3>{c.title}</h3>
                  {c.description && <p className="cert-desc">{c.description}</p>}
                  {c.credentialId && <p className="cert-id">{c.credentialId.includes(":") ? c.credentialId : `ID: ${c.credentialId}`}</p>}
                  {c.credentialUrl && (
                    <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                      View credential <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Exploring ───────────── */}
      <section id="exploring" className="section exploring" aria-labelledby="exploring-title">
        <div className="shell">
          <SectionHead index="07" label="Currently exploring">
            <SplitReveal id="exploring-title" segments={[{ text: "Where the curiosity" }, { text: "points next.", em: true }]} />
          </SectionHead>
          <ul className="explore-cloud">
            {exploring.map((t, i) => (
              <Reveal as="li" key={t} delay={i * 0.05} className="explore-item">
                <span className="explore-num">{String(i + 1).padStart(2, "0")}</span>
                {t}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── Writing ───────────── */}
      <section id="writing" className="section writing" aria-labelledby="writing-title">
        <div className="shell">
          <SectionHead index="08" label="Field notes">
            <SplitReveal id="writing-title" segments={[{ text: "Writing &" }, { text: "notes.", em: true }]} />
          </SectionHead>
          <ul className="notes">
            {posts.map((a, i) => (
              <Reveal as="li" key={a.title} className="note" delay={i * 0.05}>
                <span className="label">{a.category}</span>
                <div>
                  <h3>{a.title}</h3>
                  <p>{a.excerpt}</p>
                </div>
                <span className="note-status">{a.date}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── Quote ───────────── */}
      <section className="section quote" aria-label="Philosophy">
        <div className="shell">
          <ScrollText
            className="quote-text"
            text="“Sky is the limit—but for those who engineer the intelligence and build the systems, the sky is just the starting grid.”"
          />
        </div>
      </section>

      {/* ───────────── Contact ───────────── */}
      <section id="contact" className="section contact" aria-labelledby="contact-title">
        <div className="contact-glow" aria-hidden="true" />
        <div className="shell">
          <p className="label">
            <span className="label-index">09</span> Work together
          </p>
          <SplitReveal id="contact-title" className="contact-title" segments={[{ text: "Bring me the problem. | I'll find the" }, { text: "system.", em: true }]} />
          <div className="contact-grid">
            <Reveal className="contact-copy">
              <p>
                I am open to freelance AI and automation work, product collaborations, and technology problems interesting
                enough to deserve a proper build.
              </p>
              <div className="contact-mail">
                <a href={`mailto:${profile.email}`} className="text-link">
                  <Mail size={16} aria-hidden="true" /> {profile.email}
                </a>
                <CopyEmail email={profile.email} />
              </div>
            </Reveal>
            <Magnetic strength={0.45} className="contact-cta-wrap">
              <a href={`mailto:${profile.email}`} className="contact-cta" data-cursor>
                <span>Let&apos;s talk</span>
                <ArrowUpRight size={28} aria-hidden="true" />
              </a>
            </Magnetic>
          </div>
          <ul className="socials">
            {socialLinks.map((l) => {
              const Icon = icons[l.label];
              return (
                <li key={l.label}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer me" className="social">
                    <Icon size={18} aria-hidden="true" />
                    <span>{l.label}</span>
                    <ArrowUpRight size={16} aria-hidden="true" className="social-arrow" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
