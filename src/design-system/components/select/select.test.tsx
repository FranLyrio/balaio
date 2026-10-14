import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Field } from "../field/field";
import { Select } from "./select";

function Estados(props: Parameters<typeof Select>[0]) {
  return (
    <Select {...props}>
      <option value="BA">Bahia</option>
      <option value="SP">São Paulo</option>
    </Select>
  );
}

describe("Select", () => {
  it("é um combobox nativo e troca de valor", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Estados aria-label="Estado" onChange={onChange} />);
    const select = screen.getByRole("combobox", { name: "Estado" });
    await user.selectOptions(select, "SP");
    expect(select).toHaveValue("SP");
    expect(onChange).toHaveBeenCalled();
  });

  it("mostra o placeholder como opção inicial desabilitada", () => {
    render(<Estados aria-label="Estado" placeholder="Selecione" />);
    expect(screen.getByRole("combobox")).toHaveValue("");
    expect(screen.getByRole("option", { name: "Selecione" })).toBeDisabled();
  });

  it("funciona dentro de Field", () => {
    render(
      <Field label="Estado" error="Escolha um estado" required>
        <Estados placeholder="Selecione" />
      </Field>,
    );
    const select = screen.getByLabelText(/Estado/);
    expect(select).toBeRequired();
    expect(select).toHaveAccessibleDescription("Escolha um estado");
  });

  it("repassa a ref", () => {
    let node: HTMLSelectElement | null = null;
    render(<Estados aria-label="Estado" ref={(el) => void (node = el)} />);
    expect(node).toBeInstanceOf(HTMLSelectElement);
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(
      <Field label="Estado">
        <Estados placeholder="Selecione" />
      </Field>,
    );
    await expect(container).toHaveNoAxeViolations();
  });
});
