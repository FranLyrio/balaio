import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./avatar";

const meta = {
  title: "Exibição/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: { name: "Ana Souza" },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg", "xl"] },
    tone: { control: "inline-radio", options: [undefined, "primary", "accent", "subtle"] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Tamanhos: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const Tons: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Primário" tone="primary" />
      <Avatar name="Destaque" tone="accent" />
      <Avatar name="Sutil" tone="subtle" />
    </div>
  ),
};

export const CorPeloNome: Story = {
  name: "Cor derivada do nome",
  render: () => (
    <div className="flex items-center gap-3">
      {["Ana Souza", "Bruno Lima", "Casa da Farinha", "Dona Lúcia", "Empório Bahia"].map((n) => (
        <Avatar key={n} name={n} />
      ))}
    </div>
  ),
};

export const ComNome: Story = {
  name: "Ao lado do nome (decorativo)",
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Empório Bahia" decorative />
      <span className="font-semibold">Empório Bahia</span>
    </div>
  ),
};
