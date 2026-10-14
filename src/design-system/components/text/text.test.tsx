import { render, screen } from "@testing-library/react";
import { Text } from "./text";

describe("Text", () => {
  it("renderiza um parágrafo com o tamanho de corpo", () => {
    render(<Text>Corpo</Text>);
    const el = screen.getByText("Corpo");
    expect(el.tagName).toBe("P");
    expect(el).toHaveClass("text-base", "text-fg");
  });

  it("aceita outro elemento e variantes", () => {
    render(
      <Text as="span" size="sm" tone="success" weight="bold" numeric>
        R$ 12,90
      </Text>,
    );
    const el = screen.getByText("R$ 12,90");
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveClass("text-sm", "text-success", "font-bold", "tabular-nums");
  });

  it("deixa o className do consumidor vencer conflitos", () => {
    render(<Text className="text-lg">Maior</Text>);
    const el = screen.getByText("Maior");
    expect(el).toHaveClass("text-lg");
    expect(el).not.toHaveClass("text-base");
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(<Text>Texto</Text>);
    await expect(container).toHaveNoAxeViolations();
  });
});
