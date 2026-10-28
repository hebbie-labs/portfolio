# TODO bis zum Launch (Fr 30.10.2026)

Was nur Leon erledigen kann. Erledigtes abhaken, die Datei wird mit dem Release gelöscht.

## Blocker

- [ ] **Homelab: `RESEND_API_KEY` für den Prod-Service** – in `homelab/compose.yml` hat nur `portfolio-dev` den Key, `portfolio` (leonhebeisen.com) nicht. Ohne ihn schlägt das Kontaktformular nach dem Launch bei jeder Anfrage fehl.
- [x] **Timeline-Fotos: OK von Noser Young einholen** (bis Mi 28.10.). Beide Fotos gehören Noser Young AG:
  - 1. Lehrjahr: Instagram-Post „üK 216 Insights“ vom 7.11.2025, Slide 2 (https://www.instagram.com/p/DQv3rJUiLUt/?img_index=2). Am besten gleich das Original **ohne Textbanner** anfragen.
  - 2. Lehrjahr: Portrait „leon_portraet_2026.jpg“ von der Profilseite (https://noseryoung.ch/team-members/leon-hebeisen/), bereits auf 4:5 zugeschnitten vorbereitet.
  - Nach dem OK: Fotos Claude geben bzw. Bescheid sagen, dann landen sie als `public/about/timeline-lehrjahr-1.jpg` und `-2.jpg` in #52. Ohne OK werden die Bilder aus der Timeline entfernt.
- [ ] **PRs mergen**, in dieser Reihenfolge: #50 → #51 → #52 → `feature/mvp-polish`. Danach wird `release/1.0.0` erstellt (Mi 28.10.).

## Prüfen

- [ ] **Sieve-Filter testen**: über das Formular auf dev.leonhebeisen.com eine Nachricht schicken. Sie sollte im Proton-Ordner „Portfolio“ mit Ablaufdatum (365 Tage) landen.
- [ ] **Release-Stand ansehen** auf dev.leonhebeisen.com, vor allem `/projekte` (neue Recur-Screenshots, Video-Tab auf Mobile) und das Vorschaubild beim Teilen eines Links.

## Optional / nach dem Launch

- [ ] **Homelab: Docker-Log-Rotation** (`logging: json-file`, `max-size: 10m`, `max-file: 3`), damit die Container-Logs nicht unbegrenzt wachsen.
- [ ] **Recur-Link auf Prod umstellen**, sobald recur.dpdns.org nicht mehr auf `/coming-soon` zeigt (`url` in `src/constants/projects/recur.ts`).
- [ ] **Showreel neu aufnehmen** im Format 12:7 (z. B. 1680×980), damit der Rahmen auf `/projekte` nichts abschneidet. Aktuell 16:9, links und rechts wird ein Streifen beschnitten.
- [ ] **About inhaltlich**: Lücke 2023–2025 zwischen Sekundarschule und Lehre erklären, beim 2. Lehrjahr mehr als ein Detail ergänzen.
- [ ] **Recur-Demo-Account**: Zugangsdaten liegen in `~/Developer/recur/.demo-account.json` (nicht im Repo). Mit einem zweiten Account der Gruppe „Recur Team“ beitreten, falls der Gruppen-Screenshot mehrere Mitglieder zeigen soll.
