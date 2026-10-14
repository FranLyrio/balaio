import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * O tailwind-merge precisa conhecer as escalas próprias do tema para não
 * descartar classes válidas (ex.: `text-md` é tamanho, `text-fg` é cor).
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["xs", "sm", "md", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"],
      radius: ["tag", "control", "card", "panel"],
      shadow: ["overlay"],
      tracking: ["display", "display-tight", "display-tighter"],
    },
    classGroups: {
      "font-family": ["font-sans", "font-display"],
      "border-w": ["border-strong"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
