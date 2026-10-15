import type { ComponentProps } from "react";

type LinkProps = ComponentProps<"a"> & {
  href: string;
  prefetch?: boolean | null;
  replace?: boolean;
  scroll?: boolean;
};

/**
 * Substituto de `next/link` no Storybook, que não roda o Next.js.
 * Renderiza só o <a> e descarta as props que pertencem ao roteador.
 */
export default function Link({ prefetch, replace, scroll, ...props }: LinkProps) {
  void prefetch;
  void replace;
  void scroll;
  return <a {...props} />;
}
