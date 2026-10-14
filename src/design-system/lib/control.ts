import { cva } from "class-variance-authority";

/** Estilo compartilhado por Input, Textarea e Select. */
export const controlVariants = cva(
  [
    "w-full min-w-0 rounded-control border border-border-control bg-surface font-sans text-fg",
    "transition-colors duration-(--duration-fast) ease-standard placeholder:text-fg-subtle",
    "hover:border-fg-subtle",
    "aria-invalid:border-danger aria-invalid:hover:border-danger",
    "disabled:cursor-not-allowed disabled:bg-page disabled:text-fg-subtle disabled:hover:border-border-control",
    "read-only:bg-page",
  ],
  {
    variants: {
      size: {
        sm: "h-control-sm px-3 text-md",
        md: "h-control-md px-4 text-base",
        lg: "h-control-lg px-4 text-lg",
      },
    },
    defaultVariants: { size: "md" },
  },
);
