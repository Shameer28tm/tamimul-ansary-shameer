import type { MetadataRoute } from "next";
const siteUrl = "https://shameer-portfolio-topaz.vercel.app";
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/admin/"] }, sitemap: `${siteUrl}/sitemap.xml` };
}
