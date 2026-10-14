import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

export type VisuallyHiddenProps = ComponentProps<"span"> & {
  /** Aplica o comportamento ao filho em vez de renderizar um <span>. */
  asChild?: boolean;
};

/** Esconde o conteúdo visualmente, mas mantém para leitores de tela. */
export function VisuallyHidden({ asChild, className, ...props }: VisuallyHiddenProps) {
  const Comp = asChild ? Slot : "span";
  return <Comp className={cn("sr-only", className)} {...props} />;
}
