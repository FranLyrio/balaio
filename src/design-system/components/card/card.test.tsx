import { render, screen } from "@testing-library/react";
import { Card } from "./card";

describe("Card", () => {
  it("renderiza uma superfície com borda e sem sombra", () => {
    render(<Card data-testid="card">Conteúdo</Card>);
    const card = screen.getByTestId("card");
    expect(card).toHaveClass("rounded-card", "border", "bg-surface", "p-6");
    expect(card.className).not.toMatch(/shadow/);
  });

  it("aplica tom e padding", () => {
    render(
      <Card data-testid="card" tone="inverse" padding="sm">
        x
      </Card>,
    );
    expect(screen.getByTestId("card")).toHaveClass("bg-surface-inverse", "p-4");
  });

  it("aceita asChild para usar outra tag", () => {
    render(
      <Card asChild>
        <article aria-label="Produto">x</article>
      </Card>,
    );
    expect(screen.getByRole("article", { name: "Produto" })).toHaveClass("rounded-card");
  });

  it("repassa a ref", () => {
    let node: HTMLDivElement | null = null;
    render(<Card ref={(el) => void (node = el)}>x</Card>);
    expect(node).toBeInstanceOf(HTMLDivElement);
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(
      <Card asChild>
        <section aria-label="Resumo">Conteúdo</section>
      </Card>,
    );
    await expect(container).toHaveNoAxeViolations();
  });
});
