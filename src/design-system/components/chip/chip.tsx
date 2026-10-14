"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Check, X } from "lucide-react";
import { useState, type ComponentProps, type ReactNode } from "react";
import { cn } from "../../lib/cn";

const chipVariants = cva(
  [
    "inline-flex shrink-0 items-center gap-1.5 rounded-full border-strong font-sans font-semibold whitespace-nowrap",
    "transition-colors duration-(--duration-fast) [&_svg]:size-4",
  ],
  {
    variants: {
      size: {
        sm: "h-control-sm text-md",
        md: "h-control-md text-base",
      },
      selected: {
        true: "border-primary bg-primary-subtle text-primary",
        false: "border-border-strong bg-surface text-fg",
      },
    },
    defaultVariants: { size: "md", selected: false },
  },
);

const paddingBySize = { sm: "px-3", md: "px-4" } as const;

type ChipBaseProps = VariantProps<typeof chipVariants> & {
  children: ReactNode;
  /** Ícone decorativo antes do texto. */
  icon?: ReactNode;
};

export type ChipProps = ChipBaseProps &
  Omit<ComponentProps<"button">, "children" | "onChange"> & {
    selected?: boolean;
    defaultSelected?: boolean;
    onSelectedChange?: (selected: boolean) => void;
  };

/** Chip selecionável (filtro). É um botão com aria-pressed. */
export function Chip({
  size,
  selected: selectedProp,
  defaultSelected = false,
  onSelectedChange,
  icon,
  className,
  children,
  onClick,
  disabled,
  ...props
}: ChipProps) {
  const [internal, setInternal] = useState(defaultSelected);
  const selected = selectedProp ?? internal;
  const resolvedSize = size ?? "md";

  return (
    <button
      type="button"
      data-slot="chip"
      aria-pressed={selected}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (selectedProp === undefined) setInternal(!selected);
        onSelectedChange?.(!selected);
      }}
      className={cn(
        chipVariants({ size, selected }),
        paddingBySize[resolvedSize],
        "cursor-pointer",
        selected ? "hover:bg-accent-subtle" : "hover:border-fg-subtle hover:bg-page",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {selected ? <Check aria-hidden="true" strokeWidth={2.5} /> : icon}
      {children}
    </button>
  );
}

export type RemovableChipProps = ChipBaseProps &
  Omit<ComponentProps<"span">, "children"> & {
    onRemove: () => void;
    /** Nome acessível do botão de remover. Padrão: "Remover {texto}". */
    removeLabel?: string;
    disabled?: boolean;
  };

/** Chip com botão de remover (ex.: filtro aplicado, tag digitada). */
export function RemovableChip({
  size,
  selected,
  icon,
  onRemove,
  removeLabel,
  disabled,
  className,
  children,
  ...props
}: RemovableChipProps) {
  const resolvedSize = size ?? "md";
  const label = removeLabel ?? `Remover ${typeof children === "string" ? children : "item"}`;
  return (
    <span
      data-slot="chip"
      className={cn(
        chipVariants({ size, selected }),
        resolvedSize === "md" ? "pl-4" : "pl-3",
        "pr-0",
        // sem opacidade: um <span> não é isento da regra de contraste
        disabled && "border-border bg-page text-fg-subtle",
        className,
      )}
      aria-disabled={disabled || undefined}
      {...props}
    >
      {icon}
      {children}
      <button
        type="button"
        aria-label={label}
        disabled={disabled}
        onClick={onRemove}
        className={cn(
          "-ml-0.5 flex h-full cursor-pointer items-center justify-center rounded-full text-fg-muted",
          resolvedSize === "md" ? "w-10" : "w-8",
          "hover:text-fg disabled:cursor-not-allowed",
        )}
      >
        <X aria-hidden="true" strokeWidth={2.25} />
      </button>
    </span>
  );
}

export { chipVariants };
