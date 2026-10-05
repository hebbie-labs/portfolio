// The theme lives in `data-theme` on <html> ("light"; dark is the default) and is persisted in
// localStorage. THEME_INIT_SCRIPT (init-scripts.ts) applies it before hydration.

export type Theme = "light" | "dark";

export const THEME_KEY = "theme";

export const getTheme = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

/** Applies and persists the theme; does not touch `meta[name=theme-color]` (see `setThemeColor`). */
export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage[THEME_KEY] = theme;
  } catch {
    // Storage blocked: the theme just resets on the next load.
  }
}

export function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}
