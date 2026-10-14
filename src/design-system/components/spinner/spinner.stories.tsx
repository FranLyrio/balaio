import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./spinner";

const meta = {
  title: "Exibição/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: { size: { control: "inline-radio", options: ["sm", "md", "lg", "xl"] } },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Tamanhos: Story = {
  render: () => (
    <div className="flex items-center gap-6 text-primary">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const SobrePetroleo: Story = {
  name: "Sobre petróleo",
  render: () => (
    <div className="inline-flex rounded-card bg-surface-inverse p-6 text-fg-inverse">
      <Spinner size="lg" />
    </div>
  ),
};
