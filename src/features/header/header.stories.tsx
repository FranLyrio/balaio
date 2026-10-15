import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "./header";

const meta = {
  title: "Funcionalidades/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };
