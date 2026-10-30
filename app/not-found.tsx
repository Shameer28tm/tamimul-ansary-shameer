import Link from "next/link";

export const metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <p className="label">Error 404</p>
      <h1>
        This route <em>doesn&apos;t exist.</em>
      </h1>
      <p>The page may have moved, or the link was mistyped.</p>
      <Link href="/" className="btn btn-primary">
        <span>Back to the portfolio</span>
      </Link>
    </main>
  );
}
