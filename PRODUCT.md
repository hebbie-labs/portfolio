# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primär: Lehrstellen- und Arbeitgeber-Seite (Recruiter, Tech-Leads, die einen Junior einstellen oder nach der Lehre abholen wollen) sowie Peers und die Developer-Community, die Projekte und Code anschauen. Sie prüfen in wenigen Minuten, ob Leon handwerklich überzeugt, und nehmen danach Kontakt auf oder gehen auf GitHub/die Live-Demos.

## Product Purpose

Persönliches Portfolio von Leon Hebeisen (Bern, CH), Lernender Applikationsentwickler EFZ bei Noser Young, aktuell im 2. Lehrjahr. Es zeigt ausgewählte Projekte (Recur, Homeserver), erzählt den Werdegang und macht Kontaktaufnahme einfach. Erfolg: Besucher:innen melden sich oder öffnen Repos und Live-Demos.

## Positioning

Leon macht Dinge gerne selbst und organisiert und betreibt sie auf dem eigenen Homeserver (dieses Portfolio läuft darauf). Seine Stärke liegt im Frontend; Spring Boot steht dahinter.

## Operating Context

Deutschsprachig (Schweizer Rechtschreibung: «ss» statt «ß»). Deployt über GitHub Actions (CI → CD) als Docker-Image nach GHCR, redeployt per docker compose auf dem selbst gehosteten Homeserver hinter Cloudflare Tunnel. `dev.leonhebeisen.com` ist die Dev-Umgebung; `main` zeigt bis zum Launch einen Platzhalter.

## Capabilities and Constraints

- Routen: `/` (Start), `/projekte`, `/about`, `/kontakt`, `/impressum`, 404; Skills laufen als Skill-Cloud auf `/about`.
- Kontaktformular, E-Mail (`contact@leonhebeisen.com`) mit Copy-Button, Social-Profile (GitHub, LinkedIn, Noser Young, Instagram, X, Bluesky).
- Hell/Dunkel-Theme (Dunkel Standard), Intro, Seitenübergänge, Smooth Scroll.
- Projekte tragen Screenshots/Showreel und werden mit Features-Zeilen erklärt.
- Noch offen: viele Texte auf About/Timeline sind `[Platzhalter]` (Intro, Story, Hobbys, Sekundarschule, 1. Lehrjahr); Homeserver hat noch keinen Screenshot.

## Brand Commitments

Name «Leon Hebeisen», Logo `public/logo.svg`, Portrait `public/portrait.jpg`, OG-Bild `public/og.png`. Ton: persönlich, direkt, mit leichtem Augenzwinkern («Hi, ich bin Leon.»). Hero-Lead: «Lernender Applikationsentwickler. Frontend zuerst, Spring Boot dahinter.»

## Evidence on Hand

- Recur: Habit- und Task-Tracker als PWA (Spring Boot 4 / Java 25, Postgres, JWT + Google OAuth2/OIDC, Next.js/React/TypeScript nach Atomic Design); Screenshots desktop/mobile und Showreel in `public/`.
- Homeserver: Docker-Compose-Stack, Portainer, Cloudflare Tunnel, Deployment per self-hosted Runner, tägliche Backups mit Off-Site-Kopie (nur Text, kein Screenshot).
- Nicht vorhanden und nicht zu erfinden: Testimonials, Kundenreferenzen, Zertifikate, Zahlen/Benchmarks, weitere Case Studies, echte Texte für alle `[Platzhalter]`.

## Product Principles

1. Das Portfolio selbst ist Beleg: Frontend-Handwerk muss an der Seite sichtbar sein, nicht nur behauptet.
2. Selbst gebaut, selbst betrieben: Eigenständigkeit (Homeserver, CI/CD) ist Teil der Geschichte.
3. Echte Arbeit vor Behauptungen: nur zeigen, was belegt ist; Platzhalter nie mit erfundenen Inhalten füllen.
4. Kontakt ist nie mehr als einen Klick entfernt.
5. Ehrlich über die Lernendenrolle, ohne sich kleiner zu machen.

## Accessibility & Inclusion

Kein produktspezifischer Standard festgelegt; Reduced-Motion wird bereits respektiert (Showreel-Poster). Offen: ob WCAG 2.1 AA verbindlich sein soll.
