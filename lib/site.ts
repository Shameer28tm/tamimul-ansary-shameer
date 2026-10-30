import { profile, socialLinks } from "@/data/portfolio";

/**
 * Canonical origin. Override with NEXT_PUBLIC_SITE_URL once a custom domain is
 * connected; until then the verified Vercel deployment is canonical.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://shameer-portfolio-topaz.vercel.app").replace(/\/+$/, "");

export const site = {
  name: profile.fullName,
  shortName: profile.displayName,
  title: `${profile.fullName} — AI Engineer & Automation Builder`,
  description:
    "Tamimul Ansary Shameer is an AI engineer, automation builder and content creator from Kanyakumari, India, building AI agents, intelligent automation and full-stack products.",
  locale: "en_IN",
  /** Content last reviewed — used for sitemap lastModified so it does not churn on every build. */
  updated: "2026-10-30",
  sameAs: socialLinks.map((s) => s.url),
};

export const absoluteUrl = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
