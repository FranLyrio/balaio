import { render } from "@testing-library/react";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("é oculto para tecnologias assistivas", () => {
    const { container } = render(<Skeleton className="h-10 w-40" />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("aplica o formato", () => {
    const { container } = render(<Skeleton shape="circle" className="size-10" />);
    expect(container.firstChild).toHaveClass("rounded-full", "animate-pulse");
  });

  it("não tem violações de acessibilidade", async () => {
    const { container } = render(
      <div aria-busy="true">
        <Skeleton shape="text" />
      </div>,
    );
    await expect(container).toHaveNoAxeViolations();
  });
});
