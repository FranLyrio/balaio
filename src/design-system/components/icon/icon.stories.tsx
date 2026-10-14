import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heart, Search, ShoppingBag, Star, Truck } from "lucide-react";
import { Icon } from "./icon";

const meta = {
  title: "Exibição/Icon",
  component: Icon,
  tags: ["autodocs"],
  args: { icon: ShoppingBag },
  argTypes: {
    icon: { control: false },
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg", "xl"] },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Tamanhos: Story = {
  render: () => (
    <div className="flex items-end gap-6 text-fg">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon icon={Search} size={size} />
          <span className="text-xs text-fg-subtle">{size}</span>
        </div>
      ))}
    </div>
  ),
};

export const ComSignificado: Story = {
  name: "Com label (significativo)",
  render: () => (
    <div className="flex items-center gap-4 text-primary">
      <Icon icon={Heart} label="Favorito" />
      <Icon icon={Truck} label="Frete grátis" />
      <Icon icon={Star} label="Avaliação" className="text-rating" />
    </div>
  ),
};
