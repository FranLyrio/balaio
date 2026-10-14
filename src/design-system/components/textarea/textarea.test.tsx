import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Field } from "../field/field";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("aceita texto com várias linhas", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Mensagem" />);
    const textarea = screen.getByRole("textbox", { name: "Mensagem" });
    await user.type(textarea, "Olá{enter}tudo bem?");
    expect(textarea).toHaveValue("Olá\ntudo bem?");
  });

  it("funciona dentro de Field", () => {
    render(
      <Field label="Observações" error="Muito longo">
        <Textarea />
      </Field>,
    );
    const textarea = screen.getByLabelText("Observações");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAccessibleDescription("Muito longo");
  });

  it("repassa a ref", () => {
    let node: HTMLTextAreaElement | null = null;
    render(<Textarea aria-label="x" ref={(el) => void (node = el)} />);
    expect(node).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(
      <Field label="Observações">
        <Textarea />
      </Field>,
    );
    await expect(container).toHaveNoAxeViolations();
  });
});
