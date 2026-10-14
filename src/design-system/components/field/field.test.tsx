import { render, screen } from "@testing-library/react";
import { Input } from "../input/input";
import { Field, useFieldControl } from "./field";

describe("Field", () => {
  it("liga o label ao controle", () => {
    render(
      <Field label="E-mail">
        <Input type="email" />
      </Field>,
    );
    expect(screen.getByLabelText("E-mail")).toHaveAttribute("type", "email");
  });

  it("liga dica e erro por aria-describedby e marca aria-invalid", () => {
    render(
      <Field label="CEP" hint="Só números" error="CEP inválido">
        <Input />
      </Field>,
    );
    const input = screen.getByLabelText("CEP");
    expect(input).toHaveAccessibleDescription("Só números CEP inválido");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toBeInvalid();
  });

  it("sem erro não marca aria-invalid", () => {
    render(
      <Field label="Nome" hint="Como no documento">
        <Input />
      </Field>,
    );
    const input = screen.getByLabelText("Nome");
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).toHaveAccessibleDescription("Como no documento");
  });

  it("repassa required e disabled ao controle", () => {
    render(
      <Field label="Cidade" required disabled>
        <Input />
      </Field>,
    );
    const input = screen.getByRole("textbox", { name: /Cidade/ });
    expect(input).toBeRequired();
    expect(input).toBeDisabled();
  });

  it("usa o id informado", () => {
    render(
      <Field label="Cupom" id="cupom">
        <Input />
      </Field>,
    );
    expect(screen.getByLabelText("Cupom")).toHaveAttribute("id", "cupom");
  });

  it("mantém o aria-describedby do próprio controle", () => {
    render(
      <>
        <p id="extra">Extra</p>
        <Field label="Apelido" hint="Dica">
          <Input aria-describedby="extra" />
        </Field>
      </>,
    );
    expect(screen.getByLabelText("Apelido")).toHaveAccessibleDescription("Dica Extra");
  });

  it("useFieldControl funciona em controles próprios", () => {
    function Custom(props: { id?: string; "aria-describedby"?: string }) {
      const a11y = useFieldControl(props);
      return <input {...a11y} />;
    }
    render(
      <Field label="Busca" hint="Digite algo">
        <Custom />
      </Field>,
    );
    expect(screen.getByLabelText("Busca")).toHaveAccessibleDescription("Digite algo");
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(
      <Field label="E-mail" hint="Usamos só para o pedido" error="Informe um e-mail" required>
        <Input type="email" />
      </Field>,
    );
    await expect(container).toHaveNoAxeViolations();
  });
});
