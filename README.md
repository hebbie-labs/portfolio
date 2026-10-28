# leonhebeisen.com

Persönliches Portfolio von Leon Hebeisen, Lernender Applikationsentwickler EFZ: Projekte, Werdegang und Kontakt.

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Resend für das Kontaktformular.

## Lokal starten

Voraussetzungen: Node 22 (`.nvmrc`) und pnpm (über corepack).

```bash
corepack enable
pnpm install
cp .env.example .env   # RESEND_API_KEY eintragen, sonst schlägt nur das Kontaktformular fehl
pnpm dev               # http://localhost:3000
```

Weitere Befehle: `pnpm build`, `pnpm start`, `pnpm lint`.

## Deployment

Ein Push auf `dev` oder `main` startet die CI (ESLint und Docker-Build). Ist sie grün, baut die CD das Docker-Image, legt es in der GitHub Container Registry ab und deployt es per Docker Compose auf den eigenen Server: `dev` nach dev.leonhebeisen.com, `main` nach leonhebeisen.com.

## Für Mitwirkende

Architektur und Konventionen (Atomic Design, Transitions, Inhalte in `src/constants/`) stehen in [`CLAUDE.md`](CLAUDE.md). Gearbeitet wird mit Git Flow: Feature-Branches von `dev`, Releases über `release/x.y.z` nach `main`.
