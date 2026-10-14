"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

/** Abas com navegação por setas, Home e End (padrão WAI-ARIA, via Radix). */
export function Tabs({ className, ...props }: ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col", className)} {...props} />
  );
}

export function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "flex [scrollbar-width:none] gap-1 overflow-x-auto border-b border-divider",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-control-md shrink-0 cursor-pointer items-center gap-2 rounded-t-control px-4",
        "font-sans text-base font-semibold whitespace-nowrap text-fg-muted transition-colors duration-(--duration-fast)",
        "hover:text-fg",
        "after:absolute after:inset-x-2 after:-bottom-px after:h-0.5 after:rounded-full after:bg-primary after:opacity-0 after:content-['']",
        "data-[state=active]:text-primary data-[state=active]:after:opacity-100",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "[&_svg]:size-4",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("pt-6 text-fg", className)}
      {...props}
    />
  );
}
