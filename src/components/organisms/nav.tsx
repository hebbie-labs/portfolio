"use client";

import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/atoms/logo";
import { MenuButton } from "@/components/molecules/menu-button";
import { NavLink } from "@/components/molecules/nav-link";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Start" },
  { href: "/#arbeiten", label: "Projekte" },
  { href: "/#skills", label: "Skills" },
  { href: "/#ueber-mich", label: "Über mich" },
  { href: "/#kontakt", label: "Kontakt" },
];

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
          <MenuButton open={open} onToggle={() => setOpen(!open)} />
          <AnimatedThemeToggler
            aria-label="Farbschema wechseln"
            inert={open}
            className={cn(
              buttonVariants({ size: "icon" }),
              `absolute right-0 transition-opacity duration-150 ${
                open ? "opacity-0" : "opacity-100"
              }`
            )}
          />
        </div>
        <div
          id="menu-panel"
          inert={!open}
          className={`grid transition-[grid-template-rows,opacity] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <nav
              aria-label="Hauptnavigation"
              className="flex flex-col pt-1 pb-2"
            >
              {LINKS.map(({ href, label }, i) => (
                <NavLink
                  key={href}
                  href={href}
                  label={label}
                  index={i}
                  active={label === current}
                  onClick={() => setOpen(false)}
                />
              ))}
            </nav>
            <div className="flex items-center justify-between border-t border-line px-1 pt-1.5 pb-0.5 font-mono text-xs">
              <AnimatedThemeToggler
                className={cn(buttonVariants(), "gap-2.5 px-3.5")}
              >
                <span className="in-data-[theme=light]:hidden">Hell</span>
                <span className="hidden in-data-[theme=light]:inline">
                  Dunkel
                </span>
              </AnimatedThemeToggler>
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
