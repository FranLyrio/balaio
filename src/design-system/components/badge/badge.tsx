import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 rounded-tag font-sans font-semibold whitespace-nowrap [&_svg]:size-3.5",
  {
    variants: {
      variant: {
        neutral: "bg-surface-subtle text-fg",
        primary: "bg-primary text-primary-fg",
        accent: "bg-accent text-accent-fg",
        success: "bg-success-subtle text-success",
        danger: "bg-danger-subtle text-danger",
        outline: "border border-border-strong bg-surface text-fg-muted",
      },
      size: {
        sm: "h-5 px-1.5 text-xs",
        md: "h-6 px-2 text-sm",
      },
    },
    defaultVariants: { variant: "neutral", size: "md" },
  },
);

export type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

/** Rótulo curto e não interativo (ex.: "Novo", "-20%", "Frete grátis"). */
export function Badge({ variant, size, className, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { badgeVariants };
