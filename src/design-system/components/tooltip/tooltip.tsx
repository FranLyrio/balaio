"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "../../lib/cn";

/** Coloque uma vez perto da raiz para compartilhar o atraso entre tooltips. */
export function TooltipProvider({
  delayDuration = 300,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />;
}

export type TooltipProps = Omit<ComponentProps<typeof TooltipPrimitive.Content>, "content"> & {
  /** Texto curto e complementar. Não coloque informação essencial: não aparece no toque. */
  content: ReactNode;
  /** O gatilho. Precisa ser focável (ex.: Button, IconButton). */
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
};

export function Tooltip({
  content,
  children,
  open,
  defaultOpen,
  onOpenChange,
  delayDuration,
  className,
  side = "top",
  sideOffset = 6,
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration ?? 300}>
      <TooltipPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        delayDuration={delayDuration}
      >
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            data-slot="tooltip-content"
            side={side}
            sideOffset={sideOffset}
            collisionPadding={8}
            className={cn(
              "z-tooltip max-w-64 rounded-tag bg-surface-inverse px-2.5 py-1.5 text-sm font-medium text-fg-inverse",
              "origin-(--radix-tooltip-content-transform-origin)",
              "data-[state=closed]:animate-fade-out data-[state=delayed-open]:animate-fade-in data-[state=instant-open]:animate-fade-in",
              className,
            )}
            {...props}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-surface-inverse" width={10} height={5} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
