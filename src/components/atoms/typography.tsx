import type { ComponentProps, ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type Props<V = object> = V & ComponentProps<"p"> & { as?: ElementType };

const PUNCT = /((?:(?!@)\p{P})+)/u; // Unicode punctuation (. , ! ? : ; - – — ' " ( ) … & /) except @

/** Colors punctuation and symbols in accent; skipped for non-strings. */
function accentPunct(children: Props["children"]) {
  if (typeof children !== "string") return children;
  return children
    .split(PUNCT)
    .map((part, i) => (i % 2 ? <span key={i} className="text-accent">{part}</span> : part));
}

const displayVariants = cva("overflow-clip font-display font-condensed font-extrabold uppercase", {
  variants: {
    size: { xl: "text-display", lg: "text-display-lg", md: "text-display-md" },
  },
  defaultVariants: { size: "xl" },
});

const headlineVariants = cva("font-display font-semibold", {
  variants: { size: { lg: "text-headline", sm: "text-headline-sm" } },
  defaultVariants: { size: "lg" },
});

/** Hero, section and project titles. */
export function Display({
  as: Tag = "h1",
  size,
  className,
  children,
  ...props
}: Props<VariantProps<typeof displayVariants>>) {
  return (
    <Tag className={cn(displayVariants({ size }), className)} {...props}>
      {accentPunct(children)}
    </Tag>
  );
}

/** Page and card headings. */
export function Headline({
  as: Tag = "h2",
  size,
  className,
  children,
  ...props
}: Props<VariantProps<typeof headlineVariants>>) {
  return (
    <Tag className={cn(headlineVariants({ size }), className)} {...props}>
      {accentPunct(children)}
    </Tag>
  );
}

/** Intro paragraphs. */
export function Lead({ as: Tag = "p", className, ...props }: Props) {
  return (
    <Tag
      className={cn("text-xl leading-[1.3] tracking-[-0.01em] md:text-headline-sm", className)}
      {...props}
    />
  );
}

/** Regular paragraphs. */
export function Body({ as: Tag = "p", muted, className, ...props }: Props<{ muted?: boolean }>) {
  return (
    <Tag
      className={cn("text-base leading-normal md:text-lg", muted && "text-muted", className)}
      {...props}
    />
  );
}

/** Meta lines, eyebrows, footer. */
export function Label({ as: Tag = "span", className, ...props }: Props) {
  return (
    <Tag className={cn("font-mono text-xs text-muted md:text-[13px]", className)} {...props} />
  );
}
