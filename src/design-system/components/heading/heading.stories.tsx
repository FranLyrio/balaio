import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "./heading";

const meta = {
  title: "Tipografia/Heading",
  component: Heading,
  tags: ["autodocs"],
  args: { children: "Tudo o que cabe no seu balaio" },
  argTypes: {
    as: { control: "select", options: ["h1", "h2", "h3", "h4", "h5", "h6"] },
    size: { control: "select", options: ["6xl", "5xl", "4xl", "3xl", "2xl", "xl", "lg"] },
    weight: { control: "inline-radio", options: ["semibold", "bold", "extrabold"] },
    tone: { control: "inline-radio", options: ["default", "muted", "inverse"] },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Niveis: Story = {
  name: "Níveis",
  render: () => (
    <div className="flex flex-col gap-4">
      {(["h1", "h2", "h3", "h4", "h5", "h6"] as const).map((level) => (
        <Heading key={level} as={level}>
          {level} — Feira boa é feira cheia
        </Heading>
      ))}
    </div>
  ),
};

export const Tamanhos: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["6xl", "5xl", "4xl", "3xl", "2xl", "xl", "lg"] as const).map((size) => (
        <Heading key={size} as="p" size={size}>
          {size} — Balaio
        </Heading>
      ))}
    </div>
  ),
};

export const Pesos: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["semibold", "bold", "extrabold"] as const).map((weight) => (
        <Heading key={weight} weight={weight} size="3xl">
          {weight}
        </Heading>
      ))}
    </div>
  ),
};

export const Tons: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Heading tone="default">Padrão</Heading>
      <Heading tone="muted">Secundário</Heading>
      <div className="rounded-card bg-surface-inverse p-6">
        <Heading tone="inverse">Sobre petróleo</Heading>
      </div>
    </div>
  ),
};
