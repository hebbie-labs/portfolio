/** `sessionStorage` key: set by Intro once the startup screen has played, read by INTRO_INIT_SCRIPT. */
export const INTRO_KEY = "intro";

export const THEME_INIT_SCRIPT =
  "try{if(localStorage.theme==='light'){const r=document.documentElement;r.dataset.theme='light';document.querySelector('meta[name=theme-color]')?.setAttribute('content',getComputedStyle(r).getPropertyValue('--bg'))}}catch{}";

/** Sets `data-intro` before first paint: "logo" = play startup screen (theme-color → --bg-2), "done" = skip (seen this session / reduced motion). */
export const INTRO_INIT_SCRIPT = `try{const r=document.documentElement,m=document.querySelector('meta[name=theme-color]'),c=v=>m?.setAttribute('content',getComputedStyle(r).getPropertyValue(v));r.dataset.intro=sessionStorage.${INTRO_KEY}||matchMedia('(prefers-reduced-motion: reduce)').matches?'done':'logo';if(r.dataset.intro==='logo'){c('--bg-2');setTimeout(()=>{if(r.dataset.intro==='logo'){r.dataset.intro='done';c('--bg')}},8000)}}catch{document.documentElement.dataset.intro='done'}`;
