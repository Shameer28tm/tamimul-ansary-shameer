import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://shameer-portfolio-topaz.vercel.app";
const personName = "Tamimul Ansary Shameer";
const linkedIn = "https://www.linkedin.com/in/shameerion";
const instagram = "https://instagram.com/shameerion";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Tamimul Ansary Shameer — AI Engineer & Automation Builder", template: "%s | Tamimul Ansary Shameer" },
  description: "Tamimul Ansary Shameer is an AI engineer, automation builder, automobile enthusiast, and content creator exploring intelligent systems and practical software from Kanyakumari, India.",
  keywords: ["Tamimul Ansary Shameer", "Shameer", "AI Engineer", "Automation Builder", "Automobile Enthusiast", "Generative AI", "AI Agents", "RAG", "Zcloud Digitech", "Kanyakumari"],
  authors: [{ name: personName }],
  creator: personName,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tamimul Ansary Shameer — AI Engineer & Automation Builder",
    description: "Curious ideas, intelligent systems, and products built for the real world.",
    url: siteUrl,
    siteName: personName,
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: personName, description: "AI Engineer · Automation Builder · Automobile Enthusiast · Content Creator" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: personName,
        alternateName: "Shameer",
        jobTitle: "AI Engineer and Automation Builder",
        description: "Automobile enthusiast, AI engineer, automation builder, and content creator focused on intelligent systems and practical software.",
        address: { "@type": "PostalAddress", addressLocality: "Kanyakumari", addressRegion: "Tamil Nadu", addressCountry: "IN" },
        url: siteUrl,
        sameAs: ["https://github.com/Shameer28tm", linkedIn, instagram],
        worksFor: { "@type": "Organization", name: "Zcloud Digitech" },
      },
      { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: personName, url: siteUrl, inLanguage: "en-IN", author: { "@id": `${siteUrl}/#person` } },
      { "@type": "ProfilePage", "@id": `${siteUrl}/#profile`, url: siteUrl, name: `${personName} — Portfolio`, mainEntity: { "@id": `${siteUrl}/#person` } },
    ],
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {children}
      </body>
    </html>
  );
}
