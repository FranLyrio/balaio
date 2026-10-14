import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider, useToast, type ToastOptions } from "./toast";

function Disparador(options: ToastOptions) {
  const { toast } = useToast();
  return (
    <button type="button" onClick={() => toast(options)}>
      Disparar
    </button>
  );
}

function renderToast(options: ToastOptions) {
  return render(
    <ToastProvider>
      <Disparador {...options} />
    </ToastProvider>,
  );
}

describe("Toast", () => {
  it("mostra título e descrição ao disparar", async () => {
    const user = userEvent.setup();
    renderToast({ title: "Adicionado à sacola", description: "Cesta de orgânicos" });
    await user.click(screen.getByRole("button", { name: "Disparar" }));
    expect(await screen.findByText("Adicionado à sacola")).toBeInTheDocument();
    expect(screen.getByText("Cesta de orgânicos")).toBeInTheDocument();
  });

  it("fica numa região de notificações rotulada", async () => {
    const user = userEvent.setup();
    renderToast({ title: "Oi" });
    await user.click(screen.getByRole("button", { name: "Disparar" }));
    expect(screen.getByRole("region", { name: /Notificações/ })).toBeInTheDocument();
  });

  it("fecha pelo botão de fechar", async () => {
    const user = userEvent.setup();
    renderToast({ title: "Salvo" });
    await user.click(screen.getByRole("button", { name: "Disparar" }));
    await user.click(await screen.findByRole("button", { name: "Fechar notificação" }));
    await waitFor(() => expect(screen.queryByText("Salvo")).not.toBeInTheDocument());
  });

  it("executa a ação", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderToast({
      title: "Item removido",
      action: { label: "Desfazer", altText: "Desfazer remoção do item", onClick },
    });
    await user.click(screen.getByRole("button", { name: "Disparar" }));
    await user.click(await screen.findByRole("button", { name: "Desfazer" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("useToast fora do provider dá erro claro", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Disparador title="x" />)).toThrow(/ToastProvider/);
    spy.mockRestore();
  });

  it("não tem violações de acessibilidade com um toast aberto", async () => {
    const user = userEvent.setup();
    renderToast({ title: "Pedido enviado", variant: "success" });
    await user.click(screen.getByRole("button", { name: "Disparar" }));
    await screen.findByText("Pedido enviado");
    await expect(document.body).toHaveNoAxeViolations();
  });
});
