"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Start" },
  { href: "/#arbeiten", label: "Projekte" },
  { href: "/#skills", label: "Skills" },
  { href: "/#ueber-mich", label: "Über mich" },
  { href: "/#kontakt", label: "Kontakt" },
];

const svg = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  "aria-hidden": true,
};

function toggleTheme() {
  const next =
    document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.theme = next;
  } catch {}
}

function ThemeIcon() {
  return (
    <>
      <svg {...svg} className="in-data-[theme=light]:hidden">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg {...svg} className="hidden in-data-[theme=light]:block">
        <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />
      </svg>
    </>
  );
}

function Logo() {
  return (
    <Link
      href="/"
      aria-label="Zur Startseite"
      className="flex size-11 items-center justify-center rounded-full bg-fg font-display text-base font-extrabold tracking-[-0.03em] text-bg"
    >
      LH
    </Link>
  );
}

const btn =
  "flex h-11 items-center gap-2 rounded-full px-4 hover:bg-line cursor-pointer";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const current = pathname.startsWith("/projekte") ? "Projekte" : "Start";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="pointer-events-none fixed inset-x-4 top-4 z-50 flex justify-center md:top-5">
      <div
        id="menu"
        data-open={open}
        className={`pointer-events-auto flex flex-col overflow-hidden border border-line p-[5px] backdrop-blur-[14px] transition-[width,background-color,border-radius,box-shadow] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open
            ? "w-[min(358px,calc(100vw-2rem))] rounded-[28px] bg-bg-2 shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
            : "w-[320px] rounded-[27px] bg-glass"
        }`}
      >
        <div className="relative flex items-center">
          <Logo />
          <span
            className={`flex items-center gap-2 whitespace-nowrap pr-3 pl-3.5 font-mono text-xs text-muted transition-opacity duration-150 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          >
            <span className="size-1.5 shrink-0 rounded-full bg-accent" />
            {current}
          </span>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-panel"
            onClick={() => setOpen(!open)}
            className={`${btn} ml-auto whitespace-nowrap font-medium transition-[margin] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
              open ? "mr-0" : "mr-11"
            }`}
          >
            <span className="grid justify-items-center">
              <span
                className={`col-start-1 row-start-1 flex items-center gap-2 transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              >
                Menü
                <svg {...svg}>
                  <path d="M4 9h16M4 15h16" />
                </svg>
              </span>
              <span
                className={`col-start-1 row-start-1 flex items-center gap-2 transition-opacity duration-200 ${
                  open ? "opacity-100" : "opacity-0"
                }`}
              >
                Schliessen
                <svg {...svg}>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </span>
            </span>
          </button>
          <button
            type="button"
            aria-label="Farbschema wechseln"
            onClick={toggleTheme}
            inert={open}
            className={`absolute right-0 flex size-11 cursor-pointer items-center justify-center rounded-full transition-opacity duration-150 hover:bg-line ${
              open ? "opacity-0" : "opacity-100"
            }`}
          >
            <ThemeIcon />
          </button>
        </div>
        <div
          id="menu-panel"
          inert={!open}
          className={`grid transition-[grid-template-rows,opacity] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <nav aria-label="Hauptnavigation" className="flex flex-col pt-1 pb-2">
              {LINKS.map(({ href, label }, i) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-3.5 rounded-2xl px-3.5 py-2 hover:bg-line"
                >
                  <span className="w-5 font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="grow font-display text-[38px] leading-[1.05] font-semibold tracking-[-0.03em]">
                    {label}
                  </span>
                  {label === current && (
                    <span className="size-2 self-center rounded-full bg-accent" />
                  )}
                </Link>
              ))}
            </nav>
            <div className="flex items-center justify-between border-t border-line px-1 pt-1.5 pb-0.5 font-mono text-xs">
              <button
                type="button"
                onClick={toggleTheme}
                className={`${btn} gap-2.5 px-3.5`}
              >
                <ThemeIcon />
                <span className="in-data-[theme=light]:hidden">Hell</span>
                <span className="hidden in-data-[theme=light]:inline">
                  Dunkel
                </span>
              </button>
              <a
                href="https://github.com/lelelon225"
                className={`${btn} px-3.5`}
              >
                GitHub
                <svg {...svg} width={14} height={14} strokeLinejoin="round">
                  <path d="M7 17L17 7M8 7h9v9" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
