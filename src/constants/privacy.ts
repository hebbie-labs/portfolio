// Content of the privacy page (`/datenschutz`). Facts come from the code (contact action, storage use);
// texts in [brackets] are open decisions and must be filled or checked before launch, not guessed.

export const PRIVACY_PAGE = {
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
      text: "Im Formular gibst du Name, E-Mail-Adresse und Nachricht an. Diese Angaben nutze ich nur, um dir zu antworten. Sie werden per Mail an mich gesendet; den Versand übernimmt der Dienst Resend als Auftragsbearbeiter. [Aufbewahrung: wie lange werden Anfragen aufbewahrt? Standort und Vertrag von Resend prüfen.]",
    },
    {
      heading: "Schutz vor Spam",
      text: "Das Formular nutzt ein verstecktes Feld und misst, wie schnell es ausgefüllt wird, um Bots zu erkennen. Dafür werden keine Daten an Dritte übermittelt.",
    },
    {
      heading: "Hosting und Server-Logs",
      text: "Die Website läuft auf meinem eigenen Server und ist über Cloudflare (Tunnel) erreichbar. Cloudflare sieht dabei technisch den Datenverkehr, etwa die IP-Adresse. [Welche Logs entstehen auf dem Server und wie lange werden sie aufbewahrt? Cloudflare-Angaben prüfen.]",
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
      text: "Du kannst Auskunft über deine Daten verlangen sowie deren Berichtigung oder Löschung. Schreib mir dazu an die E-Mail-Adresse im Impressum. [Datum der letzten Aktualisierung ergänzen.]",
    },
  ],
} as const;
