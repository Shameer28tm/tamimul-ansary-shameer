import { ogCard, ogSize } from "@/lib/og";
import { profile } from "@/data/portfolio";

export const alt = "Tamimul Ansary Shameer — AI Engineer & Automation Builder";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({ eyebrow: "Portfolio · Kanyakumari, India", title: profile.fullName, subtitle: profile.hero });
}
