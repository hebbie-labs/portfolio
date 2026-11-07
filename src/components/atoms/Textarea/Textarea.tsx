import { Textarea as UiTextarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.ComponentProps<typeof UiTextarea>) {
  return <UiTextarea className={cn("rounded-control", className)} {...props} />;
}
