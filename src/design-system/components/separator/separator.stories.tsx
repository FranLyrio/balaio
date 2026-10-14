import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "./separator";

const meta = {
  title: "Exibição/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    tone: { control: "inline-radio", options: ["default", "strong"] },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <div className="flex max-w-sm flex-col gap-4">
      <p>Subtotal</p>
      <Separator {...args} />
      <p>Frete</p>
      <Separator {...args} tone="strong" />
      <p>Total</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-6 items-center gap-4">
      <span>Ajuda</span>
      <Separator orientation="vertical" />
      <span>Pedidos</span>
      <Separator orientation="vertical" />
      <span>Conta</span>
    </div>
  ),
};
