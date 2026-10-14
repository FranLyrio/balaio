"use client";

import { Check, Minus } from "lucide-react";
import { useEffect, useId, useRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useComposedRefs } from "../../lib/compose-refs";

export type CheckboxProps = Omit<ComponentProps<"input">, "type" | "size"> & {
  label: ReactNode;
  /** Texto de apoio abaixo do label, ligado por aria-describedby. */
  description?: ReactNode;
  /** Estado "parcialmente marcado" (ex.: selecionar todos). */
  indeterminate?: boolean;
};

/** Checkbox nativo estilizado. A linha inteira é clicável (alvo ≥ 44px). */
export function Checkbox({
  label,
  description,
  indeterminate = false,
  className,
  id: idProp,
  ref,
  ...props
}: CheckboxProps) {
  const autoId = useId();
  const id = idProp ?? `checkbox-${autoId}`;
  const labelId = `${id}-label`;
  const descriptionId = description ? `${id}-descricao` : undefined;
  const innerRef = useRef<HTMLInputElement>(null);
  const composedRef = useComposedRefs(innerRef, ref);

  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      htmlFor={id}
      data-slot="checkbox"
      className={cn(
        "group inline-flex min-h-control-md cursor-pointer items-start gap-3 py-[11px]",
        "has-disabled:cursor-not-allowed",
        className,
      )}
    >
      <span className="relative mt-px flex size-5 shrink-0">
        <input
          ref={composedRef}
          id={id}
          type="checkbox"
          aria-labelledby={labelId}
          aria-describedby={
            [descriptionId, props["aria-describedby"]].filter(Boolean).join(" ") || undefined
          }
          className={cn(
            "peer size-5 cursor-[inherit] appearance-none rounded-tag border-strong border-border-control bg-surface",
            "transition-colors duration-(--duration-fast)",
            "group-hover:border-fg-subtle",
            "checked:border-primary checked:bg-primary group-hover:checked:border-primary-hover group-hover:checked:bg-primary-hover",
            "indeterminate:border-primary indeterminate:bg-primary",
            "aria-invalid:border-danger",
            "disabled:border-border disabled:bg-page disabled:checked:border-border-control disabled:checked:bg-border-control",
          )}
          {...props}
        />
        <Check
          aria-hidden="true"
          strokeWidth={3}
          className="pointer-events-none absolute inset-0 m-auto size-3.5 text-primary-fg opacity-0 peer-checked:opacity-100 peer-indeterminate:opacity-0"
        />
        <Minus
          aria-hidden="true"
          strokeWidth={3}
          className="pointer-events-none absolute inset-0 m-auto size-3.5 text-primary-fg opacity-0 peer-indeterminate:opacity-100"
        />
      </span>
      <span className="flex flex-col gap-0.5">
        <span id={labelId} className="text-base text-fg group-has-disabled:text-fg-subtle">
          {label}
        </span>
        {description ? (
          <span id={descriptionId} className="text-sm text-fg-subtle">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}
