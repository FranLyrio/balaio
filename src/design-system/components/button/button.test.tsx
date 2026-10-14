import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ArrowRight, Heart, ShoppingBag } from "lucide-react";
import { Button, IconButton } from "./button";

describe("Button", () => {
  it("renderiza um botão do tipo button por padrão", () => {
    render(<Button>Comprar</Button>);
    const button = screen.getByRole("button", { name: "Comprar" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("bg-primary", "h-control-md");
  });

  it("aplica variantes e tamanhos", () => {
    render(
      <Button variant="accent" size="lg">
        Destaque
      </Button>,
    );
    expect(screen.getByRole("button")).toHaveClass("bg-accent", "text-accent-fg", "h-control-lg");
  });

  it("dispara onClick com mouse e teclado", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Adicionar</Button>);
    await user.click(screen.getByRole("button"));
    await user.tab();
    await user.tab({ shift: true });
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it("recebe foco pelo teclado", async () => {
    const user = userEvent.setup();
    render(<Button>Foco</Button>);
    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
  });

  it("não dispara onClick quando desabilitado", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Indisponível
      </Button>,
    );
    await user.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("em loading continua focável, anuncia e bloqueia cliques", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Salvar
      </Button>,
    );
    const button = screen.getByRole("button", { name: /Salvar\s*Carregando/ });
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("aria-disabled", "true");
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
    button.blur();
    await user.tab();
    expect(button).toHaveFocus();
  });

  it("renderiza ícones à esquerda e à direita", () => {
    render(
      <Button
        leftIcon={<ShoppingBag data-testid="esq" />}
        rightIcon={<ArrowRight data-testid="dir" />}
      >
        Sacola
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button.firstElementChild).toBe(screen.getByTestId("esq"));
    expect(button.lastElementChild).toBe(screen.getByTestId("dir"));
  });

  it("com asChild aplica o estilo ao filho", () => {
    render(
      <Button asChild variant="outline">
        <a href="/ofertas">Ver ofertas</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Ver ofertas" });
    expect(link).toHaveClass("border-primary");
    expect(link).not.toHaveAttribute("type");
  });

  it("repassa a ref", () => {
    let node: HTMLButtonElement | null = null;
    render(<Button ref={(el) => void (node = el)}>Ref</Button>);
    expect(node).toBeInstanceOf(HTMLButtonElement);
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(
      <div>
        <Button>Primário</Button>
        <Button variant="accent">Destaque</Button>
        <Button variant="outline">Contorno</Button>
        <Button variant="ghost">Fantasma</Button>
        <Button loading>Carregando</Button>
      </div>,
    );
    await expect(container).toHaveNoAxeViolations();
  });
});

describe("IconButton", () => {
  it("usa aria-label como nome acessível e é quadrado", () => {
    render(<IconButton icon={<Heart aria-hidden />} aria-label="Favoritar" />);
    const button = screen.getByRole("button", { name: "Favoritar" });
    expect(button).toHaveClass("w-control-md", "h-control-md");
  });

  it("exige aria-label no tipo", () => {
    // @ts-expect-error aria-label é obrigatório
    render(<IconButton icon={<Heart aria-hidden />} />);
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(
      <IconButton icon={<Heart aria-hidden />} aria-label="Favoritar" />,
    );
    await expect(container).toHaveNoAxeViolations();
  });
});
