import { certificates, exploring, profile, projects, type Project } from "@/data/portfolio";
import { absoluteUrl, site, siteUrl } from "@/lib/site";

export const ids = {
  person: `${siteUrl}/#person`,
  website: `${siteUrl}/#website`,
  profilePage: `${siteUrl}/#profilepage`,
  projectList: `${siteUrl}/#work`,
};

/** Person entity. Only earned credentials are listed (the in-progress degree is excluded). */
export function personSchema() {
  return {
    "@type": "Person",
    "@id": ids.person,
    name: profile.fullName,
    alternateName: profile.displayName,
    givenName: "Tamimul Ansary",
    familyName: "Shameer",
    url: siteUrl,
    image: absoluteUrl(profile.image),
    email: `mailto:${profile.email}`,
    jobTitle: "AI Engineer",
    description: site.description,
    address: { "@type": "PostalAddress", addressLocality: "Kanyakumari", addressRegion: "Tamil Nadu", addressCountry: "IN" },
    knowsAbout: ["Artificial intelligence", "AI agents", "Intelligent automation", "Retrieval-augmented generation", "Voice AI", "Full-stack development", ...exploring.filter((t) => !["AI agents", "RAG", "Mathematics", "Physics"].includes(t))],
    hasCredential: certificates
      .filter((c) => c.published !== false && c.id !== "niche-be")
      .map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: c.title,
        credentialCategory: "certificate",
        recognizedBy: { "@type": "Organization", name: c.issuer },
        ...(c.credentialUrl ? { url: c.credentialUrl } : {}),
      })),
    sameAs: site.sameAs,
  };
}

export function projectSchema(p: Project) {
  const url = absoluteUrl(`/projects/${p.slug}`);
  return {
    "@type": "CreativeWork",
    "@id": `${url}#work`,
    name: p.title,
    url,
    description: p.description,
    genre: p.category,
    keywords: p.stack.join(", "),
    creator: { "@id": ids.person },
    ...(p.liveUrl || p.repoUrl ? { sameAs: [p.liveUrl, p.repoUrl].filter(Boolean) } : {}),
  };
}

export function homeGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(),
      { "@type": "WebSite", "@id": ids.website, url: siteUrl, name: site.name, description: site.description, inLanguage: "en-IN", publisher: { "@id": ids.person } },
      {
        "@type": "ProfilePage",
        "@id": ids.profilePage,
        url: siteUrl,
        name: site.title,
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.person },
        mainEntity: { "@id": ids.person },
        dateModified: site.updated,
        inLanguage: "en-IN",
      },
      {
        "@type": "ItemList",
        "@id": ids.projectList,
        name: "Selected projects",
        itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(`/projects/${p.slug}`), name: p.title })),
      },
    ],
  };
}

export function projectGraph(p: Project) {
  const url = absoluteUrl(`/projects/${p.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      { ...projectSchema(p), isPartOf: { "@id": ids.website } },
      { "@type": "Person", "@id": ids.person, name: profile.fullName, url: siteUrl, sameAs: site.sameAs },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Work", item: `${siteUrl}/#work` },
          { "@type": "ListItem", position: 3, name: p.title, item: url },
        ],
      },
    ],
  };
}

/** Safe JSON for <script type="application/ld+json"> (escapes `<` to prevent tag breakout). */
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
