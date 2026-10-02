import { Body } from "@/components/atoms/typography";
import { Separator } from "@/components/ui/separator";

export function DividerLabel({ children }: { children: string }) {
  return (
    <div className="flex w-full items-center gap-4">
      <Separator className="flex-1 bg-muted/40" />
      <Body muted>{children}</Body>
      <Separator className="flex-1 bg-muted/40" />
    </div>
  );
}
