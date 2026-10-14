import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

const headingVariants = cva("font-display text-balance", {
  variants: {
    size: {
      "6xl": "text-6xl tracking-display-tighter",
      "5xl": "text-5xl tracking-display-tighter",
      "4xl": "text-4xl tracking-display-tight",
      "3xl": "text-3xl tracking-display-tight",
      "2xl": "text-2xl tracking-display",
      xl: "text-xl tracking-display",
      lg: "text-lg tracking-display",
    },
    weight: {
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
    tone: {
      default: "text-fg",
      muted: "text-fg-muted",
      inverse: "text-fg-inverse",
    },
  },
  defaultVariants: { weight: "bold", tone: "default" },
});

type Level = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
/** `p`, `div` e `span` servem para texto de display que não entra no sumário da página. */
type HeadingElement = Level | "p" | "div" | "span";

const sizeByLevel = {
  h1: "5xl",
  h2: "4xl",
  h3: "3xl",
  h4: "2xl",
  h5: "xl",
  h6: "lg",
  p: "2xl",
  div: "2xl",
  span: "2xl",
} as const satisfies Record<
  HeadingElement,
  NonNullable<VariantProps<typeof headingVariants>["size"]>
>;

export type HeadingProps = ComponentProps<"h2"> &
  VariantProps<typeof headingVariants> & {
    /** Nível semântico. O tamanho visual segue o nível, mas pode ser trocado com `size`. */
    as?: HeadingElement;
  };

export function Heading({ as: Tag = "h2", size, weight, tone, className, ...props }: HeadingProps) {
  const Comp = Tag as "h2";
  return (
    <Comp
      className={cn(headingVariants({ size: size ?? sizeByLevel[Tag], weight, tone }), className)}
      {...props}
    />
  );
}

export { headingVariants };
