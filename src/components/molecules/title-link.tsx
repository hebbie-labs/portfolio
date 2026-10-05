import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Display } from "@/components/atoms/typography";
import { cn } from "@/lib/utils";

/** Large title with an arrow; turns accent on hover. `narrow` wraps the title word by word. */
export function TitleLink({
  narrow,
  children,
  ...props
}: React.ComponentProps<typeof Link> & { narrow?: boolean }) {
  return (
    <Link
      className="group flex origin-left items-end gap-4 transition-transform active:scale-[0.99]"
      {...props}
    >
      <Display
        as="span"
        size="md"
        className={cn(
          "transition-colors duration-300 group-hover:text-accent",
          narrow && "w-min",
        )}
      >
        {children}
      </Display>
      <ArrowRight
        className="size-10 shrink-0 text-accent transition-transform group-hover:translate-x-1 md:size-16"
        aria-hidden
      />
    </Link>
  );
}
