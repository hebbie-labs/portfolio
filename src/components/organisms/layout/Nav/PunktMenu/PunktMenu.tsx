"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { MENU_OPEN_EVENT, NAV_LINKS, NAV_TEXT } from "@/constants/nav";
import { GITHUB_URL } from "@/constants/site";
import { useWindowEvent } from "@/hooks/useWindowEvent";
import { getNavLink } from "@/lib/nav";
import { cn } from "@/lib/utils";

type Origin = { x: number; y: number };

/** Toggle with the current page; opening grows an accent square from its dot (or from `atoms/MenuPunkt`) over the screen. */
export function PunktMenu() {
  const current = getNavLink(usePathname());
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<Origin>({ x: 0, y: 0 });
  const [size, setSize] = useState(0);
  const dotRef = useRef<HTMLSpanElement>(null);

  const show = ({ x, y }: Origin) => {
    setOrigin({ x, y });
    setSize(Math.ceil(Math.hypot(window.innerWidth, window.innerHeight) / 4));
    setOpen(true);
  };

  useWindowEvent(MENU_OPEN_EVENT, (e) =>
    show((e as CustomEvent<Origin>).detail),
  );
  useWindowEvent("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  const toggle = () => {
    if (open) {
      setOpen(false);
      return;
    }
    const r = dotRef.current?.getBoundingClientRect();
    if (r) show({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  return (
    <>
      <Button
        variant="outline"
        data-menu-open={open || undefined}
        aria-expanded={open}
        aria-label={open ? NAV_TEXT.menuClose : NAV_TEXT.menuOpen}
        onClick={toggle}
        className={cn(
          "group relative z-20 gap-2.5 self-center text-xs uppercase",
          open
            ? "border-accent-ink text-accent-ink hover:border-accent-ink"
            : "border-muted text-muted",
        )}
      >
        <span
          ref={dotRef}
          className={cn(
            "punkt-ping size-2.5 shrink-0 rounded-full transition-transform group-hover:scale-[1.8]",
            open ? "bg-accent-ink" : "bg-accent",
          )}
        />
        {current.label} /{" "}
        <strong className={cn("font-semibold", !open && "text-fg")}>
          {open ? NAV_TEXT.close : NAV_TEXT.menu}
        </strong>
      </Button>

      <span
        aria-hidden="true"
        className="fixed z-10 -mt-1 -ml-1 size-2 bg-accent [transition:transform_.6s_steps(14)] motion-reduce:transition-none"
        style={{
          left: origin.x,
          top: origin.y,
          transform: `scale(${open ? size : 0})`,
        }}
      />

      <nav
        aria-label={NAV_TEXT.ariaLabel}
        inert={!open}
        className={cn(
          "fixed inset-0 z-10 flex flex-col justify-center gap-4 px-6 pt-24 pb-6 text-accent-ink transition-[opacity,visibility] duration-200 md:px-20",
          open ? "visible opacity-100 delay-300" : "invisible opacity-0",
        )}
      >
        {NAV_LINKS.map(({ href, label }, i) => {
          const isCurrent = href === current.href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={isCurrent ? "page" : undefined}
              onClick={() => setOpen(false)}
              className={cn(
                "group flex items-baseline gap-4",
                open && "punkt-rise",
              )}
              style={{ animationDelay: `${300 + i * 70}ms` }}
            >
              <span className="w-6 text-xs">0{i + 1}</span>
              <span className="font-display text-[clamp(56px,min(22vh,20vw),190px)] leading-[.95] font-bold transition-transform duration-200 group-hover:translate-x-4">
                {label}
                <span
                  className={cn(
                    !isCurrent && "opacity-0 group-hover:opacity-100",
                  )}
                >
                  .
                </span>
              </span>
            </Link>
          );
        })}
        <div className="flex justify-end text-sm font-medium">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center"
          >
            {NAV_TEXT.github}
          </a>
        </div>
      </nav>
    </>
  );
}
