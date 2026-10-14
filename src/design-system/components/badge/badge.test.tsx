import { render, screen } from "@testing-library/react";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renderiza o texto com a variante neutra por padrão", () => {
    render(<Badge>Novo</Badge>);
    expect(screen.getByText("Novo")).toHaveClass("bg-surface-subtle", "text-fg", "h-6");
  });

  it("aplica variantes", () => {
    render(
      <>
        <Badge variant="accent">Destaque</Badge>
        <Badge variant="success" size="sm">
          -20%
        </Badge>
      </>,
    );
    expect(screen.getByText("Destaque")).toHaveClass("bg-accent", "text-accent-fg");
    expect(screen.getByText("-20%")).toHaveClass("text-success", "h-5");
  });

  it("repassa a ref", () => {
    let node: HTMLSpanElement | null = null;
    render(<Badge ref={(el) => void (node = el)}>Ref</Badge>);
    expect(node).toBeInstanceOf(HTMLSpanElement);
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(<Badge variant="danger">Esgotado</Badge>);
    await expect(container).toHaveNoAxeViolations();
  });
});
