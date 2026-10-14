import { cva, type VariantProps } from "class-variance-authority";
import type { LucideIcon, LucideProps } from "lucide-react";
import { cn } from "../../lib/cn";

const iconVariants = cva("shrink-0", {
  variants: {
    size: {
      xs: "size-3.5",
      sm: "size-4",
      md: "size-5",
      lg: "size-6",
      xl: "size-8",
    },
  },
  defaultVariants: { size: "md" },
});

const strokeBySize = { xs: 2.25, sm: 2, md: 2, lg: 1.75, xl: 1.5 } as const;

export type IconProps = Omit<LucideProps, "size"> &
  VariantProps<typeof iconVariants> & {
    /** Ícone do lucide-react, ex.: `icon={Search}`. */
    icon: LucideIcon;
    /** Quando o ícone carrega significado sozinho. Sem label ele é decorativo. */
    label?: string;
  };

/** Padroniza tamanho, traço e acessibilidade dos ícones do lucide-react. */
export function Icon({ icon: Glyph, size, label, className, strokeWidth, ...props }: IconProps) {
  const a11y = label
    ? { role: "img" as const, "aria-label": label }
    : { "aria-hidden": true as const, focusable: false as const };
  return (
    <Glyph
      className={cn(iconVariants({ size }), className)}
      strokeWidth={strokeWidth ?? strokeBySize[size ?? "md"]}
      {...a11y}
      {...props}
    />
  );
}

export { iconVariants };
