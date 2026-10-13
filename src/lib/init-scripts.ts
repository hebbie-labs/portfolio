import { THEME_KEY } from "@/lib/theme";

/** `sessionStorage` key: set by Intro once the startup screen has played, read by INTRO_INIT_SCRIPT. */
export const INTRO_KEY = "intro";

/** Fallback: the startup screen is skipped after this long even if Intro never marks it done. */
const INTRO_MAX_MS = 8000;

/** Inline JS (same as `setThemeColor` in theme-color.ts): tints the browser UI with a CSS color variable. */
const tint = (variable: string) =>
  `document.querySelector('meta[name=theme-color]')?.setAttribute('content',getComputedStyle(document.documentElement).getPropertyValue('${variable}'))`;

/** Applies a stored light theme before first paint. */
export const THEME_INIT_SCRIPT = `try{if(localStorage.${THEME_KEY}==='light'){document.documentElement.dataset.theme='light';${tint("--bg")}}}catch{}`;

/** Sets `data-intro` before first paint: "logo" = play startup screen (theme-color → --bg-2), "done" = skip (seen this session / reduced motion). */
export const INTRO_INIT_SCRIPT = `try{const r=document.documentElement;r.dataset.intro=sessionStorage.${INTRO_KEY}||matchMedia('(prefers-reduced-motion: reduce)').matches?'done':'logo';if(r.dataset.intro==='logo'){${tint("--bg-2")};setTimeout(()=>{if(r.dataset.intro==='logo'){r.dataset.intro='done';${tint("--bg")}}},${INTRO_MAX_MS})}}catch{document.documentElement.dataset.intro='done'}`;
