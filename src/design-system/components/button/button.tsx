"use client";

import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Spinner } from "../spinner/spinner";

const buttonVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap",
    "rounded-control border-strong border-transparent font-sans font-semibold",
    "transition-colors duration-(--duration-fast) ease-standard select-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-active disabled:hover:bg-primary",
        accent:
          "bg-accent text-accent-fg hover:bg-accent-hover active:bg-accent-active disabled:hover:bg-accent",
        outline:
          "border-primary bg-surface text-primary hover:bg-primary-subtle active:bg-primary-subtle disabled:hover:bg-surface",
        ghost:
          "bg-transparent text-primary hover:bg-primary-subtle active:bg-primary-subtle disabled:hover:bg-transparent",
      },
      size: {
        sm: "h-control-sm px-3 text-md",
        md: "h-control-md px-5 text-base",
        lg: "h-control-lg px-6 text-lg",
      },
      fullWidth: { true: "w-full" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

const iconOnlySize = {
  sm: "w-control-sm px-0",
  md: "w-control-md px-0",
  lg: "w-control-lg px-0",
} as const;

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type SharedProps = Omit<ComponentProps<"button">, "children"> &
  ButtonVariantProps & {
    /** Mostra um spinner, bloqueia cliques e anuncia o carregamento. */
    loading?: boolean;
    /** Texto lido por leitores de tela durante o loading. */
    loadingLabel?: string;
    /** Aplica o estilo ao filho (ex.: um link do framework). */
    asChild?: boolean;
  };

export type ButtonProps = SharedProps & {
  children: ReactNode;
  /** Ícone antes do texto. */
  leftIcon?: ReactNode;
  /** Ícone depois do texto. */
  rightIcon?: ReactNode;
};

function useLoadingGuard(
  loading: boolean | undefined,
  disabled: boolean | undefined,
  onClick: ButtonProps["onClick"],
) {
  const blocked = Boolean(loading);
  return {
    // Em loading o botão continua focável (aria-disabled), mas não age.
    "aria-disabled": blocked || undefined,
    "aria-busy": blocked || undefined,
    disabled: disabled,
    onClick: (event: MouseEvent<HTMLButtonElement>) => {
      if (blocked) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    },
  };
}

export function Button({
  variant,
  size,
  fullWidth,
  loading,
  loadingLabel = "Carregando",
  leftIcon,
  rightIcon,
  asChild,
  className,
  children,
  disabled,
  onClick,
  type,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const guard = useLoadingGuard(loading, disabled, onClick);
  return (
    <Comp
      data-slot="button"
      type={asChild ? undefined : (type ?? "button")}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...guard}
      {...props}
    >
      {loading ? <Spinner decorative size={size === "lg" ? "lg" : "md"} /> : leftIcon}
      <Slottable>{children}</Slottable>
      {loading ? <span className="sr-only"> {loadingLabel}</span> : rightIcon}
    </Comp>
  );
}

export type IconButtonProps = SharedProps & {
  /** O ícone exibido. Use <Icon /> ou um ícone do lucide-react. */
  icon: ReactNode;
  /** Obrigatório: é o único nome acessível do botão. */
  "aria-label": string;
};

/** Botão só com ícone. Exige `aria-label` no tipo. */
export function IconButton({
  variant = "ghost",
  size = "md",
  loading,
  loadingLabel = "Carregando",
  icon,
  asChild,
  className,
  disabled,
  onClick,
  type,
  ...props
}: IconButtonProps) {
  const Comp = asChild ? Slot : "button";
  const guard = useLoadingGuard(loading, disabled, onClick);
  const resolvedSize = size ?? "md";
  return (
    <Comp
      data-slot="icon-button"
      type={asChild ? undefined : (type ?? "button")}
      className={cn(buttonVariants({ variant, size }), iconOnlySize[resolvedSize], className)}
      {...guard}
      {...props}
    >
      {loading ? (
        <>
          <Spinner decorative size={resolvedSize === "lg" ? "lg" : "md"} />
          <span className="sr-only">{loadingLabel}</span>
        </>
      ) : (
        icon
      )}
    </Comp>
  );
}

export { buttonVariants };
