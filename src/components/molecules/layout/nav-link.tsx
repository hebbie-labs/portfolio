import Link from "next/link";
import { StatusDot } from "@/components/atoms/status-dot";

type Props = {
  href: string;
  label: string;
  index: number;
  active: boolean;
  onClick: () => void;
};

export function NavLink({ href, label, index, active, onClick }: Props) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex items-baseline gap-3.5 rounded-2xl px-3.5 py-2 transition-transform active:scale-[0.98]"
    >
      <span className="w-5 font-mono text-xs text-muted">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="grow font-display text-4xl leading-[1.05] font-semibold transition-[color,translate] duration-200 ease-out group-hover:translate-x-2 group-hover:text-accent">
        {label}
      </span>
      {active && <StatusDot className="size-2 self-center" />}
    </Link>
  );
}
