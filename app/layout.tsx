import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://shameer.dev"),
  title: { default: "Tamimul Ansary Shameer — AI Engineer & Automation Builder", template: "%s | Tamimul Ansary Shameer" },
  description: "Tamimul Ansary Shameer is an AI Engineer, automation builder, content creator, and independent founder building intelligent systems from Kanyakumari, India.",
  keywords: ["Tamimul Ansary Shameer", "Shameer", "AI Engineer", "Automation Builder", "Generative AI", "AI Agents", "RAG", "Zcloud Digitech", "Kanyakumari"],
  authors: [{ name: "Tamimul Ansary Shameer" }],
  alternates: { canonical: "/" },
  openGraph: { title: "Tamimul Ansary Shameer — AI Engineer & Automation Builder", description: "Curious ideas, intelligent systems, and products that work in the real world.", type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image", title: "Tamimul Ansary Shameer", description: "AI Engineer · Automation Builder · Content Creator" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = { "@context": "https://schema.org", "@graph": [{ "@type": "Person", name: "Tamimul Ansary Shameer", alternateName: "Shameer", jobTitle: "AI Engineer and Automation Builder", address: { "@type": "PostalAddress", addressLocality: "Kanyakumari", addressRegion: "Tamil Nadu", addressCountry: "IN" }, sameAs: ["https://github.com/Shameer28tm", "https://www.linkedin.com/in/shamee28r", "https://www.instagram.com/_shamee28r?igsh=MXN5N200cWVldDFl"] }, { "@type": "Organization", name: "Zcloud Digitech", description: "An AI-focused startup initiative." }, { "@type": "WebSite", name: "Tamimul Ansary Shameer", url: "https://shameer.dev" }] };
  return <html lang="en" suppressHydrationWarning><body suppressHydrationWarning><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />{children}</body></html>;
}
