import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackLink({ children, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link className="lnk group flex items-center gap-2" {...props}>
      <ArrowLeft className="size-4.5 transition-transform group-hover:-translate-x-1" aria-hidden />
      {children}
    </Link>
  );
}
