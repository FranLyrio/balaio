import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

const linkVariants = cva(
  [
    "inline-flex items-center gap-1 rounded-[4px] font-semibold",
    "decoration-[1.5px] underline-offset-4 transition-colors duration-(--duration-fast)",
  ],
  {
    variants: {
      tone: {
        primary: "text-primary hover:text-primary-hover",
        default: "text-fg hover:text-primary",
        muted: "text-fg-muted hover:text-fg",
        inverse: "text-fg-inverse hover:text-fg-inverse-muted",
      },
      underline: {
        always: "underline",
        hover: "no-underline hover:underline",
        none: "no-underline",
      },
      size: {
        inherit: "",
        sm: "text-sm",
        md: "text-md",
        base: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: { tone: "primary", underline: "always", size: "inherit" },
  },
);

export type LinkProps = ComponentProps<"a"> &
  VariantProps<typeof linkVariants> & {
    /**
     * Aplica o estilo ao filho. Use para links do framework, ex.:
     * `<Link asChild><NextLink href="/">Início</NextLink></Link>`.
     */
    asChild?: boolean;
  };

/** Link estilizado. Não depende de nenhum roteador: use `asChild` para integrar. */
export function Link({ asChild, tone, underline, size, className, ...props }: LinkProps) {
  const Comp = asChild ? Slot : "a";
  return <Comp className={cn(linkVariants({ tone, underline, size }), className)} {...props} />;
}

export { linkVariants };
