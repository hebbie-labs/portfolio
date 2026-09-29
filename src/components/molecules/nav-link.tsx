import Link from "next/link";

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
      className="flex items-baseline gap-3.5 rounded-2xl px-3.5 py-2 hover:bg-line"
    >
      <span className="w-5 font-mono text-xs text-muted">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="grow font-display text-[38px] leading-[1.05] font-semibold tracking-[-0.03em]">
        {label}
      </span>
      {active && <span className="size-2 self-center rounded-full bg-accent" />}
    </Link>
  );
}
