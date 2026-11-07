"use client";

import type { MouseEvent } from "react";
import { MENU_OPEN_EVENT, NAV_TEXT } from "@/constants/nav";

/** Accent full stop that opens the punkt menu (`organisms/layout/Nav/PunktMenu`) from its own position. */
export function MenuPunkt() {
  const open = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    window.dispatchEvent(
      new CustomEvent(MENU_OPEN_EVENT, {
        detail: { x: r.left + r.width / 2, y: r.bottom - r.height * 0.2 },
      }),
    );
  };

  return (
    <button
      type="button"
      aria-label={NAV_TEXT.menuOpen}
      onClick={open}
      className="punkt-nudge inline-block [transform-origin:50%_78%] cursor-pointer text-accent transition-transform hover:scale-[1.2]"
    >
      .
    </button>
  );
}
