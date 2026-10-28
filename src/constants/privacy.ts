// Content of the privacy page (`/datenschutz`). Facts come from the code (contact action, storage use),
// the homelab stack (no access logs) and the providers (Resend: US storage, 30 days; Proton: Sieve expiry).

export const PRIVACY_PAGE = {
  /** Tab title and search description (`metadata` in `app/datenschutz/page.tsx`). */
  meta: {
    title: "Datenschutz",
    description:
      "Welche Daten beim Besuch von leonhebeisen.com und beim Kontaktformular anfallen und was damit passiert.",
  },
  title: "Datenschutz.",
  intro:
    "Hier steht, welche Daten beim Besuch dieser Website und beim Kontaktformular anfallen und was damit passiert.",
  sections: [
    {
      heading: "Verantwortlich",
      text: "Verantwortlich ist Leon Hebeisen, Adresse und Kontakt stehen im Impressum.",
    },
    {
      heading: "Kontaktformular",
      text: "Im Formular gibst du Name, E-Mail-Adresse und Nachricht an. Diese Angaben nutze ich nur, um dir zu antworten. Sie werden per Mail an mich gesendet; den Versand übernimmt der Dienst Resend als Auftragsbearbeiter. Resend speichert die Nachricht und das Versandprotokoll 30 Tage auf Servern in den USA; die Übermittlung ist durch Standardvertragsklauseln abgesichert. In meinem Postfach bei Proton Mail (Schweiz) werden Anfragen nach 12 Monaten automatisch gelöscht.",
    },
    {
      heading: "Hosting und Server-Logs",
      text: "Die Website läuft auf meinem eigenen Server und ist über Cloudflare (Tunnel) erreichbar. Cloudflare verarbeitet dabei technisch den Datenverkehr, etwa die IP-Adresse; dafür gilt die Datenschutzerklärung von Cloudflare. Auf meinem Server werden keine Zugriffsprotokolle mit IP-Adressen gespeichert.",
    },
    {
      heading: "Cookies und lokale Speicherung",
      text: "Ich setze keine Cookies und keine Tracking- oder Analysedienste ein. Dein Browser speichert lediglich lokal, ob du das helle oder dunkle Design gewählt hast und ob die Startanimation schon lief. Diese Angaben verlassen dein Gerät nicht.",
    },
    {
      heading: "Schriften",
      text: "Die Schriften werden mit der Website selbst ausgeliefert. Beim Besuch wird keine Verbindung zu Google aufgebaut.",
    },
    {
      heading: "Externe Links",
      text: "Links zu GitHub, LinkedIn und weiteren Profilen führen auf fremde Seiten. Dort gelten deren Datenschutzbestimmungen.",
    },
    {
      heading: "Deine Rechte",
      text: "Du kannst Auskunft über deine Daten verlangen sowie deren Berichtigung oder Löschung. Schreib mir dazu an die E-Mail-Adresse im Impressum. Stand: 30. Oktober 2026.",
    },
  ],
} as const;
