import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../button/button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

function Exemplo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Calcular frete</Button>
      </PopoverTrigger>
      <PopoverContent aria-label="Frete">
        <p>Informe seu CEP</p>
        <button type="button">OK</button>
      </PopoverContent>
    </Popover>
  );
}

describe("Popover", () => {
  it("abre e fecha pelo gatilho, atualizando aria-expanded", async () => {
    const user = userEvent.setup();
    render(<Exemplo />);
    const trigger = screen.getByRole("button", { name: "Calcular frete" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog", { name: "Frete" })).toBeInTheDocument();
  });

  it("fecha com Esc e devolve o foco", async () => {
    const user = userEvent.setup();
    render(<Exemplo />);
    const trigger = screen.getByRole("button", { name: "Calcular frete" });
    await user.click(trigger);
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it("abre pelo teclado", async () => {
    const user = userEvent.setup();
    render(<Exemplo />);
    await user.tab();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("não tem violações de acessibilidade quando aberto", async () => {
    const user = userEvent.setup();
    render(<Exemplo />);
    await user.click(screen.getByRole("button", { name: "Calcular frete" }));
    await expect(document.body).toHaveNoAxeViolations();
  });
});
