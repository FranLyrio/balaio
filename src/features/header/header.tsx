import Link from "next/link";
import type { ComponentProps } from "react";
import { Logo } from "./components/logo";
import { SearchForm } from "./components/search-form";

export type HeaderProps = Omit<ComponentProps<"header">, "className" | "style">;

export function Header({ ...props }: HeaderProps) {
  return (
    <header
      className="flex items-center gap-6 bg-surface-inverse px-6 py-3 text-fg-inverse"
      {...props}
    >
      <Link href="/" className="flex items-center gap-2.5" aria-label="Balaio, página inicial">
        <Logo />
        <span className="font-display text-3xl leading-none font-extrabold tracking-display-tight">
          balaio
        </span>
      </Link>

      <SearchForm />

      <nav>
        <div>nav</div>
      </nav>
    </header>
  );
}
