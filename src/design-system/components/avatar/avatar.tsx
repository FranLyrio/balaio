import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "../../lib/cn";

const avatarVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full font-sans font-bold uppercase select-none",
  {
    variants: {
      size: {
        sm: "size-8 text-xs",
        md: "size-10 text-md",
        lg: "size-14 text-lg",
        xl: "size-20 text-2xl",
      },
      tone: {
        primary: "bg-primary text-primary-fg",
        accent: "bg-accent text-accent-fg",
        subtle: "bg-surface-subtle text-primary",
      },
    },
    defaultVariants: { size: "md" },
  },
);

const tones = ["primary", "accent", "subtle"] as const;

/** "Ana Maria Souza" → "AS"; "balaio" → "BA". */
export function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2);
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`;
}

function toneFor(name: string) {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return tones[Math.abs(hash) % tones.length]!;
}

export type AvatarProps = Omit<ComponentProps<"span">, "children"> &
  VariantProps<typeof avatarVariants> & {
    /** Nome da pessoa ou loja. Vira o nome acessível e as iniciais. */
    name: string;
    /** Use quando o nome já aparece ao lado (evita leitura duplicada). */
    decorative?: boolean;
  };

/** Avatar com iniciais. A cor é derivada do nome, então é estável. */
export function Avatar({ name, size, tone, decorative, className, ...props }: AvatarProps) {
  const a11y = decorative
    ? { "aria-hidden": true as const }
    : { role: "img" as const, "aria-label": name };
  return (
    <span
      data-slot="avatar"
      className={cn(avatarVariants({ size, tone: tone ?? toneFor(name) }), className)}
      {...a11y}
      {...props}
    >
      {getInitials(name)}
    </span>
  );
}

export { avatarVariants };
