import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../button/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

function Exemplo({ side }: { side?: "left" | "right" | "bottom" }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Filtros</Button>
      </SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Filtrar resultados</SheetTitle>
          <SheetDescription>Refine a busca.</SheetDescription>
        </SheetHeader>
        <Button>Aplicar</Button>
      </SheetContent>
    </Sheet>
  );
}

describe("Sheet", () => {
  it("abre como dialog nomeado", async () => {
    const user = userEvent.setup();
    render(<Exemplo />);
    await user.click(screen.getByRole("button", { name: "Filtros" }));
    expect(screen.getByRole("dialog", { name: "Filtrar resultados" })).toHaveClass("right-0");
  });

  it("aceita o lado esquerdo e o inferior", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Exemplo side="left" />);
    await user.click(screen.getByRole("button", { name: "Filtros" }));
    expect(screen.getByRole("dialog")).toHaveClass("left-0");
    unmount();
    render(<Exemplo side="bottom" />);
    await user.click(screen.getByRole("button", { name: "Filtros" }));
    expect(screen.getByRole("dialog")).toHaveClass("bottom-0");
  });

  it("fecha com Esc e devolve o foco", async () => {
    const user = userEvent.setup();
    render(<Exemplo />);
    const trigger = screen.getByRole("button", { name: "Filtros" });
    await user.click(trigger);
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it("não tem violações de acessibilidade quando aberto", async () => {
    const user = userEvent.setup();
    render(<Exemplo />);
    await user.click(screen.getByRole("button", { name: "Filtros" }));
    await expect(document.body).toHaveNoAxeViolations();
  });
});
