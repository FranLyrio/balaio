"use client";

import type { VariantProps } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";
import { controlVariants } from "../../lib/control";
import { useFieldControl } from "../field/field";

export type SelectProps = Omit<ComponentProps<"select">, "size"> &
  VariantProps<typeof controlVariants> & {
    /** Opção inicial vazia e não selecionável, ex.: "Selecione". */
    placeholder?: string;
  };

/** <select> nativo estilizado: mantém teclado, leitor de tela e mobile nativos. */
export function Select({ size, placeholder, className, children, ...rest }: SelectProps) {
  const props = useFieldControl(rest);
  const hasValue = props.value !== undefined || props.defaultValue !== undefined;
  return (
    <div className={cn("relative flex items-center", className)}>
      <select
        data-slot="select"
        className={cn(controlVariants({ size }), "cursor-pointer appearance-none pr-11")}
        {...(placeholder && !hasValue ? { defaultValue: "" } : null)}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-4 size-5 text-fg-subtle"
        strokeWidth={2}
      />
    </div>
  );
}
