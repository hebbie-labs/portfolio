import Link from "next/link";

type Props = {
  className?: string;
};

export function Logo({ className }: Readonly<Props>) {
  return (
    <div className={className}>
      <Link
        href="/"
        aria-label="Zur Startseite"
        className="flex shrink-0 size-11 items-center justify-center rounded-full bg-fg font-display text-base font-extrabold tracking-[-0.03em] text-bg"
      >
        LH
      </Link>
    </div>
  );
}
