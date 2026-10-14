import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("marca e desmarca com clique no label", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Aceito os termos" />);
    const checkbox = screen.getByRole("checkbox", { name: "Aceito os termos" });
    await user.click(screen.getByText("Aceito os termos"));
    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("alterna com a barra de espaço", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Receber ofertas" onChange={onChange} />);
    await user.tab();
    expect(screen.getByRole("checkbox")).toHaveFocus();
    await user.keyboard(" ");
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("liga a descrição por aria-describedby", () => {
    render(<Checkbox label="Frete grátis" description="Apenas produtos elegíveis" />);
    const checkbox = screen.getByRole("checkbox", { name: "Frete grátis" });
    expect(checkbox).toHaveAccessibleDescription("Apenas produtos elegíveis");
  });

  it("suporta o estado indeterminado", () => {
    render(<Checkbox label="Selecionar todos" indeterminate />);
    expect(screen.getByRole("checkbox")).toBePartiallyChecked();
  });

  it("não alterna quando desabilitado", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Indisponível" disabled />);
    await user.click(screen.getByText("Indisponível"));
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("tem alvo de toque de 44px", () => {
    const { container } = render(<Checkbox label="Alvo" />);
    expect(container.querySelector("label")).toHaveClass("min-h-control-md");
  });

  it("repassa a ref", () => {
    let node: HTMLInputElement | null = null;
    render(<Checkbox label="Ref" ref={(el) => void (node = el)} />);
    expect(node).toBe(screen.getByRole("checkbox"));
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(
      <div>
        <Checkbox label="Um" description="Descrição" />
        <Checkbox label="Dois" defaultChecked />
        <Checkbox label="Três" disabled />
      </div>,
    );
    await expect(container).toHaveNoAxeViolations();
  });
});
