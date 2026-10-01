import { cn } from "@/lib/utils";

export function StatusDot({ className }: { className?: string }) {
  return (
    <span className={cn("shrink-0 rounded-full bg-accent", className)} />
  );
}
