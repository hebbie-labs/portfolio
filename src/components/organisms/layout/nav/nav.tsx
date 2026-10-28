"use client";

import { useCallback, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { NavBar } from "@/components/organisms/layout/nav/nav-bar";
import { NavPanel } from "@/components/organisms/layout/nav/nav-panel";
import { useDismiss } from "@/hooks/use-dismiss";
import { getNavLink } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function Nav() {
  const [open, setOpen] = useState(false);
  const current = getNavLink(usePathname());
  const menu = useRef<HTMLDivElement>(null);

  useDismiss(
    menu,
    open,
    useCallback(() => setOpen(false), []),
  );

  return (
    <header className="pointer-events-none fixed inset-x-4 top-(--nav-top) z-50 flex justify-center">
      <div
        id="menu"
        ref={menu}
        className={cn(
          "pointer-events-auto isolate flex transform-gpu flex-col overflow-hidden border border-line p-1 backdrop-blur-[14px] transition-[width,background-color,border-radius,box-shadow] duration-400 ease-out [interpolate-size:allow-keywords] in-data-[intro=logo]:w-(--nav-h) in-data-[intro=logo]:min-w-0 in-data-[intro=logo]:opacity-0 in-data-[intro=logo]:transition-none",
          open
            ? "w-[min(358px,calc(100vw-2rem))] rounded-[28px] bg-bg-2 shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
            : "w-fit min-w-[min(15.5rem,calc(100vw-2rem))] rounded-[27px] bg-glass shadow-[0_4px_12px_rgba(0,0,0,0.15)]",
        )}
      >
        <NavBar open={open} setOpen={setOpen} current={current} />
        <NavPanel open={open} setOpen={setOpen} current={current} />
      </div>
    </header>
  );
}
