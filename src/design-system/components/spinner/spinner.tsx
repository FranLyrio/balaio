import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

const spinnerVariants = cva(
  "inline-block shrink-0 animate-spin motion-reduce:animate-[spin_1.6s_linear_infinite]",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
        xl: "size-8",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type SpinnerProps = Omit<ComponentProps<"span">, "children"> &
  VariantProps<typeof spinnerVariants> & {
    /** Texto lido por leitores de tela. */
    label?: string;
    /** Quando o contexto já anuncia o carregamento (ex.: dentro de um botão). */
    decorative?: boolean;
  };

export function Spinner({
  size,
  label = "Carregando",
  decorative = false,
  className,
  ...props
}: SpinnerProps) {
  const a11y = decorative
    ? { "aria-hidden": true as const }
    : { role: "status" as const, "aria-label": label };
  return (
    <span
      data-essential-motion=""
      className={cn(spinnerVariants({ size }), className)}
      {...a11y}
      {...props}
    >
      <svg viewBox="0 0 24 24" fill="none" className="size-full" aria-hidden="true">
        <circle
          cx="12"
          cy="12"
          r="9.5"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="3"
        />
        <path
          d="M21.5 12A9.5 9.5 0 0 0 12 2.5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export { spinnerVariants };
