/**
 * Inline text made of parts. A string is plain text; `{ text, hint }` is a marked word that shows its `hint` in a
 * tooltip; `{ text, href }` is a marked hyperlink. Keep spaces and punctuation inside the strings.
 */
export type RichPart =
  string | { text: string; hint: string } | { text: string; href: string };
