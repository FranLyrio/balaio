import { render, screen } from "@testing-library/react";
import { Separator } from "./separator";

describe("Separator", () => {
  it("é decorativo por padrão", () => {
    render(<Separator />);
    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
  });

  it("expõe role separator com orientação quando semântico", () => {
    render(<Separator decorative={false} orientation="vertical" />);
    const sep = screen.getByRole("separator");
    expect(sep).toHaveAttribute("aria-orientation", "vertical");
    expect(sep).toHaveClass("w-px");
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(
      <div>
        <Separator />
        <Separator decorative={false} />
      </div>,
    );
    await expect(container).toHaveNoAxeViolations();
  });
});
