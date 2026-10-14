import type { Meta, StoryObj } from "@storybook/react-vite";
import { VisuallyHidden } from "./visually-hidden";

const meta = {
  title: "Utilitários/VisuallyHidden",
  component: VisuallyHidden,
  tags: ["autodocs"],
  args: { children: "Este texto só é lido por leitores de tela" },
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: (args) => (
    <p>
      O texto abaixo está oculto visualmente. Inspecione o DOM para vê-lo.
      <VisuallyHidden {...args} />
    </p>
  ),
};
