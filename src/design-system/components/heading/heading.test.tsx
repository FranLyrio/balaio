import { render, screen } from "@testing-library/react";
import { Heading } from "./heading";

describe("Heading", () => {
  it("renderiza h2 por padrão", () => {
    render(<Heading>Ofertas</Heading>);
    expect(screen.getByRole("heading", { level: 2, name: "Ofertas" })).toHaveClass("text-4xl");
  });

  it("usa o nível informado e o tamanho correspondente", () => {
    render(<Heading as="h1">Balaio</Heading>);
    expect(screen.getByRole("heading", { level: 1 })).toHaveClass("text-5xl", "font-display");
  });

  it("permite desacoplar tamanho visual do nível semântico", () => {
    render(
      <Heading as="h3" size="lg">
        Pequeno
      </Heading>,
    );
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveClass("text-lg");
    expect(heading).not.toHaveClass("text-3xl");
  });

  it("repassa a ref", () => {
    let node: HTMLHeadingElement | null = null;
    render(<Heading ref={(el) => void (node = el)}>Com ref</Heading>);
    expect(node).toBeInstanceOf(HTMLHeadingElement);
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(<Heading as="h1">Título</Heading>);
    await expect(container).toHaveNoAxeViolations();
  });
});
