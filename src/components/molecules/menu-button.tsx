import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { open: boolean; onToggle: () => void };

export function MenuButton({ open, onToggle }: Props) {
  const label = (visible: boolean) =>
    `col-start-1 row-start-1 flex items-center gap-2 transition-opacity duration-200 ${
      visible ? "opacity-100" : "opacity-0"
    }`;
  return (
    <Button
      aria-expanded={open}
      aria-controls="menu-panel"
      onClick={onToggle}
      className={`ml-auto font-medium transition-[margin] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
        open ? "mr-0" : "mr-11"
      }`}
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
