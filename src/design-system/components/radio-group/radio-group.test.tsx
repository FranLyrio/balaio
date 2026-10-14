import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Radio, RadioGroup } from "./radio-group";

function Entrega(props: Partial<Parameters<typeof RadioGroup>[0]>) {
  return (
    <RadioGroup legend="Entrega" {...props}>
      <Radio value="normal" label="Normal" description="Até 7 dias úteis" />
      <Radio value="expressa" label="Expressa" />
      <Radio value="retirada" label="Retirar na loja" />
    </RadioGroup>
  );
}

describe("RadioGroup", () => {
  it("expõe um radiogroup nomeado pelo legend", () => {
    render(<Entrega />);
    expect(screen.getByRole("radiogroup", { name: "Entrega" })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("seleciona com clique e avisa onValueChange", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Entrega onValueChange={onValueChange} />);
    await user.click(screen.getByText("Expressa"));
    expect(screen.getByRole("radio", { name: "Expressa" })).toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith("expressa");
  });

  it("começa com defaultValue e respeita value controlado", () => {
    const { rerender } = render(<Entrega defaultValue="retirada" />);
    expect(screen.getByRole("radio", { name: "Retirar na loja" })).toBeChecked();
    rerender(<Entrega value="normal" />);
    expect(screen.getByRole("radio", { name: "Normal" })).toBeChecked();
  });

  it("navega com Tab e setas", async () => {
    const user = userEvent.setup();
    render(<Entrega defaultValue="normal" />);
    await user.tab();
    expect(screen.getByRole("radio", { name: "Normal" })).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "Expressa" })).toBeChecked();
  });

  it("liga dica e erro ao grupo", () => {
    render(<Entrega hint="Escolha uma opção" error="Campo obrigatório" required />);
    const group = screen.getByRole("radiogroup");
    expect(group).toHaveAccessibleDescription("Escolha uma opção Campo obrigatório");
    expect(group).toHaveAttribute("aria-invalid", "true");
    expect(group).toHaveAttribute("aria-required", "true");
  });

  it("liga a descrição de cada opção", () => {
    render(<Entrega />);
    expect(screen.getByRole("radio", { name: "Normal" })).toHaveAccessibleDescription(
      "Até 7 dias úteis",
    );
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(<Entrega hint="Dica" error="Erro" defaultValue="normal" />);
    await expect(container).toHaveNoAxeViolations();
  });
});
