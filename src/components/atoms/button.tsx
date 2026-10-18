import { Button as ShadcnButton } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { cn } from "@/lib/utils";

type ShadcnProps = React.ComponentProps<typeof ShadcnButton>;

type ButtonProps = Omit<ShadcnProps, "variant" | "size"> & {
  /** `text` = chrome-less text button; `interactive` = Magic UI hover button (plain button, no `href`). */
  variant?: ShadcnProps["variant"] | "text" | "interactive";
  /** `lg` = prominent call to action (ignored by `interactive`). */
  size?: ShadcnProps["size"] | "lg";
};

const LG = "h-13 px-6 text-base font-semibold";

const TEXT =
  "h-auto justify-start rounded-none p-0 whitespace-normal hover:bg-transparent active:scale-100";

export function Button({ variant, size, className, ...props }: ButtonProps) {
  if (variant === "interactive") {
    // ponytail: only a string className is passed on (the Magic UI button styles inner elements itself)
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
  return (
    <ShadcnButton
      variant={variant}
      size={size === "lg" ? undefined : size}
      className={cn(size === "lg" && LG, className)}
      {...props}
    />
  );
}
