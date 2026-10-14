"use client";

import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";
import { controlVariants } from "../../lib/control";
import { useFieldControl } from "../field/field";

export type TextareaProps = ComponentProps<"textarea"> & {
  resize?: "none" | "vertical";
};

export function Textarea({ className, rows = 4, resize = "vertical", ...rest }: TextareaProps) {
  const props = useFieldControl(rest);
  return (
    <textarea
      data-slot="textarea"
      rows={rows}
      className={cn(
        controlVariants({ size: "md" }),
        "h-auto min-h-24 py-3",
        resize === "none" ? "resize-none" : "resize-y",
        className,
      )}
      {...props}
    />
  );
}
