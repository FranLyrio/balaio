"use client";

import type { VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { controlVariants } from "../../lib/control";
import { useFieldControl } from "../field/field";

export type InputProps = Omit<ComponentProps<"input">, "size"> &
  VariantProps<typeof controlVariants> & {
    /** Ícone decorativo no início do campo. */
    startIcon?: ReactNode;
    /** Ícone decorativo no fim do campo. */
    endIcon?: ReactNode;
  };

export function Input({ size, startIcon, endIcon, className, type = "text", ...rest }: InputProps) {
  const props = useFieldControl(rest);
  const input = (
    <input
      type={type}
      data-slot="input"
      className={cn(
        controlVariants({ size }),
        startIcon && "pl-11",
        endIcon && "pr-11",
        !startIcon && !endIcon && className,
      )}
      {...props}
    />
  );
  if (!startIcon && !endIcon) return input;
  return (
    <div className={cn("relative flex items-center", className)}>
      {startIcon ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-4 flex text-fg-subtle [&_svg]:size-5"
        >
          {startIcon}
        </span>
      ) : null}
      {input}
      {endIcon ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 flex text-fg-subtle [&_svg]:size-5"
        >
          {endIcon}
        </span>
      ) : null}
    </div>
  );
}
