"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverClose = PopoverPrimitive.Close;

export type PopoverContentProps = ComponentProps<typeof PopoverPrimitive.Content>;

export function PopoverContent({
  className,
  sideOffset = 8,
  collisionPadding = 16,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(
          "z-popover w-72 max-w-[calc(100vw-32px)] rounded-card border border-border bg-surface p-4 text-fg shadow-overlay",
          "origin-(--radix-popover-content-transform-origin)",
          "data-[state=closed]:animate-scale-out data-[state=open]:animate-scale-in",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}
