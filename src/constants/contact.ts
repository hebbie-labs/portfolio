// Content of the contact page (`/kontakt`); the address is `EMAIL` in `site.ts`.

export const CONTACT_PAGE = {
  title: "Schreib mir.",
  lead: "Ob Anschlussstelle, Projekt oder einfach Hallo: Ich lese alles selbst und melde mich.",
  status: "Offen für die Zeit nach der Lehre",
  direct: "oder direkt",
} as const;

/** Closing call to action at the end of the start, projects and about page. */
export const CONTACT_CTA = {
  text: "Fragen, Feedback oder ein gemeinsames Projekt?",
  linkLabel: "Schreib mir",
  linkHref: "/kontakt",
} as const;

/** Labels of the address link's copy button. */
export const EMAIL_TEXT = { copyLabel: "Adresse kopieren", copiedLabel: "Kopiert" } as const;

/** Field props for `FormField`; `maxLength` is also the limit in `contactSchema`. */
export const CONTACT_FORM = {
  fields: {
    name: { label: "Name", autoComplete: "name", spellCheck: false, maxLength: 100 },
    email: { label: "E-Mail", autoComplete: "email", type: "email", spellCheck: false, maxLength: 200 },
    message: { label: "Nachricht", multiline: true, maxLength: 5000 },
  },
  submit: "Nachricht senden",
  pending: "Wird gesendet …",
  errors: {
    name: "Wie heisst du?",
    email: "Gib eine gültige E-Mail-Adresse an.",
    message: "Schreib mir kurz, worum es geht.",
    send: "Das hat nicht geklappt. Schreib mir bitte direkt per Mail.",
  },
  success: {
    title: "Danke!",
    text: "Deine Nachricht ist angekommen. Ich melde mich bei dir.",
  },
} as const;

/** Mails to the owner; the sender domain must be verified at Resend. */
export const CONTACT_MAIL = {
  from: "Portfolio <noreply@leonhebeisen.com>",
  subject: (name: string) => `Neue Nachricht von ${name.replace(/\s+/g, " ")}`,
} as const;
