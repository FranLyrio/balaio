import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

const skeletonVariants = cva("block animate-pulse bg-divider", {
  variants: {
    shape: {
      text: "h-[1em] w-full rounded-tag",
      rect: "rounded-card",
      circle: "rounded-full",
    },
  },
  defaultVariants: { shape: "rect" },
});

export type SkeletonProps = Omit<ComponentProps<"span">, "children"> &
  VariantProps<typeof skeletonVariants>;

/**
 * Espaço reservado enquanto o conteúdo carrega. É sempre aria-hidden:
 * anuncie o carregamento no contêiner (ex.: aria-busy ou um Spinner).
 */
export function Skeleton({ shape, className, ...props }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      data-slot="skeleton"
      className={cn(skeletonVariants({ shape }), className)}
      {...props}
    />
  );
}

export { skeletonVariants };
