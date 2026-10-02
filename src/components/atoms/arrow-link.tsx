import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Outlined pill link with a trailing arrow. */
export function ArrowLink({ className, children, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(buttonVariants({ variant: "outline" }), "h-13 border-fg px-5", className)}
      {...props}
    >
      {children}
      <ArrowRight aria-hidden />
    </Link>
  );
}
