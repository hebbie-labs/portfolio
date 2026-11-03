import { THEME_KEY } from "@/lib/theme";

/** Inline JS (same as `setThemeColor` in themeColor.ts): tints the browser UI with `--bg`. */
const TINT = `document.querySelector('meta[name=theme-color]')?.setAttribute('content',getComputedStyle(document.documentElement).getPropertyValue('--bg'))`;

/** Applies a stored light theme before first paint. */
export const THEME_INIT_SCRIPT = `try{if(localStorage.${THEME_KEY}==='light'){document.documentElement.dataset.theme='light';${TINT}}}catch{}`;
