import { render, screen } from "@testing-library/react";
import { VisuallyHidden } from "./visually-hidden";

describe("VisuallyHidden", () => {
  it("mantém o texto acessível e aplica sr-only", () => {
    render(
      <button type="button">
        <span aria-hidden="true">×</span>
        <VisuallyHidden>Fechar</VisuallyHidden>
      </button>,
    );
    const button = screen.getByRole("button", { name: "Fechar" });
    expect(button.querySelector(".sr-only")).toHaveTextContent("Fechar");
  });

  it("aceita asChild", () => {
    render(
      <VisuallyHidden asChild>
        <h2>Título oculto</h2>
      </VisuallyHidden>,
    );
    expect(screen.getByRole("heading", { name: "Título oculto" })).toHaveClass("sr-only");
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(<VisuallyHidden>Texto</VisuallyHidden>);
    await expect(container).toHaveNoAxeViolations();
  });
});
