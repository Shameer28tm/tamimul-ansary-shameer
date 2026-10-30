import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github, Mail } from "lucide-react";
import { profile, projects } from "@/data/portfolio";
import { ProjectArt } from "@/components/ProjectArt";
import { Reveal, ClipReveal } from "@/components/Reveal";
import { SplitReveal } from "@/components/SplitReveal";
import { Magnetic } from "@/components/Magnetic";
import { jsonLd, projectGraph } from "@/lib/schema";

const list = projects.filter((p) => p.published !== false);
const find = (slug: string) => list.find((p) => p.slug === slug);

export const dynamicParams = false;
export function generateStaticParams() {
  return list.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return {};
  const title = `${p.title} — ${p.category}`;
  const description = `${p.description} Built by ${profile.fullName} with ${p.stack.join(", ")}.`;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { type: "article", url: `/projects/${p.slug}`, title: `${p.title} | ${profile.fullName}`, description: p.description },
    twitter: { card: "summary_large_image", title: `${p.title} | ${profile.fullName}`, description: p.description },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = find((await params).slug);
  if (!p) notFound();
  const idx = list.indexOf(p);
  const next = list[(idx + 1) % list.length];
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(`About ${p.title}`)}`;

  return (
    <main id="main" className="case">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(projectGraph(p)) }} />
      <div className="shell">
        <nav aria-label="Breadcrumb" className="crumbs">
          <Link href="/#work" className="back-link" data-cursor>
            <ArrowLeft size={16} aria-hidden="true" /> All work
          </Link>
          <span className="label" aria-hidden="true">
            {p.number} / {String(list.length).padStart(2, "0")}
          </span>
        </nav>

        <header className="case-head">
          <Reveal>
            <p className="label">{p.category}</p>
          </Reveal>
          <SplitReveal as="h1" className="case-title" segments={p.title} />
          <Reveal delay={0.2}>
            <p className="case-lead">{p.description}</p>
          </Reveal>
        </header>

        <ClipReveal className="case-hero">
          <ProjectArt accent={p.accent} label={`${p.number} — ${p.title}`} />
        </ClipReveal>

        <div className="case-grid">
          <aside className="case-meta" aria-label="Project facts">
            <dl>
              <div>
                <dt className="label">Category</dt>
                <dd>{p.category}</dd>
              </div>
              <div>
                <dt className="label">Built by</dt>
                <dd>{profile.fullName}</dd>
              </div>
              <div>
                <dt className="label">Stack</dt>
                <dd>
                  <ul className="chips">
                    {p.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
            <div className="case-links">
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <span>Live demo</span> <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
              {p.repoUrl && (
                <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <Github size={16} aria-hidden="true" /> <span>Source code</span>
                </a>
              )}
              {!p.liveUrl && !p.repoUrl && (
                <a href={mailto} className="btn btn-ghost">
                  <Mail size={16} aria-hidden="true" /> <span>Ask for a walkthrough</span>
                </a>
              )}
            </div>
          </aside>

          <div className="case-body">
            {p.problem && (
              <Reveal as="section" className="case-block">
                <h2>The problem</h2>
                <p>{p.problem}</p>
              </Reveal>
            )}
            {p.solution && (
              <Reveal as="section" className="case-block">
                <h2>The solution</h2>
                <p>{p.solution}</p>
              </Reveal>
            )}
            {p.features && p.features.length > 0 && (
              <Reveal as="section" className="case-block">
                <h2>Key features</h2>
                <ol className="feature-list">
                  {p.features.map((f, i) => (
                    <li key={f}>
                      <span className="label">{String(i + 1).padStart(2, "0")}</span>
                      {f}
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}
            <Reveal as="section" className="case-block">
              <h2>Technology</h2>
              <p>
                {p.title} is built with {p.stack.slice(0, -1).join(", ")}
                {p.stack.length > 1 ? " and " : ""}
                {p.stack[p.stack.length - 1]}.
              </p>
            </Reveal>
            {p.media && p.media.length > 0 && (
              <section className="case-block case-media" aria-label="Screenshots">
                {p.media.map((m) => (
                  <ClipReveal key={m.src} className="case-shot">
                    <Image src={m.src} alt={m.alt} width={m.width} height={m.height} sizes="(max-width: 900px) 100vw, 60vw" />
                  </ClipReveal>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>

      <Link href={`/projects/${next.slug}`} className="next-project" data-cursor-label="Next">
        <span className="shell">
          <span className="label">Next project — {next.number}</span>
          <span className="next-title">
            {next.title}
            <ArrowUpRight aria-hidden="true" />
          </span>
          <span className="next-art" aria-hidden="true">
            <ProjectArt accent={next.accent} />
          </span>
        </span>
      </Link>

      <div className="shell case-foot">
        <Magnetic>
          <a href={mailto} className="btn btn-primary" data-cursor>
            <span>Discuss a similar build</span> <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </Magnetic>
      </div>
    </main>
  );
}
