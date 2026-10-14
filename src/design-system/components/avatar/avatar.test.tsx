import { render, screen } from "@testing-library/react";
import { Avatar, getInitials } from "./avatar";

describe("getInitials", () => {
  it.each([
    ["Ana Maria Souza", "AS"],
    ["Balaio", "Ba"],
    ["  joão   silva ", "js"],
    ["", "?"],
  ])("%s → %s", (name, initials) => {
    expect(getInitials(name)).toBe(initials);
  });
});

describe("Avatar", () => {
  it("mostra as iniciais e usa o nome como nome acessível", () => {
    render(<Avatar name="Ana Souza" />);
    const avatar = screen.getByRole("img", { name: "Ana Souza" });
    expect(avatar).toHaveTextContent("AS");
  });

  it("gera a mesma cor para o mesmo nome", () => {
    const { container } = render(
      <>
        <Avatar name="Loja do Zé" />
        <Avatar name="Loja do Zé" />
      </>,
    );
    const [a, b] = container.querySelectorAll("[data-slot='avatar']");
    expect(a!.className).toBe(b!.className);
  });

  it("fica oculto quando decorativo", () => {
    render(<Avatar name="Ana" decorative />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(<Avatar name="Ana Souza" size="lg" />);
    await expect(container).toHaveNoAxeViolations();
  });
});
