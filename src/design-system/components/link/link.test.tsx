import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { Link } from "./link";

function FakeRouterLink({ href, ...props }: ComponentProps<"a">) {
  return <a href={href} data-router="sim" {...props} />;
}

describe("Link", () => {
  it("renderiza uma âncora com estilo primário sublinhado", () => {
    render(<Link href="/ajuda">Ajuda</Link>);
    const link = screen.getByRole("link", { name: "Ajuda" });
    expect(link).toHaveAttribute("href", "/ajuda");
    expect(link).toHaveClass("text-primary", "underline");
  });

  it("com asChild usa o componente do roteador e mantém o estilo", () => {
    render(
      <Link asChild tone="muted" underline="hover">
        <FakeRouterLink href="/conta">Minha conta</FakeRouterLink>
      </Link>,
    );
    const link = screen.getByRole("link", { name: "Minha conta" });
    expect(link).toHaveAttribute("data-router", "sim");
    expect(link).toHaveClass("text-fg-muted", "hover:underline");
  });

  it("repassa a ref", () => {
    let node: HTMLAnchorElement | null = null;
    render(
      <Link href="/" ref={(el) => void (node = el)}>
        Início
      </Link>,
    );
    expect(node).toBeInstanceOf(HTMLAnchorElement);
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(<Link href="/">Início</Link>);
    await expect(container).toHaveNoAxeViolations();
  });
});
