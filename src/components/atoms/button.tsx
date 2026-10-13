import { Button as ShadcnButton } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { cn } from "@/lib/utils";

type ShadcnProps = React.ComponentProps<typeof ShadcnButton>;

type ButtonProps = Omit<ShadcnProps, "variant"> & {
  /** `text` = chrome-less text button; `interactive` = Magic UI hover button (plain button, no `href`). */
  variant?: ShadcnProps["variant"] | "text" | "interactive";
};

const TEXT =
  "h-auto justify-start rounded-none p-0 whitespace-normal hover:bg-transparent active:scale-100";

export function Button({ variant, className, ...props }: ButtonProps) {
  if (variant === "interactive") {
    // ponytail: Magic UI button is a plain <button>, so no href/render/function className
    return (
      <InteractiveHoverButton
        {...(props as React.ComponentProps<"button">)}
        className={typeof className === "string" ? className : undefined}
      />
    );
  }
  if (variant === "text") {
    return (
      <ShadcnButton
        variant="ghost"
        className={cn(TEXT, className)}
        {...props}
      />
    );
  }
  return <ShadcnButton variant={variant} className={className} {...props} />;
}
