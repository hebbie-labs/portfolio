// Content of the legal notice page (`/impressum`); the contact address is `EMAIL` in `site.ts`.
// Texts in [brackets] are placeholders.

export const LEGAL_PAGE = {
  title: "Impressum.",
  /** Name and address; each entry is one line. */
  owner: {
    heading: "Verantwortlich",
    lines: ["Leon Hebeisen", "[Strasse und Nr.]", "[PLZ Ort]", "Schweiz"],
  },
  contactHeading: "Kontakt",
  /** Plain paragraphs below the contact block. */
  sections: [
    {
      heading: "Haftung für Inhalte",
      text: "Die Inhalte dieser Website habe ich mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität übernehme ich jedoch keine Gewähr.",
    },
    {
      heading: "Haftung für Links",
      text: "Diese Website enthält Links zu externen Seiten Dritter, auf deren Inhalte ich keinen Einfluss habe. Für diese fremden Inhalte übernehme ich keine Gewähr; verantwortlich ist stets der jeweilige Anbieter.",
    },
    {
      heading: "Urheberrecht",
      text: "Die Texte, Bilder und Gestaltungen dieser Website unterliegen dem Urheberrecht. Eine Verwendung ausserhalb der Grenzen des Urheberrechts bedarf meiner schriftlichen Zustimmung.",
    },
  ],
} as const;
