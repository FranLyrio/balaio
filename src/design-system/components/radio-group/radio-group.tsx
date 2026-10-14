"use client";

import { CircleAlert } from "lucide-react";
import {
  createContext,
  useContext,
  useId,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";

type RadioGroupContextValue = {
  name: string;
  value: string | undefined;
  setValue: (value: string) => void;
  invalid: boolean;
  required?: boolean;
};

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export type RadioGroupProps = Omit<
  ComponentProps<"fieldset">,
  "onChange" | "defaultValue" | "children"
> & {
  /** Título do grupo (vira o <legend>). */
  legend: ReactNode;
  hideLegend?: boolean;
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  orientation?: "vertical" | "horizontal";
  children: ReactNode;
};

/**
 * Grupo de radios nativos. As setas do teclado movem a seleção (comportamento
 * nativo do navegador) e Tab entra/sai do grupo.
 */
export function RadioGroup({
  legend,
  hideLegend,
  name: nameProp,
  value: valueProp,
  defaultValue,
  onValueChange,
  hint,
  error,
  required,
  orientation = "vertical",
  className,
  children,
  ...props
}: RadioGroupProps) {
  const autoId = useId();
  const baseId = `radio-${autoId}`;
  const name = nameProp ?? baseId;
  const [internal, setInternal] = useState(defaultValue);
  const value = valueProp ?? internal;
  const legendId = `${baseId}-legenda`;
  const hintId = hint ? `${baseId}-dica` : undefined;
  const errorId = error ? `${baseId}-erro` : undefined;

  const setValue = (next: string) => {
    if (valueProp === undefined) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <RadioGroupContext.Provider
      value={{ name, value, setValue, invalid: Boolean(error), required }}
    >
      <fieldset
        role="radiogroup"
        aria-labelledby={legendId}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        data-slot="radio-group"
        className={cn("m-0 flex min-w-0 flex-col gap-1 border-0 p-0", className)}
        {...props}
      >
        <legend
          id={legendId}
          className={cn("mb-1 p-0 text-md font-semibold text-fg", hideLegend && "sr-only")}
        >
          {legend}
          {required ? (
            <span aria-hidden="true" className="ml-0.5 text-danger">
              *
            </span>
          ) : null}
        </legend>
        {hint ? (
          <p id={hintId} className="text-sm text-fg-subtle">
            {hint}
          </p>
        ) : null}
        <div
          className={cn(
            "flex",
            orientation === "vertical" ? "flex-col" : "flex-row flex-wrap gap-x-6",
          )}
        >
          {children}
        </div>
        <div aria-live="polite">
          {error ? (
            <p id={errorId} className="flex items-start gap-1.5 text-sm font-medium text-danger">
              <CircleAlert
                aria-hidden="true"
                className="mt-px size-4 shrink-0"
                strokeWidth={2.25}
              />
              <span>{error}</span>
            </p>
          ) : null}
        </div>
      </fieldset>
    </RadioGroupContext.Provider>
  );
}

export type RadioProps = Omit<
  ComponentProps<"input">,
  "type" | "name" | "checked" | "defaultChecked" | "size"
> & {
  value: string;
  label: ReactNode;
  description?: ReactNode;
};

export function Radio({
  value,
  label,
  description,
  className,
  id: idProp,
  onChange,
  ...props
}: RadioProps) {
  const group = useContext(RadioGroupContext);
  if (!group) throw new Error("<Radio> precisa estar dentro de <RadioGroup>.");
  const autoId = useId();
  const id = idProp ?? `radio-opcao-${autoId}`;
  const labelId = `${id}-label`;
  const descriptionId = description ? `${id}-descricao` : undefined;

  return (
    <label
      htmlFor={id}
      data-slot="radio"
      className={cn(
        "group inline-flex min-h-control-md cursor-pointer items-start gap-3 py-[11px]",
        "has-disabled:cursor-not-allowed",
        className,
      )}
    >
      <span className="relative mt-px flex size-5 shrink-0">
        <input
          id={id}
          type="radio"
          aria-labelledby={labelId}
          name={group.name}
          value={value}
          checked={group.value === value}
          required={group.required}
          aria-describedby={descriptionId}
          onChange={(event) => {
            onChange?.(event);
            if (event.target.checked) group.setValue(value);
          }}
          className={cn(
            "peer size-5 cursor-[inherit] appearance-none rounded-full border-strong border-border-control bg-surface",
            "transition-colors duration-(--duration-fast)",
            "group-hover:border-fg-subtle",
            "checked:border-primary checked:bg-primary group-hover:checked:border-primary-hover group-hover:checked:bg-primary-hover",
            group.invalid && "border-danger",
            "disabled:border-border disabled:bg-page disabled:checked:border-border-control disabled:checked:bg-border-control",
          )}
          {...props}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 m-auto size-2 rounded-full bg-primary-fg opacity-0 peer-checked:opacity-100"
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
