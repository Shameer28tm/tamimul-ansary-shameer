import type { Metadata } from "next";
import Link from "next/link";
import { profile, projects, articles, journey, toolkit, certificates, exploring, socialLinks } from "@/data/portfolio";
import { requireAdmin } from "@/lib/admin-session";
import { logout } from "./login/actions";

export const metadata: Metadata = { robots: { index: false, follow: false }, title: "Content studio" };
export const dynamic = "force-dynamic";

const groups: [string, unknown][] = [
  ["Identity", profile],
  ["Projects", projects],
  ["Writing", articles],
  ["Journey", journey],
  ["Toolkit", toolkit],
  ["Exploring", exploring],
  ["Socials", socialLinks],
  ["Certificates", certificates],
];

export default async function Admin() {
  await requireAdmin();
  return (
    <main id="main" className="admin-shell">
      <header>
        <div>
          <p className="label">Private content studio</p>
          <h1>Portfolio canvas</h1>
        </div>
        <div className="admin-actions">
          <Link href="/" target="_blank">
            Open public site ↗
          </Link>
          <form action={logout}>
            <button type="submit">Sign out</button>
          </form>
        </div>
      </header>
      <p className="admin-note">
        This is the structured content source for the portfolio. Edit <code>data/portfolio.ts</code> to publish changes.
        Project case-study fields (<code>problem</code>, <code>solution</code>, <code>liveUrl</code>, <code>repoUrl</code>,{" "}
        <code>media</code>) appear on the site as soon as they are filled in.
      </p>
      <div className="admin-grid">
        {groups.map(([name, data]) => (
          <section key={name}>
            <h2>{name}</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </section>
        ))}
      </div>
    </main>
  );
}
