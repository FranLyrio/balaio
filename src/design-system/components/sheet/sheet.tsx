"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";
import { IconButton } from "../button/button";
import { DialogOverlay } from "../dialog/dialog";

/** Gaveta lateral. Usa o Dialog do Radix: foco preso, Esc fecha, foco volta ao gatilho. */
export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

const sheetContentVariants = cva(
  "fixed z-modal flex flex-col gap-5 overflow-y-auto border-border bg-surface p-6 text-fg shadow-overlay",
  {
    variants: {
      side: {
        right: [
          "inset-y-0 right-0 h-full w-[calc(100%-48px)] max-w-[420px] rounded-l-panel border-l",
          "data-[state=closed]:animate-slide-out-right data-[state=open]:animate-slide-in-right",
        ],
        left: [
          "inset-y-0 left-0 h-full w-[calc(100%-48px)] max-w-[420px] rounded-r-panel border-r",
          "data-[state=closed]:animate-slide-out-left data-[state=open]:animate-slide-in-left",
        ],
        bottom: [
          "inset-x-0 bottom-0 max-h-[85dvh] rounded-t-panel border-t",
          "data-[state=closed]:animate-slide-out-bottom data-[state=open]:animate-slide-in-bottom",
        ],
      },
    },
    defaultVariants: { side: "right" },
  },
);

export type SheetContentProps = ComponentProps<typeof DialogPrimitive.Content> &
  VariantProps<typeof sheetContentVariants> & {
    hideClose?: boolean;
    closeLabel?: string;
  };

export function SheetContent({
  side,
  hideClose,
  closeLabel = "Fechar",
  className,
  children,
  ...props
}: SheetContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        className={cn(sheetContentVariants({ side }), className)}
        {...props}
      >
        {children}
        {hideClose ? null : (
          <DialogPrimitive.Close asChild>
            <IconButton
              variant="ghost"
              aria-label={closeLabel}
              icon={<X aria-hidden="true" className="size-5" />}
              className="absolute top-3 right-3"
            />
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function SheetHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5 pr-10", className)} {...props} />;
}

export function SheetFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mt-auto flex flex-col gap-3", className)} {...props} />;
}

export function SheetTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("font-display text-2xl font-bold tracking-display text-fg", className)}
      {...props}
    />
  );
}

export function SheetDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description className={cn("text-base text-fg-muted", className)} {...props} />
  );
}

export { sheetContentVariants };
