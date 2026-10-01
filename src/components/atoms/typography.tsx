import type { ComponentProps, ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { TextAnimate } from "@/components/ui/text-animate";
import { cn } from "@/lib/utils";

type AnimateOptions = Omit<
  ComponentProps<typeof TextAnimate>,
  "children" | "as" | "className"
>;

/** `animate` runs the text through TextAnimate (children must be a string). */
type Props<V = object> = V &
  ComponentProps<"p"> & { as?: ElementType; animate?: boolean | AnimateOptions };

// ponytail: other props (id, onClick, …) are dropped when animating, forward them if needed
function Text({
  as: Tag,
  animate,
  className,
  children,
  ...props
}: Props & { as: ElementType }) {
  if (!animate) {
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }
  return (
    <TextAnimate
      as={Tag as ComponentProps<typeof TextAnimate>["as"]}
      className={className}
      {...(animate === true ? {} : animate)}
    >
      {children as string}
    </TextAnimate>
  );
}

const PUNCT = /((?:(?!@)\p{P})+)/u; // Unicode punctuation (. , ! ? : ; - – — ' " ( ) … & /) except @

/** Colors punctuation and symbols in accent; skipped for non-strings and `animate` (TextAnimate needs a plain string). */
function accentPunct({ children, animate }: Pick<Props, "children" | "animate">) {
  if (typeof children !== "string" || animate) return children;
  return children
    .split(PUNCT)
    .map((part, i) => (i % 2 ? <span key={i} className="text-accent">{part}</span> : part));
}

const displayVariants = cva(
  "overflow-clip font-display font-condensed font-extrabold uppercase leading-[0.82] tracking-[-0.03em]",
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
  children,
  ...props
}: Props<VariantProps<typeof displayVariants>>) {
  return (
    <Text as={Tag} className={cn(displayVariants({ size }), className)} {...props}>
      {accentPunct({ children, animate: props.animate })}
    </Text>
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
    <Text as={Tag} className={cn(headlineVariants({ size }), className)} {...props}>
      {accentPunct({ children, animate: props.animate })}
    </Text>
  );
}

/** Intro paragraphs. */
export function Lead({ as: Tag = "p", className, ...props }: Props) {
  return (
    <Text
      as={Tag}
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
    <Text
      as={Tag}
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
    <Text
      as={Tag}
      className={cn("font-mono text-xs text-muted md:text-[13px]", className)}
      {...props}
    />
  );
}
