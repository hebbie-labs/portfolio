/** Current value of a CSS color variable from `globals.css` (e.g. `--bg`). */
export const getCssColor = (variable: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(variable).trim();

/** Tints the browser UI (`meta[name=theme-color]`) with `--bg` (page) or `--bg-2` (startup screen). */
export function setThemeColor(variable: "--bg" | "--bg-2" = "--bg") {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", getCssColor(variable));
}
