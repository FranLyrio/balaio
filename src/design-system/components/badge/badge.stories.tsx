import type { Meta, StoryObj } from "@storybook/react-vite";
import { Truck } from "lucide-react";
import { Badge } from "./badge";

const variants = ["neutral", "primary", "accent", "success", "danger", "outline"] as const;

const meta = {
  title: "Exibição/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Novo" },
  argTypes: {
    variant: { control: "select", options: variants },
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Variantes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["md", "sm"] as const).map((size) => (
        <div key={size} className="flex flex-wrap items-center gap-2">
          {variants.map((variant) => (
            <Badge key={variant} variant={variant} size={size}>
              {variant}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Exemplos: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="accent">Mais vendido</Badge>
      <Badge variant="success">-20%</Badge>
      <Badge variant="outline">
        <Truck aria-hidden="true" /> Frete grátis
      </Badge>
      <Badge variant="danger">Esgotado</Badge>
      <Badge variant="primary">Loja oficial</Badge>
    </div>
  ),
};
