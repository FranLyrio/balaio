import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "./switch";

describe("Switch", () => {
  it("tem role switch, nome do label e começa desligado", () => {
    render(<Switch label="Notificações" />);
    const sw = screen.getByRole("switch", { name: "Notificações" });
    expect(sw).not.toBeChecked();
    expect(sw).toHaveAttribute("aria-checked", "false");
  });

  it("alterna com clique, clique no label, espaço e Enter", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch label="Modo férias" onCheckedChange={onCheckedChange} />);
    const sw = screen.getByRole("switch");
    await user.click(sw);
    expect(sw).toBeChecked();
    await user.click(screen.getByText("Modo férias"));
    expect(sw).not.toBeChecked();
    sw.focus();
    await user.keyboard(" ");
    expect(sw).toBeChecked();
    await user.keyboard("{Enter}");
    expect(sw).not.toBeChecked();
    expect(onCheckedChange).toHaveBeenNthCalledWith(1, true);
    expect(onCheckedChange).toHaveBeenCalledTimes(4);
  });

  it("respeita o modo controlado", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch label="Controlado" checked onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("switch"));
    expect(screen.getByRole("switch")).toBeChecked();
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it("envia o valor no formulário quando ligado", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <form>
        <Switch label="Newsletter" name="newsletter" />
      </form>,
    );
    const form = container.querySelector("form")!;
    expect(new FormData(form).get("newsletter")).toBeNull();
    await user.click(screen.getByRole("switch"));
    expect(new FormData(form).get("newsletter")).toBe("on");
  });

  it("não alterna quando desabilitado", async () => {
    const user = userEvent.setup();
    render(<Switch label="Bloqueado" disabled />);
    await user.click(screen.getByRole("switch"));
    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  it("liga a descrição", () => {
    render(<Switch label="Ofertas" description="Uma vez por semana" />);
    expect(screen.getByRole("switch")).toHaveAccessibleDescription("Uma vez por semana");
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(
      <div>
        <Switch label="Ligado" defaultChecked description="Descrição" />
        <Switch label="Desligado" />
      </div>,
    );
    await expect(container).toHaveNoAxeViolations();
  });
});
