import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/button";
import { NAV_TEXT } from "@/constants/nav";

// Only the visible label is in flow, so the button is as wide as what it shows; the hidden one is absolute and clipped.
const LABEL =
  "col-start-1 row-start-1 flex items-center gap-2 transition-[opacity,filter] duration-200";

type Props = { open: boolean; onToggle: () => void; className?: string };

export function MenuButton({ open, onToggle, className }: Readonly<Props>) {
  return (
    <Button
      aria-expanded={open}
      aria-controls={open ? "menu-panel" : undefined}
      onClick={onToggle}
      className={cn("group px-3 font-medium", className)}
    >
      <span className="relative grid justify-items-center overflow-hidden">
        <span
          className={cn(
            LABEL,
            "group-aria-expanded:absolute group-aria-expanded:opacity-0 group-aria-expanded:blur-[2px]",
          )}
        >
          {NAV_TEXT.menuOpen}
          <Menu aria-hidden />
        </span>
        <span
          className={cn(
            LABEL,
            "absolute opacity-0 blur-[2px] group-aria-expanded:static group-aria-expanded:opacity-100 group-aria-expanded:blur-none",
          )}
        >
          {NAV_TEXT.menuClose}
          <X aria-hidden />
        </span>
      </span>
    </Button>
  );
}
