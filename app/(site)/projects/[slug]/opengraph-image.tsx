import { ogCard, ogSize } from "@/lib/og";
import { projects } from "@/data/portfolio";

export const alt = "Project case study by Tamimul Ansary Shameer";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.filter((p) => p.published !== false).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return ogCard({ eyebrow: `Case study ${p?.number ?? ""} · ${p?.category ?? ""}`, title: p?.title ?? "Project", subtitle: p?.description ?? "" });
}
