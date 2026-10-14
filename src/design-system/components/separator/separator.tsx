import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

const separatorVariants = cva("shrink-0 border-0 bg-divider", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-auto w-px self-stretch",
    },
    tone: {
      default: "bg-divider",
      strong: "bg-border",
    },
  },
  defaultVariants: { orientation: "horizontal", tone: "default" },
});

export type SeparatorProps = Omit<ComponentProps<"div">, "children"> &
  VariantProps<typeof separatorVariants> & {
    /** Decorativo (padrão) é ignorado por leitores de tela. */
    decorative?: boolean;
  };

export function Separator({
  orientation = "horizontal",
  tone,
  decorative = true,
  className,
  ...props
}: SeparatorProps) {
  const a11y = decorative
    ? { role: "none" as const }
    : { role: "separator" as const, "aria-orientation": orientation ?? undefined };
  return (
    <div
      data-slot="separator"
      className={cn(separatorVariants({ orientation, tone }), className)}
      {...a11y}
      {...props}
    />
  );
}

export { separatorVariants };
