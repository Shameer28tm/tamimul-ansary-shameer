import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared Open Graph card (uses the built-in font, so it needs no network at build time). */
export function ogCard({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundImage: "linear-gradient(160deg, #0a0f1c 0%, #050608 60%)",
          color: "#f4f6fb",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: -200, right: -120, width: 760, height: 760, display: "flex", backgroundImage: "radial-gradient(circle, rgba(59,130,246,.38) 0%, rgba(59,130,246,0) 65%)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "#8b93a7", letterSpacing: 4, textTransform: "uppercase" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#3b82f6" }} />
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: title.length > 18 ? 88 : 112, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>{title}</div>
          <div style={{ fontSize: 34, color: "#c5cbd8", maxWidth: 960, lineHeight: 1.3 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#8b93a7" }}>
          <span>Tamimul Ansary Shameer</span>
          <span style={{ color: "#7cc4ff" }}>AI Engineer · Automation Builder</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
