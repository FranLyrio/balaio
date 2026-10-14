import { render, screen } from "@testing-library/react";
import { Spinner } from "./spinner";

describe("Spinner", () => {
  it("anuncia o carregamento com role status", () => {
    render(<Spinner />);
    expect(screen.getByRole("status", { name: "Carregando" })).toBeInTheDocument();
  });

  it("aceita um rótulo próprio", () => {
    render(<Spinner label="Buscando produtos" />);
    expect(screen.getByRole("status", { name: "Buscando produtos" })).toBeInTheDocument();
  });

  it("fica oculto quando decorativo", () => {
    const { container } = render(<Spinner decorative />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(<Spinner />);
    await expect(container).toHaveNoAxeViolations();
  });
});
