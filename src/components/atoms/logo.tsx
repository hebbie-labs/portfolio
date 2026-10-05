import Link from "next/link";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function Logo({ className }: Props) {
  return (
    <Link
      href="/"
      aria-label="Zur Startseite"
      className={cn(
        "flex size-11 shrink-0 items-center justify-center",
        className,
      )}
    >
      <LogoIcon className="h-8" />
    </Link>
  );
}

/** LH mark without background; `text-fg` flips black/white with the theme. */
export function LogoIcon({ className }: Props) {
  return (
    <svg
      viewBox="382 318 490 619"
      fill="currentColor"
      aria-hidden="true"
      className={cn("text-fg", className)}
    >
      <path d="M382 342A24 24 0 0 1 406 318L436 318A24 24 0 0 1 460 342L460 679A24 24 0 0 0 484 703L542 703A24 24 0 0 1 566 727L566 859A24 24 0 0 1 542 883L518 883A24 24 0 0 1 494 859L494 787A24 24 0 0 0 470 763L406 763A24 24 0 0 1 382 739ZM494 503A24 24 0 0 1 518 479L542 479A24 24 0 0 1 566 503L566 596A24 24 0 0 0 590 620L770 620A24 24 0 0 0 794 596L794 503A24 24 0 0 1 818 479L848 479A24 24 0 0 1 872 503L872 913A24 24 0 0 1 848 937L818 937A24 24 0 0 1 794 913L794 706A24 24 0 0 0 770 682L518 682A24 24 0 0 1 494 658Z" />
    </svg>
  );
}
