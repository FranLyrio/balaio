import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

function Exemplo() {
  return (
    <Tabs defaultValue="descricao">
      <TabsList aria-label="Detalhes do produto">
        <TabsTrigger value="descricao">Descrição</TabsTrigger>
        <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
        <TabsTrigger value="duvidas" disabled>
          Dúvidas
        </TabsTrigger>
        <TabsTrigger value="loja">Loja</TabsTrigger>
      </TabsList>
      <TabsContent value="descricao">Texto da descrição</TabsContent>
      <TabsContent value="avaliacoes">Lista de avaliações</TabsContent>
      <TabsContent value="duvidas">Perguntas</TabsContent>
      <TabsContent value="loja">Sobre a loja</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("expõe tablist, tabs e tabpanel ligados", () => {
    render(<Exemplo />);
    expect(screen.getByRole("tablist", { name: "Detalhes do produto" })).toBeInTheDocument();
    const tab = screen.getByRole("tab", { name: "Descrição" });
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Descrição" })).toHaveTextContent(
      "Texto da descrição",
    );
  });

  it("troca de aba com clique", async () => {
    const user = userEvent.setup();
    render(<Exemplo />);
    await user.click(screen.getByRole("tab", { name: "Avaliações" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Lista de avaliações");
  });

  it("navega com setas, pulando a aba desabilitada", async () => {
    const user = userEvent.setup();
    render(<Exemplo />);
    await user.tab();
    expect(screen.getByRole("tab", { name: "Descrição" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Avaliações" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Loja" })).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Sobre a loja");
    await user.keyboard("{Home}");
    expect(screen.getByRole("tab", { name: "Descrição" })).toHaveFocus();
  });

  it("tem 44px de altura nas abas", () => {
    render(<Exemplo />);
    expect(screen.getByRole("tab", { name: "Descrição" })).toHaveClass("h-control-md");
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(<Exemplo />);
    await expect(container).toHaveNoAxeViolations();
  });
});
