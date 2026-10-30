import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "Tamimul Ansary Shameer",
    "Shameer",
    "AI Engineer",
    "Automation Builder",
    "AI Agents",
    "Generative AI",
    "RAG",
    "Voice AI agent",
    "Kanyakumari",
    "Zcloud Digitech",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: "Curious ideas, intelligent systems, and products that work in the real world.",
    locale: site.locale,
    firstName: "Tamimul Ansary",
    lastName: "Shameer",
  },
  twitter: { card: "summary_large_image", title: site.title, description: "AI Engineer · Automation Builder · Content Creator" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: false },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#050608",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/** Runs before paint: decides whether the intro loader plays (once per session). */
const introScript = `try{var d=document.documentElement;d.classList.add('js');if(sessionStorage.getItem('tas-intro')){d.classList.add('intro-seen')}else{sessionStorage.setItem('tas-intro','1')}}catch(e){document.documentElement.classList.add('intro-seen')}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
