import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = { open: boolean; onToggle: () => void; className?: string };

export function MenuButton({ open, onToggle, className }: Props) {
  const label = (visible: boolean) =>
    `col-start-1 row-start-1 flex items-center gap-2 transition-opacity duration-200 ${
      visible ? "opacity-100" : "opacity-0"
    }`;
  return (
    <Button
      aria-expanded={open}
      aria-controls="menu-panel"
      onClick={onToggle}
      className={cn("px-3 font-medium", className)}
    >
      <span className="grid justify-items-center">
        <span className={label(!open)}>
          Menü
          <Menu aria-hidden />
        </span>
        <span className={label(open)}>
          Schliessen
          <X aria-hidden />
        </span>
      </span>
    </Button>
  );
}
