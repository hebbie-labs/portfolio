import { Input as UiInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.ComponentProps<typeof UiInput>) {
  return <UiInput className={cn("rounded-control", className)} {...props} />;
}
