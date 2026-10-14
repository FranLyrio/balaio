"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";
import { IconButton } from "../button/button";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;

export function DialogOverlay({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-overlay bg-scrim",
        "data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in",
        className,
      )}
      {...props}
    />
  );
}

const dialogContentVariants = cva(
  [
    "fixed top-1/2 left-1/2 z-modal flex w-[calc(100%-32px)] -translate-x-1/2 -translate-y-1/2 flex-col gap-5",
    "max-h-[calc(100dvh-32px)] overflow-y-auto rounded-panel border border-border bg-surface p-6 text-fg shadow-overlay",
    "data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in",
  ],
  {
    variants: {
      size: {
        sm: "max-w-[400px]",
        md: "max-w-[560px]",
        lg: "max-w-[720px]",
      },
    },
    defaultVariants: { size: "md" },
  },
);

export type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content> &
  VariantProps<typeof dialogContentVariants> & {
    /** Esconde o botão de fechar do canto (o Esc continua funcionando). */
    hideClose?: boolean;
    closeLabel?: string;
  };

export function DialogContent({
  size,
  hideClose,
  closeLabel = "Fechar",
  className,
  children,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(dialogContentVariants({ size }), className)}
        {...props}
      >
        {children}
        {hideClose ? null : (
          <DialogPrimitive.Close asChild>
            <IconButton
              size="md"
              variant="ghost"
              aria-label={closeLabel}
              icon={<X aria-hidden="true" className="size-5" />}
              className="absolute top-3 right-3"
            />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

export function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5 pr-10", className)} {...props} />;
}

export function DialogFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col-reverse gap-3 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}

export function DialogTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("font-display text-2xl font-bold tracking-display text-fg", className)}
      {...props}
    />
  );
}

export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description className={cn("text-base text-fg-muted", className)} {...props} />
  );
}

export { dialogContentVariants };
