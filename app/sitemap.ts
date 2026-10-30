import type { MetadataRoute } from "next";
import { projects } from "@/data/portfolio";
import { absoluteUrl, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.updated);
  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    ...projects
      .filter((p) => p.published !== false)
      .map((p) => ({ url: absoluteUrl(`/projects/${p.slug}`), lastModified, changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
