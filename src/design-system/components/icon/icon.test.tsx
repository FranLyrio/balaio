import { render, screen } from "@testing-library/react";
import { Heart } from "lucide-react";
import { Icon } from "./icon";

describe("Icon", () => {
  it("é decorativo por padrão", () => {
    const { container } = render(<Icon icon={Heart} />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("vira imagem com nome quando recebe label", () => {
    render(<Icon icon={Heart} label="Favorito" />);
    expect(screen.getByRole("img", { name: "Favorito" })).toBeInTheDocument();
  });

  it("aplica a classe do tamanho", () => {
    const { container } = render(<Icon icon={Heart} size="lg" />);
    expect(container.querySelector("svg")).toHaveClass("size-6");
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(<Icon icon={Heart} label="Favorito" />);
    await expect(container).toHaveNoAxeViolations();
  });
});
