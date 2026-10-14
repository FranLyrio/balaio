import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

const cardVariants = cva("rounded-card border", {
  variants: {
    tone: {
      surface: "border-border bg-surface text-fg",
      subtle: "border-transparent bg-surface-subtle text-fg",
      inverse: "border-transparent bg-surface-inverse text-fg-inverse",
      accent: "border-transparent bg-accent text-accent-fg",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
    interactive: {
      true: "transition-colors duration-(--duration-fast) hover:border-border-strong",
    },
  },
  defaultVariants: { tone: "surface", padding: "md" },
});

export type CardProps = ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & {
    /** Renderiza como o filho (ex.: <article>, <section> ou um link). */
    asChild?: boolean;
  };

/** Superfície com borda. Visual chapado: sem sombra. */
export function Card({ tone, padding, interactive, asChild, className, ...props }: CardProps) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      data-slot="card"
      className={cn(cardVariants({ tone, padding, interactive }), className)}
      {...props}
    />
  );
}

export { cardVariants };
