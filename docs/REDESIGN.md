# Portfolio redesign — audit, design system & motion spec

## 1. Codebase audit (before the redesign)

| Area | Finding |
| --- | --- |
| Framework | Next.js 15.5 (App Router), React 19, TypeScript (strict) |
| Package manager | pnpm (`pnpm-lock.yaml`) |
| Routing | `/` (single page), `/credentials` → redirects to `/#certificates`, `/admin` + `/admin/login` (password-protected content viewer) |
| Content | Everything lives in `data/portfolio.ts` (profile, current, projects, articles, journey, toolkit, socials, certificates) |
| Styling | Two global stylesheets (`globals.css`, `refinements.css`), light/dark toggle, Google Fonts via CSS `@import` (render-blocking) |
| Animation | `framer-motion` 12 — a single `Reveal` fade-up wrapper |
| Icons | `lucide-react` |
| SEO | Static metadata, a JSON-LD graph, `robots.ts` and `sitemap.ts`, all pointing to an unconfigured domain (`shameer.dev`) |
| Deployment | Vercel (no `next.config`, no `vercel.json`) |

### Issues found

1. **Forgeable admin session:** the cookie value was the literal string `authenticated`, so anyone could set it by hand and open `/admin`.
2. **Wrong canonical domain:** the site pointed at `shameer.dev` instead of the Vercel domain.
3. **Outdated social links:** they did not match the verified `shameerion` profiles.
4. **Too much client JavaScript:** the whole home page was a client component, so every byte of copy shipped as JS.
5. **Render-blocking fonts:** Google Fonts loaded through a CSS `@import`.
6. **Unoptimised images:** some were 0.8 MB JPEGs.
7. **Dead project links:** "View project" pointed to `#contact`.

## 2. Reference site (msenthil.com)

The reference could **not** be inspected from the build environment, because the network policy blocked the site. Nothing in this implementation claims to match its exact fonts, colours or timings.

The visual and motion language below comes from the written brief: near-black with navy, white type, an electric-blue accent, editorial typography and choreographed motion. Every timing, easing and toggle lives in `lib/motion.ts` and in the motion CSS variables in `app/globals.css`, so it can be tuned against screenshots or recordings later without touching the components.

## 3. Design system

### Colour tokens (`app/globals.css`)

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#050608` | Page background (near-black) |
| `--bg-2` | `#0a0f1c` | Dark navy surfaces |
| `--bg-3` | `#0f1626` | Raised surfaces |
| `--ink` | `#f4f6fb` | Primary text |
| `--muted` | `#8b93a7` | Secondary text (AA on `--bg`) |
| `--line` | `rgba(255,255,255,.09)` | Hairlines |
| `--accent` | `#3b82f6` | Electric blue |
| `--accent-2` | `#7cc4ff` | Sky blue highlight |

### Typography (self-hosted via `next/font`)

| Role | Font |
| --- | --- |
| Display / headings | **Inter Tight** (600–800), tight tracking |
| Editorial accent | **Instrument Serif** italic, used for the emphasised word in headings (continues the existing italic-serif `<em>` idea) |
| Body | **Manrope** (kept from the existing site) |
| Mono / labels | **DM Mono** (kept from the existing site) |

All sizes are fluid `clamp()` values: display `--fs-display`, `--fs-h2`, `--fs-h3`, `--fs-lead`, `--fs-body`, `--fs-small`, `--fs-label`.

### Layout

- **Container:** `--shell: min(1320px, 100% - 2*gutter)`, where `--gutter` is `clamp(16px, 4vw, 40px)`.
- **Grid:** 12 columns from 900px up; a single column below that.
- **Breakpoints:** 480, 768, 900, 1200 and 1600px. Ultra-wide screens are capped by the container and fluid type.
- **Section rhythm:** `--section: clamp(96px, 14vw, 200px)`.

### Motion tokens

| Token | Value |
| --- | --- |
| `--ease-out` (`easeOut`) | `cubic-bezier(.16,1,.3,1)`, for reveals |
| `--ease-in-out` (`easeInOut`) | `cubic-bezier(.76,0,.24,1)`, for curtains, menus and the loader |
| Durations | fast `.35s`, base `.7s`, reveal `.9s`, slow `1.2s` |
| Staggers | characters 22ms, words 50ms, items 80ms |

## 4. Motion architecture

| Layer | Tech | Why |
| --- | --- | --- |
| Loader and hero intro | Pure CSS keyframes, delayed by `--intro` | Runs before hydration, needs no JS, and is skipped on repeat visits within a session and under reduced motion |
| Scroll reveals, scroll-linked text, parallax, timeline line, manifesto | Framer Motion `whileInView`, `useScroll`, `useTransform` | Already a dependency, and enough for this choreography |
| Menu, page transitions, role ticker, project preview, cursor, magnetic buttons | Framer Motion | Component-level state animation |
| Marquee, SVG line drawing, project art loops, hover states | CSS | Cheapest option, compositor-only |

**GSAP + ScrollTrigger was evaluated and not added.** Every scroll effect here is either a one-shot reveal or a progress-mapped transform, and Framer Motion's `useScroll` already handles both. Adding GSAP would mean a second animation runtime and a second scroll model, which the brief asks to avoid. If a future pinned or scrubbed sequence needs timeline nesting, GSAP can be scoped to that one component.

**Lenis was not added.** Native scrolling avoids conflicts with `useScroll`, `position: sticky`, keyboard scrolling and anchor links.

### Reduced motion

- **CSS:** under `prefers-reduced-motion: reduce`, animations and transitions drop to near-zero, the loader is hidden, and the marquee and art loops stop.
- **Framer Motion:** `MotionConfig reducedMotion="user"` is set, and scroll-linked components check `useReducedMotion()` and render their static end state.
- **Interactions:** the custom cursor, magnetic pull and project preview are disabled.

## 5. Page and section structure

### `/`

1. Loader
2. Navigation
3. Hero
4. Marquee
5. About (direct-answer intro, scroll-lit story, Currently)
6. Expertise
7. Selected work
8. Practice (scroll manifesto)
9. Journey
10. Certificates
11. Currently exploring
12. Writing
13. Quote
14. Contact
15. Footer

### `/projects/[slug]`

A case study for each project, with its own metadata, JSON-LD and Open Graph image, plus next-project navigation.

### Other routes

| Route | Purpose |
| --- | --- |
| `/admin`, `/admin/login` | Signed-session protected |
| `/credentials` | Redirect kept |
| `not-found` | Styled 404 |

## 6. SEO, AEO and GEO

- **Canonical URL:** `NEXT_PUBLIC_SITE_URL`, falling back to `https://shameer-portfolio-topaz.vercel.app`.
- **Metadata:** each page sets its own title, description, canonical URL, Open Graph and Twitter tags. The Open Graph images are generated per route.
- **JSON-LD, one graph per page:**
  - Home: `Person`, `WebSite`, `ProfilePage` and an `ItemList` of `CreativeWork`.
  - Project pages: `CreativeWork` and `BreadcrumbList`, both referencing the same `Person` `@id`.
- **Crawling files:** `sitemap.xml` (home and project pages), `robots.txt` (disallows `/admin`) and `manifest.webmanifest`.
- **Icons:** an SVG favicon and an Apple touch icon.
- **Search Console:** set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to emit the verification meta tag.

## 7. Admin security

- **Session token:** `v1.<expiry>.<nonce>.<HMAC-SHA256>`, signed with a key derived from `ADMIN_SESSION_SECRET` and `ADMIN_PASSWORD`. Changing either one invalidates every existing session.
- **Cookie:** `__Host-` prefix in production; `HttpOnly`, `Secure`, `SameSite=Strict`, `Path=/`, 8-hour max age.
- **Checks:** the token is verified in the middleware and again in the `/admin` server component, as defence in depth.
- **Password handling:** passwords are compared as HMAC digests in constant time. A failed attempt waits before responding. Login is refused if no password of at least 12 characters is configured.
- **Logout:** a server action clears the cookie.
