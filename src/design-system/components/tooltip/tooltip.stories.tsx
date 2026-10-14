import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heart, Share2 } from "lucide-react";
import { Button, IconButton } from "../button/button";
import { Tooltip, TooltipProvider } from "./tooltip";

const meta = {
  title: "Sobreposição/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  args: {
    content: "Salvar nos favoritos",
    children: <IconButton aria-label="Favoritar" icon={<Heart aria-hidden="true" />} />,
  },
  argTypes: {
    side: { control: "inline-radio", options: ["top", "right", "bottom", "left"] },
    children: { control: false },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-40 items-center justify-center">
        <TooltipProvider>{Story()}</TooltipProvider>
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Aberto: Story = { name: "Aberto (revisão visual)", args: { defaultOpen: true } };

export const Lados: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-16">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side} side={side} content={`Lado: ${side}`}>
          <Button variant="outline" size="sm">
            {side}
          </Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const EmBotaoComIcone: Story = {
  name: "Em botão só com ícone",
  render: () => (
    <div className="flex gap-2">
      <Tooltip content="Favoritar">
        <IconButton aria-label="Favoritar" icon={<Heart aria-hidden="true" />} />
      </Tooltip>
      <Tooltip content="Compartilhar">
        <IconButton aria-label="Compartilhar" icon={<Share2 aria-hidden="true" />} />
      </Tooltip>
    </div>
  ),
};
