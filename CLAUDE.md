# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Package manager is **pnpm** (pinned via `packageManager`; Docker uses corepack).

- `pnpm dev` / `pnpm build` / `pnpm start` — Next.js 16 (App Router, `output: "standalone"`)
- `pnpm lint` — ESLint 9 flat config (`eslint-config-next`)
- No test runner is configured.

## Architecture

German-language personal portfolio (Next.js 16, React 19, Tailwind v4, TypeScript). Routes are German (`/projekte`, `/kontakt`, `/impressum`, `/datenschutz`) except `/about`.

**Pages are thin.** Each `src/app/<route>/page.tsx` only renders a component from `src/components/pages/` and sets its `metadata` from the page's constant.

**Atomic layout under `src/components/`**: `atoms` → `molecules` → `organisms` → `templates` (+ `pages`, `providers`). `atoms/` is flat (page-independent; an atom may use another atom or `ui/`, e.g. `media-frame`, `rich-text`); `molecules/` and `organisms/` are split per page area (`home`, `about`, `projects`, `contact`, `layout`). A level only imports from the levels below it; a molecule that needs another molecule is an organism. Sub-parts of one organism may sit in its own folder (e.g. `organisms/layout/nav/`). `ui/` holds shadcn-style primitives (`components.json`: style `base-nova`, `@base-ui/react`, lucide icons, `@magicui` and `@react-bits` registries). Add shadcn components with the `shadcn` CLI so aliases (`@/components`, `@/lib/utils`, `@/hooks`) resolve.

**`ui/` is vendored library code** (shadcn / Magic UI / React Bits, imported by the owner): handle with caution. Don't refactor, restyle or rewrite those files; adapt them from outside (wrapper in `atoms/`, `className`). Edit one only when the owner explicitly asks.

**Buttons**: use `atoms/button.tsx` for every button-like action (variants: shadcn `default`/`outline`/`ghost`, plus `text` and `interactive`; links go through `render={<Link href />}` with `nativeButton={false}`). Don't use `ui/button` or `buttonVariants` directly, except to style `ui/` components that own their own element (e.g. `AnimatedThemeToggler`).

**Shell**: `app/layout.tsx` → `MainTemplate` (`SmoothScroll` (Lenis), `Nav`, `Footer`). Page transitions come from `Reveal` (`atoms/reveal.tsx`, CSS in `globals.css`), which replays on every route change.

**Transitions**: CSS first. Hover, press and state changes are Tailwind transitions on the `--ease-*` tokens; enter/exit of elements that stay mounted toggles `inert` and styles the hidden state with `inert:` (e.g. the nav panel), elements that mount use `starting:`. `motion` only where JS has to drive the value: scroll-linked transforms (`use-horizontal-scroll`), the intro sequence (`startup-intro`) and the vendored `ui/` components that ship with it. Reduced motion comes from `motion-safe:`/`motion-reduce:` or `useMediaQuery("(prefers-reduced-motion: reduce)")`. No other animation libraries.

**Server side**: `src/server/` (`"use server"` entries the client calls, e.g. `sendContact`; export only those functions, each is a public POST endpoint), `src/validation/` (Yup schemas shared by form and server, plus the generic `validate` helper), `src/services/` (external APIs, e.g. Resend in `mail.ts`), `src/types/` (shared types). `src/lib/` holds only generic helpers (`utils`, `content`, theme, fonts, seo).

**Single sources of truth**

- `src/constants/nav.ts` — `NAV_LINKS` (and the other links); `getNavLink(pathname)` in `src/lib/nav.ts` picks the current one.
- `src/constants/site.ts` + `src/lib/seo.ts` — site name, URLs, social links, metadata, JSON-LD, theme-color. `sitemap.ts`/`robots.ts` build on these.
- `src/lib/init-scripts.ts` — pre-hydration theme/intro scripts and the shared `INTRO_KEY` (`sessionStorage`).
- `src/components/atoms/typography.tsx` — `Display`/`Headline`/… (cva variants); use these instead of raw heading classes.

**Theming**: Colors are CSS variables in `src/app/globals.css` (`:root` = dark, `[data-theme="light"]` = light), exposed as Tailwind tokens (`bg-bg`, `text-fg`, `bg-accent`, `border-line`, …). The `@theme inline` block resets `--color-*`, so **default Tailwind palette colors don't exist** — use only the tokens. Display sizes (`text-display`, `text-headline`, …) and `ease-spring` are also defined there. The theme is applied before hydration by `THEME_INIT_SCRIPT` (reads `localStorage.theme`) in `layout.tsx`; `<html>` uses `suppressHydrationWarning`.

**Assets**: `public/<area>/<kebab-name>` grouped by page area (e.g. `projects/recur/home.png`, `about/portrait.jpg`); site-wide files (`og.png`, `logo.svg`, the latter copied by the `Dockerfile`) stay at the root.

**Design reference**: `docs/mockup/*.html` are the static mockups (home, projects page, navigation, styleguide, light theme) the UI is implemented against.

## 3D & animations

- **Self-built 3D**: plain three.js ([threejs.org](https://threejs.org), no React Three Fiber / drei), installed when the first self-built scene lands (none in the repo right now). Addons come from `three/addons/...`. Put the reusable canvas in `atoms/` (a client component that creates the `WebGLRenderer` on a `<canvas>` ref in `useEffect`, handles resize and the render loop, and disposes renderer, geometries and materials on unmount) and scene objects in `molecules/<area>/` (plain functions that build meshes into a `THREE.Scene`), load the scene with `next/dynamic` (`ssr: false`) only on the page that uses it (three.js is heavy), take colors from the CSS tokens so they follow the theme, and respect reduced motion.
- **Other tools**: plain three.js is the default. Propose a different tool only if it clearly wins (bundle size, licence, DX) and ask before adopting it. No tools with watermarks or paywalled exports (Spline was dropped for that).
- **3D text in the site font**: three's `TextGeometry` + `FontLoader` (`three/addons/...`) need a typeface JSON; convert the TTF with opentype.js into the facetype.js format, subset to the needed characters, keep the font's copyright/licence fields. Google Fonts serves a static TTF per weight from `https://fonts.googleapis.com/css2?family=<Family>:wght@<weight>` when fetched without a browser user agent (e.g. `curl`).
- **Predefined animations**: React Bits (`@react-bits` registry, licence MIT + Commons Clause: fine on the site, never sell or redistribute the components themselves). Install with `pnpm dlx shadcn@latest add @react-bits/<Name>-TS-TW`, then: move the file it creates (`components/<Name>.tsx`) to `ui/<kebab-name>.tsx`, revert any change the CLI made to pinned deps (e.g. a `three` downgrade), and add the header `// React Bits (reactbits.dev), MIT + Commons Clause, (c) David Haz`, the only edit allowed to that file. Theme it through its props from a wrapper in `atoms/`/`molecules/` (e.g. `atoms/fuzzy-text.tsx`).

## Reviews

`[bracketed]` placeholders in content files (`src/constants/*`) and placeholder assets (e.g. a missing photo in `public/`) are work in progress: do **not** report them in reviews. The only exception is a review about shipping to `main` (prod, e.g. a `release/` or `hotfix/` PR), where unfilled placeholders and missing assets are blockers.

## Deployment

GitHub Actions: `.github/workflows/ci.yml` (ESLint + Docker `run` build, on PRs and pushes to `main`/`dev`) gates `.github/workflows/cd.yml`, which starts via `workflow_run` after a green CI on `main`/`dev` (so the repo's default branch must stay `dev`, as `workflow_run` uses the default branch's file). CD builds the multi-stage `Dockerfile` and pushes to GHCR (`main` → `:latest` with target `placeholder` until launch, `dev` → `:dev` with target `dev`, runs `pnpm dev`), then redeploys via docker compose on a self-hosted runner. `next.config.ts` whitelists `dev.leonhebeisen.com` in `allowedDevOrigins`.
