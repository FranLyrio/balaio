import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Heart } from "lucide-react";
import { IconButton } from "../button/button";
import { Tooltip } from "./tooltip";

function Exemplo() {
  return (
    <Tooltip content="Salvar nos favoritos">
      <IconButton aria-label="Favoritar" icon={<Heart aria-hidden="true" />} />
    </Tooltip>
  );
}

describe("Tooltip", () => {
  it("aparece ao focar pelo teclado e descreve o gatilho", async () => {
    const user = userEvent.setup();
    render(<Exemplo />);
    await user.tab();
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toHaveTextContent("Salvar nos favoritos");
    expect(screen.getByRole("button", { name: "Favoritar" })).toHaveAccessibleDescription(
      "Salvar nos favoritos",
    );
  });

  it("fecha com Esc", async () => {
    const user = userEvent.setup();
    render(<Exemplo />);
    await user.tab();
    await screen.findByRole("tooltip");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
  });

  it("não tem violações de acessibilidade quando aberto", async () => {
    render(
      <Tooltip content="Ajuda" defaultOpen>
        <button type="button">?</button>
      </Tooltip>,
    );
    await screen.findByRole("tooltip");
    await expect(document.body).toHaveNoAxeViolations();
  });
});
