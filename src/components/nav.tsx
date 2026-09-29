"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Start" },
  { href: "/#arbeiten", label: "Projekte" },
  { href: "/#skills", label: "Skills" },
  { href: "/#ueber-mich", label: "Über mich" },
  { href: "/#kontakt", label: "Kontakt" },
];

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
      <Sun className="in-data-[theme=light]:hidden" aria-hidden />
      <Moon className="hidden in-data-[theme=light]:block" aria-hidden />
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
          <Button
            aria-expanded={open}
            aria-controls="menu-panel"
            onClick={() => setOpen(!open)}
            className={`ml-auto font-medium transition-[margin] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
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
                <Menu aria-hidden />
              </span>
              <span
                className={`col-start-1 row-start-1 flex items-center gap-2 transition-opacity duration-200 ${
                  open ? "opacity-100" : "opacity-0"
                }`}
              >
                Schliessen
                <X aria-hidden />
              </span>
            </span>
          </Button>
          <Button
            size="icon"
            aria-label="Farbschema wechseln"
            onClick={toggleTheme}
            inert={open}
            className={`absolute right-0 transition-opacity duration-150 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          >
            <ThemeIcon />
          </Button>
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
              <Button onClick={toggleTheme} className="gap-2.5 px-3.5">
                <ThemeIcon />
                <span className="in-data-[theme=light]:hidden">Hell</span>
                <span className="hidden in-data-[theme=light]:inline">
                  Dunkel
                </span>
              </Button>
              <a
                href="https://github.com/lelelon225"
                className={cn(buttonVariants(), "px-3.5")}
              >
                GitHub
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
