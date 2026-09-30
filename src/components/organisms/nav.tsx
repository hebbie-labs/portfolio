"use client";

import { useState } from "react";
import { NavBar } from "@/components/organisms/nav-bar";
import { NavPanel } from "@/components/organisms/nav-panel";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import useNav from "@/hooks/useNav";

export function Nav() {
  const [open, setOpen] = useState(false);
  const { current } = useNav();

  useEscapeKey(open, () => setOpen(false));

  return (
    <div className="pointer-events-none fixed inset-x-4 top-4 z-50 flex justify-center md:top-5">
      <div
        id="menu"
        data-open={open}
        className={`pointer-events-auto flex flex-col overflow-hidden border border-line p-[5px] backdrop-blur-[14px] transition-[width,background-color,border-radius,box-shadow] duration-[450ms] ease-spring ${
          open
            ? "w-[min(358px,calc(100vw-2rem))] rounded-[28px] bg-bg-2 shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
            : "w-[320px] rounded-[27px] bg-glass"
        }`}
      >
        <NavBar open={open} setOpen={setOpen} current={current} />
        <NavPanel open={open} setOpen={setOpen} current={current} />
      </div>
    </div>
  );
}
