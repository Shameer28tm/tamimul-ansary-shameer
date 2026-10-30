import type { ProjectAccent } from "@/data/portfolio";

/**
 * Generative SVG compositions — one visual language per project type.
 * Animated with CSS (transform/opacity/stroke-dashoffset only); paused under reduced motion.
 */
export function ProjectArt({ accent, label, className = "" }: { accent: ProjectAccent; label?: string; className?: string }) {
  return (
    <div className={`art art-${accent} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`glow-${accent}`} cx="50%" cy="55%" r="60%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity=".35" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#glow-${accent})`} />
        {accent === "grid" && <GridArt />}
        {accent === "rings" && <RingsArt />}
        {accent === "type" && <TypeArt />}
        {accent === "wave" && <WaveArt />}
        {accent === "code" && <CodeArt />}
        {accent === "cut" && <CutArt />}
      </svg>
      {label && <span className="art-label">{label}</span>}
    </div>
  );
}

function GridArt() {
  const nodes = [
    [80, 80], [200, 60], [320, 90], [120, 170], [260, 160], [90, 240], [210, 235], [330, 220],
  ];
  const links = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 4], [3, 4], [3, 5], [4, 6], [4, 7], [5, 6], [6, 7]];
  return (
    <g>
      {links.map(([a, b], i) => (
        <line key={i} className="draw" style={{ animationDelay: `${i * 0.12}s` }} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="rgba(124,196,255,.45)" strokeWidth="1" pathLength={1} />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          <circle className="pulse-ring" style={{ animationDelay: `${i * 0.35}s` }} r="14" fill="none" stroke="#3b82f6" strokeWidth="1" />
          <circle r="4" fill={i === 4 ? "#7cc4ff" : "#f4f6fb"} />
        </g>
      ))}
    </g>
  );
}

function RingsArt() {
  return (
    <g transform="translate(200 150)">
      {[110, 85, 60, 35].map((r, i) => (
        <g key={r} className={i % 2 ? "spin-rev" : "spin"} style={{ animationDuration: `${18 + i * 6}s` }}>
          <circle r={r} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1" />
          <circle r={r} fill="none" stroke={i === 1 ? "#7cc4ff" : "#3b82f6"} strokeWidth={i === 1 ? 3 : 2} strokeLinecap="round" strokeDasharray={`${r * (1.2 + i * 0.5)} ${r * 7}`} />
        </g>
      ))}
      <circle r="6" fill="#f4f6fb" />
      <circle className="pulse-ring" r="16" fill="none" stroke="#7cc4ff" strokeWidth="1" />
    </g>
  );
}

function TypeArt() {
  const widths = [250, 300, 210, 280, 160];
  return (
    <g transform="translate(60 70)">
      {widths.map((w, i) => (
        <rect key={i} className="type-line" style={{ animationDelay: `${i * 0.45}s` }} y={i * 32} width={w} height="10" rx="5" fill={i === 2 ? "#3b82f6" : "rgba(244,246,251,.22)"} />
      ))}
      <rect className="caret" x="168" y="128" width="3" height="18" fill="#7cc4ff" />
    </g>
  );
}

function WaveArt() {
  return (
    <g transform="translate(40 150)">
      {Array.from({ length: 33 }, (_, i) => {
        const h = 16 + Math.abs(Math.sin(i * 0.55)) * 90;
        return <rect key={i} className="bar" style={{ animationDelay: `${(i % 11) * 0.09}s` }} x={i * 10} y={-h / 2} width="5" height={h} rx="2.5" fill={i > 12 && i < 20 ? "#7cc4ff" : "rgba(124,196,255,.4)"} />;
      })}
    </g>
  );
}

function CodeArt() {
  const cells: [number, number][] = [];
  for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) if ((r * 7 + c * 3 + r * c) % 3 === 0) cells.push([r, c]);
  return (
    <g transform="translate(128 78)">
      {[[0, 0], [0, 6], [6, 0]].map(([r, c], i) => (
        <rect key={i} x={c * 16} y={r * 16} width="48" height="48" fill="none" stroke="#f4f6fb" strokeWidth="5" />
      ))}
      {cells.map(([r, c], i) => (
        <rect key={i} className="blink" style={{ animationDelay: `${(i % 7) * 0.3}s` }} x={c * 16 + 3} y={r * 16 + 3} width="10" height="10" fill={i % 5 === 0 ? "#7cc4ff" : "#3b82f6"} />
      ))}
    </g>
  );
}

function CutArt() {
  return (
    <g>
      <pattern id="checker" width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="rgba(255,255,255,.06)" />
        <rect x="10" y="10" width="10" height="10" fill="rgba(255,255,255,.06)" />
      </pattern>
      <rect width="400" height="300" fill="url(#checker)" />
      <path d="M200 70c26 0 44 20 44 46s-18 46-44 46-44-20-44-46 18-46 44-46zm-78 190c8-44 40-78 78-78s70 34 78 78z" fill="#0f1626" stroke="#7cc4ff" strokeWidth="1.5" />
      <rect className="scan" x="0" y="0" width="400" height="2" fill="#3b82f6" />
    </g>
  );
}
