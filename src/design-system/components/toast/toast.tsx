"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { CircleAlert, CircleCheck, Info, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import { Button, IconButton } from "../button/button";

const toastVariants = cva(
  [
    "grid w-full grid-cols-[auto_1fr_auto] items-start gap-3 rounded-card border border-border bg-surface p-4 pr-2 text-fg shadow-overlay",
    "data-[state=closed]:animate-fade-out data-[state=open]:animate-toast-in",
    "data-[swipe=move]:translate-x-(--radix-toast-swipe-move-x)",
    "data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[translate]",
    "data-[swipe=end]:animate-slide-out-right",
  ],
  {
    variants: {
      variant: {
        neutral: "[&_[data-toast-icon]]:text-primary",
        success: "[&_[data-toast-icon]]:text-success",
        danger: "[&_[data-toast-icon]]:text-danger",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

const icons = { neutral: Info, success: CircleCheck, danger: CircleAlert } as const;

type ToastVariant = NonNullable<VariantProps<typeof toastVariants>["variant"]>;

export type ToastAction = {
  label: string;
  /** Descrição alternativa para leitores de tela (exigida pelo Radix). */
  altText: string;
  onClick: () => void;
};

export type ToastOptions = {
  title: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  /** Em milissegundos. */
  duration?: number;
  action?: ToastAction;
};

export type ToastProps = Omit<ComponentProps<typeof ToastPrimitive.Root>, "title"> &
  ToastOptions & {
    closeLabel?: string;
  };

/** Um toast. Normalmente você usa `useToast()`; use este para casos declarativos. */
export function Toast({
  title,
  description,
  variant = "neutral",
  action,
  closeLabel = "Fechar notificação",
  className,
  ...props
}: ToastProps) {
  const Glyph = icons[variant];
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      // erros interrompem o leitor de tela; o resto é anunciado com educação
      type={variant === "danger" ? "foreground" : "background"}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      <Glyph data-toast-icon="" aria-hidden="true" className="mt-0.5 size-5" strokeWidth={2.25} />
      <div className="flex flex-col gap-1">
        <ToastPrimitive.Title className="text-base font-semibold text-fg">
          {title}
        </ToastPrimitive.Title>
        {description ? (
          <ToastPrimitive.Description className="text-md text-fg-muted">
            {description}
          </ToastPrimitive.Description>
        ) : null}
        {action ? (
          <ToastPrimitive.Action altText={action.altText} asChild>
            <Button size="sm" variant="outline" className="mt-2 w-fit" onClick={action.onClick}>
              {action.label}
            </Button>
          </ToastPrimitive.Action>
        ) : null}
      </div>
      <ToastPrimitive.Close asChild>
        <IconButton
          size="sm"
          variant="ghost"
          aria-label={closeLabel}
          icon={<X aria-hidden="true" className="size-4" />}
          className="-mt-1.5"
        />
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
}

type ToastItem = ToastOptions & { id: string; open: boolean };

type ToastContextValue = {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export type ToastProviderProps = {
  children: ReactNode;
  /** Duração padrão em ms. */
  duration?: number;
  /** Rótulo da região de notificações. `{hotkey}` vira o atalho (F8). */
  label?: string;
  /** Prefixo que o leitor de tela anuncia antes de cada toast. */
  toastLabel?: string;
  swipeDirection?: "right" | "left" | "up" | "down";
};

/** Coloque uma vez na raiz do app. Renderiza a região de notificações. */
export function ToastProvider({
  children,
  duration = 5000,
  label = "Notificações ({hotkey})",
  toastLabel = "Notificação",
  swipeDirection = "right",
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: string) => {
    setToasts((all) => all.map((t) => (t.id === id ? { ...t, open: false } : t)));
    // remove da lista depois da animação de saída
    setTimeout(() => setToasts((all) => all.filter((t) => t.id !== id)), 400);
  }, []);

  const toast = useCallback((options: ToastOptions) => {
    counter.current += 1;
    const id = `toast-${counter.current}`;
    setToasts((all) => [...all, { ...options, id, open: true }]);
    return id;
  }, []);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      <ToastPrimitive.Provider
        duration={duration}
        label={toastLabel}
        swipeDirection={swipeDirection}
      >
        {children}
        {toasts.map(({ id, open, ...options }) => (
          <Toast
            key={id}
            open={open}
            onOpenChange={(next) => {
              if (!next) dismiss(id);
            }}
            {...options}
          />
        ))}
        <ToastPrimitive.Viewport
          label={label}
          className={cn(
            "fixed right-0 bottom-0 z-toast m-0 flex max-h-dvh w-full list-none flex-col gap-3 p-4 outline-none",
            "sm:max-w-[420px]",
          )}
        />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

/** Dispara toasts de qualquer lugar abaixo do <ToastProvider>. */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast precisa estar dentro de <ToastProvider>.");
  return context;
}

export { toastVariants };
