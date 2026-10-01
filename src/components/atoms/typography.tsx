import type { ComponentProps, ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type Props<V = object> = V & ComponentProps<"p"> & { as?: ElementType };

const displayVariants = cva(
  "font-display font-condensed font-extrabold uppercase leading-[0.82] tracking-[-0.03em]",
  {
    variants: {
      size: { xl: "text-display", lg: "text-display-lg", md: "text-display-md" },
    },
    defaultVariants: { size: "xl" },
  },
);

const headlineVariants = cva(
  "font-display font-semibold leading-[1.05] tracking-[-0.025em]",
  {
    variants: { size: { lg: "text-headline", sm: "text-[28px]" } },
    defaultVariants: { size: "lg" },
  },
);

/** Hero, section and project titles. */
export function Display({
  as: Tag = "h1",
  size,
  className,
  ...props
}: Props<VariantProps<typeof displayVariants>>) {
  return <Tag className={cn(displayVariants({ size }), className)} {...props} />;
}

/** Page and card headings. */
export function Headline({
  as: Tag = "h2",
  size,
  className,
  ...props
}: Props<VariantProps<typeof headlineVariants>>) {
  return (
    <Tag className={cn(headlineVariants({ size }), className)} {...props} />
  );
}

/** Intro paragraphs. */
export function Lead({ as: Tag = "p", className, ...props }: Props) {
  return (
    <Tag
      className={cn(
        "text-xl leading-[1.3] tracking-[-0.01em] md:text-[28px]",
        className,
      )}
      {...props}
    />
  );
}

/** Regular paragraphs. */
export function Body({
  as: Tag = "p",
  muted,
  className,
  ...props
}: Props<{ muted?: boolean }>) {
  return (
    <Tag
      className={cn(
        "text-base leading-normal md:text-lg",
        muted && "text-muted",
        className,
      )}
      {...props}
    />
  );
}

/** Meta lines, eyebrows, footer. */
export function Label({ as: Tag = "span", className, ...props }: Props) {
  return (
    <Tag
      className={cn("font-mono text-xs text-muted md:text-[13px]", className)}
      {...props}
    />
  );
}
