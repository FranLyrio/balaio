"use client";

import { CircleAlert } from "lucide-react";
import { createContext, useContext, useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "../../lib/cn";

type FieldContextValue = {
  id: string;
  hintId?: string;
  errorId?: string;
  invalid: boolean;
  required?: boolean;
  disabled?: boolean;
};

const FieldContext = createContext<FieldContextValue | null>(null);

export type FieldProps = Omit<ComponentProps<"div">, "children"> & {
  /** Texto do <label>. */
  label: ReactNode;
  /** Dica exibida abaixo do controle. */
  hint?: ReactNode;
  /** Mensagem de erro. Quando presente, o controle fica com aria-invalid. */
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  /** Esconde o label visualmente (continua acessível). */
  hideLabel?: boolean;
  /** Id do controle. Se omitido, é gerado automaticamente. */
  id?: string;
  children: ReactNode;
};

/**
 * Liga label, dica e erro ao controle filho (Input, Textarea, Select ou
 * qualquer controle que use `useFieldControl`) por ids e atributos aria.
 */
export function Field({
  label,
  hint,
  error,
  required,
  disabled,
  hideLabel,
  id: idProp,
  className,
  children,
  ...props
}: FieldProps) {
  const autoId = useId();
  const id = idProp ?? `campo-${autoId}`;
  const hintId = hint ? `${id}-dica` : undefined;
  const errorId = error ? `${id}-erro` : undefined;
  const invalid = Boolean(error);

  return (
    <FieldContext.Provider value={{ id, hintId, errorId, invalid, required, disabled }}>
      <div data-slot="field" className={cn("flex flex-col gap-1.5", className)} {...props}>
        <label
          htmlFor={id}
          className={cn(
            "text-md font-semibold text-fg",
            disabled && "text-fg-subtle",
            hideLabel && "sr-only",
          )}
        >
          {label}
          {required ? (
            <span aria-hidden="true" className="ml-0.5 text-danger">
              *
            </span>
          ) : null}
        </label>
        {children}
        {hint ? (
          <p id={hintId} className="text-sm text-fg-subtle">
            {hint}
          </p>
        ) : null}
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
      </div>
    </FieldContext.Provider>
  );
}

type ControlProps = {
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: ComponentProps<"input">["aria-invalid"];
  required?: boolean;
  disabled?: boolean;
};

/**
 * Lê o contexto do Field e devolve as props de acessibilidade do controle.
 * Use em controles próprios que precisem funcionar dentro de um Field.
 */
export function useFieldControl<P extends ControlProps>(props: P): P {
  const field = useContext(FieldContext);
  if (!field) return props;
  const describedBy =
    [field.hintId, field.errorId, props["aria-describedby"]].filter(Boolean).join(" ") || undefined;
  return {
    ...props,
    id: props.id ?? field.id,
    "aria-describedby": describedBy,
    "aria-invalid": props["aria-invalid"] ?? (field.invalid || undefined),
    required: props.required ?? field.required,
    disabled: props.disabled ?? field.disabled,
  };
}
