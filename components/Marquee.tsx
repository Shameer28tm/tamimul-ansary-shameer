/** Decorative CSS marquee (the same roles are announced in the hero), hidden from assistive tech. */
export function Marquee({ items }: { items: string[] }) {
  const row = () => (
    <div className="marquee-track">
      {items.map((t) => (
        <span key={t} className="marquee-item">
          {t}
          <svg viewBox="0 0 24 24" aria-hidden="true" className="marquee-star">
            <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee" aria-hidden="true">
      {row()}
      {row()}
    </div>
  );
}
