import { Separator } from "@/components/ui/separator";

export function DividerLabel({ children }: { children: string }) {
  return (
    <div className="flex w-full max-w-sm items-center gap-4">
      <Separator className="flex-1" />
      <p className="text-muted">{children}</p>
      <Separator className="flex-1" />
    </div>
  );
}
