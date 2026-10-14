import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Search } from "lucide-react";
import { Input } from "./input";

describe("Input", () => {
  it("aceita digitação e chama onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input aria-label="Nome" onChange={onChange} />);
    const input = screen.getByRole("textbox", { name: "Nome" });
    await user.type(input, "Ana");
    expect(input).toHaveValue("Ana");
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it("tem altura md (44px) por padrão e aceita outros tamanhos", () => {
    render(
      <>
        <Input aria-label="md" />
        <Input aria-label="lg" size="lg" />
      </>,
    );
    expect(screen.getByLabelText("md")).toHaveClass("h-control-md");
    expect(screen.getByLabelText("lg")).toHaveClass("h-control-lg");
  });

  it("renderiza ícone decorativo e mantém a ref no input", () => {
    let node: HTMLInputElement | null = null;
    const { container } = render(
      <Input aria-label="Buscar" startIcon={<Search />} ref={(el) => void (node = el)} />,
    );
    expect(node).toBe(screen.getByRole("textbox"));
    expect(container.querySelector("[aria-hidden='true'] svg")).toBeInTheDocument();
  });

  it("não aceita digitação quando desabilitado", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Bloqueado" disabled />);
    const input = screen.getByLabelText("Bloqueado");
    await user.type(input, "x");
    expect(input).toHaveValue("");
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(<Input aria-label="Buscar" startIcon={<Search />} />);
    await expect(container).toHaveNoAxeViolations();
  });
});
