# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Package manager is **pnpm** (pinned via `packageManager`; Docker uses corepack).

- `pnpm dev` / `pnpm build` / `pnpm start` — Next.js 16 (App Router, `output: "standalone"`)
- `pnpm lint` — ESLint 9 flat config (`eslint-config-next`)
- No test runner is configured.

## Architecture

German-language personal portfolio (Next.js 16, React 19, Tailwind v4, TypeScript). Routes are German (`/projekte`, `/kontakt`, `/impressum`) except `/about` and `/skills`.

**Pages are thin.** Each `src/app/<route>/page.tsx` only renders a component from `src/components/pages/`. Several (projects, skills, …) are still `PlaceholderTemplate` stubs.

**Atomic layout under `src/components/`**: `atoms` → `molecules` → `organisms` → `templates` (+ `pages`, `providers`). `ui/` holds shadcn-style primitives (`components.json`: style `base-nova`, `@base-ui/react`, lucide icons, `@magicui` registry). Add shadcn components with the `shadcn` CLI so aliases (`@/components`, `@/lib/utils`, `@/hooks`) resolve.

**Shell**: `app/layout.tsx` → `MainTemplate` (`SmoothScroll` (Lenis), `Nav`, `Footer`). Page transitions come from `Reveal` (`atoms/reveal.tsx`, CSS in `globals.css`), which replays on every route change.

**Single sources of truth**

- `src/constants/nav.ts` — `NAV_LINKS` and `getNavLabel(pathname)` for the current label.
- `src/constants/site.ts` + `src/lib/seo.ts` — site name, URLs, social links, metadata, JSON-LD, theme-color. `sitemap.ts`/`robots.ts` build on these.
- `src/lib/init-scripts.ts` — pre-hydration theme/intro scripts and the shared `INTRO_KEY` (`sessionStorage`).
- `src/components/atoms/typography.tsx` — `Display`/`Headline`/… (cva variants); use these instead of raw heading classes.

**Theming**: Colors are CSS variables in `src/app/globals.css` (`:root` = dark, `[data-theme="light"]` = light), exposed as Tailwind tokens (`bg-bg`, `text-fg`, `bg-accent`, `border-line`, …). The `@theme inline` block resets `--color-*`, so **default Tailwind palette colors don't exist** — use only the tokens. Display sizes (`text-display`, `text-headline`, …) and `ease-spring` are also defined there. The theme is applied before hydration by `THEME_INIT_SCRIPT` (reads `localStorage.theme`) in `layout.tsx`; `<html>` uses `suppressHydrationWarning`.

**Design reference**: `docs/mockup/*.html` are the static mockups (home, case study, navigation, styleguide, light theme) the UI is implemented against.

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds the multi-stage `Dockerfile` and pushes to GHCR on every push to `main` (target `run` → `:latest`, production) and `dev` (target `dev` → `:dev`, runs `pnpm dev`), then redeploys via docker compose on a self-hosted runner. `next.config.ts` whitelists `dev.leonhebeisen.com` in `allowedDevOrigins`.
