import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NAV_TEXT } from "@/constants/nav";

const LABEL =
  "col-start-1 row-start-1 flex items-center gap-2 transition-opacity duration-200";

type Props = { open: boolean; onToggle: () => void; className?: string };

export function MenuButton({ open, onToggle, className }: Props) {
  return (
    <Button
      aria-expanded={open}
      aria-controls={open ? "menu-panel" : undefined}
      onClick={onToggle}
      className={cn("group px-3 font-medium", className)}
    >
      <span className="grid justify-items-center">
        <span className={cn(LABEL, "group-aria-expanded:opacity-0")}>
          {NAV_TEXT.menuOpen}
          <Menu aria-hidden />
        </span>
        <span
          className={cn(LABEL, "opacity-0 group-aria-expanded:opacity-100")}
        >
          {NAV_TEXT.menuClose}
          <X aria-hidden />
        </span>
      </span>
    </Button>
  );
}
