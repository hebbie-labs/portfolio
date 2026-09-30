"use client";

import { useEffect, useState } from "react";
import MaximizedNav from "../molecules/nav-maximized";
import MinimizedNav from "../molecules/nav-minimized";
import useNav from "@/hooks/useNav";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { current } = useNav();

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
        <MinimizedNav open={open} setOpen={setOpen} current={current} />
        <MaximizedNav open={open} setOpen={setOpen} current={current} />
      </div>
    </div>
  );
}
