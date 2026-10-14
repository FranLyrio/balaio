import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

const textVariants = cva("font-sans", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    tone: {
      default: "text-fg",
      muted: "text-fg-muted",
      subtle: "text-fg-subtle",
      primary: "text-primary",
      success: "text-success",
      danger: "text-danger",
      inverse: "text-fg-inverse",
      "inverse-muted": "text-fg-inverse-muted",
      inherit: "",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
    /** Números tabulares, para preços e valores alinhados. */
    numeric: { true: "tabular-nums" },
    truncate: { true: "truncate" },
  },
  defaultVariants: { size: "base", tone: "default", weight: "regular" },
});

type TextElement = "p" | "span" | "div" | "strong" | "em" | "small" | "label" | "dd" | "dt";

export type TextProps = ComponentProps<"p"> &
  VariantProps<typeof textVariants> & {
    as?: TextElement;
    htmlFor?: string;
  };

export function Text({
  as: Tag = "p",
  size,
  tone,
  weight,
  numeric,
  truncate,
  className,
  ...props
}: TextProps) {
  const Comp = Tag as "p";
  return (
    <Comp
      className={cn(textVariants({ size, tone, weight, numeric, truncate }), className)}
      {...props}
    />
  );
}

export { textVariants };
