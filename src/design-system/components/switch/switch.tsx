"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";
import { cn } from "../../lib/cn";

export type SwitchProps = Omit<
  ComponentProps<"button">,
  "onChange" | "value" | "children" | "role" | "type"
> & {
  label: ReactNode;
  description?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Com `name`, envia o valor num formulário quando ligado. */
  name?: string;
  value?: string;
  /** Posição do label em relação ao controle. */
  labelPosition?: "start" | "end";
};

/** Interruptor liga/desliga com role="switch". Espaço e Enter alternam. */
export function Switch({
  label,
  description,
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  name,
  value = "on",
  labelPosition = "end",
  id: idProp,
  className,
  disabled,
  onClick,
  ...props
}: SwitchProps) {
  const autoId = useId();
  const id = idProp ?? `switch-${autoId}`;
  const descriptionId = description ? `${id}-descricao` : undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const checked = checkedProp ?? internal;

  const toggle = () => {
    const next = !checked;
    if (checkedProp === undefined) setInternal(next);
    onCheckedChange?.(next);
  };

  const control = (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      aria-describedby={descriptionId}
      disabled={disabled}
      data-state={checked ? "on" : "off"}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) toggle();
      }}
      className={cn(
        "group relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
        "border-strong border-border-control bg-surface transition-colors duration-(--duration-fast)",
        // amplia a área de toque para 44px de altura sem mudar o visual
        "before:absolute before:-inset-x-1 before:-inset-y-2.5 before:content-['']",
        "hover:border-fg-subtle",
        "aria-checked:border-primary aria-checked:bg-primary aria-checked:hover:bg-primary-hover",
        "disabled:cursor-not-allowed disabled:opacity-50",
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "block size-4 translate-x-[3px] rounded-full bg-fg-subtle",
          "transition-transform duration-(--duration-fast) ease-standard",
          "group-aria-checked:translate-x-[22px] group-aria-checked:bg-primary-fg",
        )}
      />
    </button>
  );

  return (
    <div
      data-slot="switch"
      className={cn(
        "inline-flex min-h-control-md items-center gap-3",
        labelPosition === "start" && "flex-row-reverse justify-end",
        className,
      )}
    >
      {control}
      <span className="flex flex-col gap-0.5">
        <label
          htmlFor={id}
          className={cn(
            "cursor-pointer text-base text-fg",
            disabled && "cursor-not-allowed text-fg-subtle",
          )}
        >
          {label}
        </label>
        {description ? (
          <span id={descriptionId} className="text-sm text-fg-subtle">
            {description}
          </span>
        ) : null}
      </span>
      {name && checked ? <input type="hidden" name={name} value={value} /> : null}
    </div>
  );
}
