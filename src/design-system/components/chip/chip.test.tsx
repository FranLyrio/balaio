import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chip, RemovableChip } from "./chip";

describe("Chip", () => {
  it("é um botão com aria-pressed que alterna", async () => {
    const user = userEvent.setup();
    const onSelectedChange = vi.fn();
    render(<Chip onSelectedChange={onSelectedChange}>Orgânicos</Chip>);
    const chip = screen.getByRole("button", { name: "Orgânicos" });
    expect(chip).toHaveAttribute("aria-pressed", "false");
    await user.click(chip);
    expect(chip).toHaveAttribute("aria-pressed", "true");
    expect(onSelectedChange).toHaveBeenCalledWith(true);
  });

  it("alterna pelo teclado", async () => {
    const user = userEvent.setup();
    render(<Chip>Até R$ 50</Chip>);
    await user.tab();
    await user.keyboard(" ");
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
    await user.keyboard("{Enter}");
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("respeita o modo controlado", async () => {
    const user = userEvent.setup();
    render(<Chip selected>Controlado</Chip>);
    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("tem 44px de altura no tamanho md", () => {
    render(<Chip>Alvo</Chip>);
    expect(screen.getByRole("button")).toHaveClass("h-control-md");
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(
      <div>
        <Chip>Um</Chip>
        <Chip defaultSelected>Dois</Chip>
      </div>,
    );
    await expect(container).toHaveNoAxeViolations();
  });
});

describe("RemovableChip", () => {
  it("tem um botão de remover com nome acessível", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<RemovableChip onRemove={onRemove}>Bahia</RemovableChip>);
    await user.click(screen.getByRole("button", { name: "Remover Bahia" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("aceita um nome próprio para o botão", () => {
    render(
      <RemovableChip onRemove={() => {}} removeLabel="Tirar filtro de estado">
        Bahia
      </RemovableChip>,
    );
    expect(screen.getByRole("button", { name: "Tirar filtro de estado" })).toBeInTheDocument();
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(<RemovableChip onRemove={() => {}}>Bahia</RemovableChip>);
    await expect(container).toHaveNoAxeViolations();
  });
});
