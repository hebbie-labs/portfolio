import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Outlined pill link with a trailing arrow. */
export function ArrowLink({ className, children, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        buttonVariants({ variant: "outline" }),
        "group h-13 border-fg px-5 transition-colors hover:bg-fg hover:text-bg",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight className="transition-transform group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}
