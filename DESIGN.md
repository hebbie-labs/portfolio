---
name: Leon Hebeisen Portfolio
description: Dunkles Terminal-Grün, riesige kondensierte Display-Typo, ein Akzent als Signal.
colors:
  bg: "#0A0D0B"
  bg-2: "#111612"
  placeholder: "#141B16"
  line: "#1E2721"
  muted: "#8D9A92"
  fg: "#E6EDE8"
  accent: "#4FD88A"
  accent-ink: "#06120B"
  light-bg: "#EEF2EE"
  light-bg-2: "#E2E8E3"
  light-placeholder: "#DCE4DE"
  light-line: "#C9D3CC"
  light-muted: "#56635B"
  light-fg: "#0B110D"
  light-accent: "#0E7A4B"
  light-accent-ink: "#F2F7F3"
typography:
  display:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "280px"
    fontWeight: 800
    lineHeight: 0.82
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 75"
  headline:
    fontFamily: "Bricolage Grotesque, sans-serif"
    fontSize: "48px"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Instrument Sans, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "13px"
    fontWeight: 400
rounded:
  xl: "12px"
  full: "999px"
spacing:
  grid-gap: "16px"
  section-gap: "64px"
  page-padding: "80px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    height: "52px"
    padding: "0 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.fg}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    height: "52px"
    padding: "0 24px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
  image-placeholder:
    backgroundColor: "{colors.placeholder}"
    textColor: "{colors.muted}"
    rounded: "{rounded.xl}"
    height: "52px"
    width: "200px"
---

# Design System: Leon Hebeisen Portfolio

Quelle der Wahrheit ist `docs/mockup/07-styleguide.html`. Alles andere (Code, andere Mockups) zählt für dieses Dokument nicht.

## Overview

**Creative North Star: "The Homeserver Terminal"**

Das Portfolio sieht aus wie eine Konsole, die jemand selbst aufgebaut hat und selbst betreibt: fast schwarzes Grün, ein einziges Terminal-Grün als Signal, Mono-Labels für alles Technische und darüber riesige, kondensierte Versalien. Das Handwerk zeigt sich in Typo-Massstab, Bewegung und Details, nicht in Dekoration.

Flächen sind flach und tonal gestuft, Rundung ist freundlich (Pills, 12px), die Typografie dagegen laut und eng gesetzt. Dunkel ist der Standard, Hell ist ein gleich aufgebautes Zweitthema mit abgedunkeltem Akzent.

**Key Characteristics:**
- Ein Akzent (Terminal-Grün) für Aktion, Fokus und Interpunktion; alles andere ist grün getöntes Neutral.
- Display in Versalien, `wdth` 75, extrabold, Zeilenhöhe 0.82.
- Mono-Labels (JetBrains Mono) für Meta, Beschriftungen und Chips.
- Flach, ohne Schatten; Trennung über Ton und 1px-Linien.

## Colors

Fast schwarzes Waldgrün mit einem hellen Terminal-Grün; alle Neutrals sind leicht grün getönt.

### Primary
- **Terminal Green** (#4FD88A dunkel / #0E7A4B hell): Hauptaktion, Fokusring, Interpunktion in Titeln. Kontrast 10.6:1 (dunkel) bzw. 4.8:1 (hell).
- **Ink on Green** (#06120B / #F2F7F3): Text auf Akzentflächen.

### Neutral
- **Night Moss** (#0A0D0B / #EEF2EE): Seitenhintergrund.
- **Deep Moss** (#111612 / #E2E8E3): Zweite Ebene.
- **Placeholder Moss** (#141B16 / #DCE4DE): Bild-Platzhalter.
- **Hairline Moss** (#1E2721 / #C9D3CC): 1px-Linien und Rahmen.
- **Mist** (#8D9A92 / #56635B): Sekundärtext, Labels, Chips. Kontrast 6.7:1 (dunkel) bzw. 6.0:1 (hell).
- **Pale Frost** (#E6EDE8 / #0B110D): Haupttext.

### Named Rules
**The One Signal Rule.** Terminal Green ist die einzige Farbe mit Bedeutung. Es markiert Aktion, Fokus und Interpunktion und wird sparsam eingesetzt.

**The Contrast Rule.** Textfarben halten mindestens 4.5:1; die Werte stehen im Styleguide neben den Swatches.

## Typography

**Display Font:** Bricolage Grotesque (Fallback sans-serif)
**Body Font:** Instrument Sans (Fallback system-ui)
**Label/Mono Font:** JetBrains Mono

**Character:** Eine eigenwillige, enge Grotesk in Versalien für Lautstärke, eine neutrale Sans zum Lesen und eine Mono für alles, was nach System klingt.

### Hierarchy
- **Display** (800, 78–280px, 0.82, -0.03em, `wdth` 75, Versalien): Hero und Seitentitel; abschliessender Punkt in Akzent.
- **Headline** (600–700, 30–60px, 1.05, -0.025em, `wdth` 100): Abschnittsüberschriften.
- **Body** (400–600, 16–28px, 1.5): Fliesstext, Buttons; Zeilenbreite bis 720px.
- **Label / Meta** (400–500, 11–15px, Mono, Mist): Eyebrows, Meta-Zeilen, Chips, Beschriftungen.

### Named Rules
**The Accent Full Stop Rule.** Der Punkt am Ende eines Display-Titels steht in Terminal Green («System.», «Hebeisen.»).

## Layout

Eine Spalte mit 80px Seitenrand auf 1440px Breite, vertikal gestapelt mit 64px Abstand zwischen Abschnitten. Farbfelder liegen in einem 8-spaltigen Raster mit 16px Lücke. Typo-Zeilen nutzen ein Raster aus 280px Beschriftungsspalte und flexibler Inhaltsspalte mit 40px Lücke, getrennt durch 1px-Linien und 20px Innenabstand. Bausteine stehen in einer umbrechenden Zeile mit 24px Abstand.

## Elevation & Depth

Flach. Es gibt keine Schatten; Tiefe entsteht durch Tonstufen (Night Moss, Deep Moss, Placeholder Moss) und 1px-Hairlines.

### Named Rules
**The Flat Rule.** Flächen trennen sich über Ton oder Linie, nie über Schatten.

## Shapes

Pill (999px) für Buttons und Chips, 12px für Farbfelder und Bild-Platzhalter. Rahmen sind 1px.

## Components

### Buttons
- **Shape:** Pill, 52px hoch, Instrument Sans 16px.
- **Primary:** Terminal Green mit Ink-Text, Gewicht 600, 24px seitlich, kein Rahmen.
- **Hover:** hebt um 2px (`translateY(-2px)`).
- **Fokus:** 2px Ring in Terminal Green, 3px Abstand.
- **Secondary:** transparent, 1px Mist-Rahmen (70% Deckkraft), Pale-Frost-Text, Gewicht 600, 24px seitlich.

### Chips
Stack-Chip (z. B. «Spring Boot»): Pill, transparent, 1px Hairline-Rahmen, 6×12px Padding, Mono 12px in Mist.

### Image Placeholder
Placeholder-Moss-Fläche, 1px Hairline, 12px Radius, zentrierte Mono-Beschriftung in Klammern («[Screenshot]», 11px, Mist). Beispielmass 200×52px.

### Motion
`ease-out` `cubic-bezier(0.2, 0.7, 0.2, 1)`, 240ms, nur `transform` und `opacity`. `prefers-reduced-motion` schaltet Animation ab.

## Do's and Don'ts

### Do:
- **Do** Farben nur aus dem Styleguide-Set nehmen; Hell und Dunkel nutzen dieselben Rollen.
- **Do** Terminal Green für die Hauptaktion, den Fokusring und den Display-Punkt reservieren.
- **Do** Mono für Meta, Beschriftungen und Chips verwenden.
- **Do** nur `transform` und `opacity` animieren und `prefers-reduced-motion` respektieren.

### Don't:
- **Don't** Schatten auf Flächen legen.
- **Don't** Display in Gemischtschreibung oder mit normaler Laufweite setzen.
- **Don't** den Akzent für Dekoration einsetzen.
