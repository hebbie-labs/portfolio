"use client";

import { useState } from "react";
import { NavBar } from "@/components/organisms/nav-bar";
import { NavPanel } from "@/components/organisms/nav-panel";
import useNav from "@/hooks/useNav";

export function Nav() {
  const [open, setOpen] = useState(false);
  const { current } = useNav();

  return (
    <div className="pointer-events-none fixed inset-x-4 top-(--nav-top) z-50 flex justify-center">
      <div
        id="menu"
        data-open={open}
        className={`pointer-events-auto isolate flex transform-gpu flex-col overflow-hidden border border-line p-1 backdrop-blur-14 transition-[width,background-color,border-radius,box-shadow] duration-450 ease-in-out in-data-[intro=logo]:w-[54px] in-data-[intro=logo]:opacity-0 in-data-[intro=logo]:transition-none ${
          open
            ? "w-[min(358px,calc(100vw-2rem))] rounded-[28px] bg-bg-2 shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
            : "w-[320px] rounded-[27px] bg-glass shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
        }`}
      >
        <NavBar open={open} setOpen={setOpen} current={current} />
        <NavPanel open={open} setOpen={setOpen} current={current} />
      </div>
    </div>
  );
}
