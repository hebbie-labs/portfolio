/** Cuts `text` at the last word boundary within `max` characters and appends "…"; shorter text is unchanged. */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}
