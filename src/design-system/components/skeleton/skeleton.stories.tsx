import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../card/card";
import { Skeleton } from "./skeleton";

const meta = {
  title: "Exibição/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  args: { className: "h-24 w-64" },
  argTypes: { shape: { control: "inline-radio", options: ["text", "rect", "circle"] } },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Formatos: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton shape="circle" className="size-12" />
      <Skeleton shape="rect" className="h-12 w-32" />
      <Skeleton shape="text" className="w-40 text-base" />
    </div>
  ),
};

export const Composicao: Story = {
  name: "Composição (card carregando)",
  render: () => (
    <Card
      role="group"
      aria-busy="true"
      aria-label="Carregando produto"
      className="flex max-w-xs flex-col gap-3"
    >
      <Skeleton className="aspect-square w-full" />
      <Skeleton shape="text" className="text-lg" />
      <Skeleton shape="text" className="w-2/3" />
      <Skeleton shape="text" className="w-1/3 text-xl" />
    </Card>
  ),
};
