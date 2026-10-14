import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./text";

const meta = {
  title: "Tipografia/Text",
  component: Text,
  tags: ["autodocs"],
  args: { children: "Produtos de quem faz, direto pra sua casa." },
  argTypes: {
    as: { control: "select", options: ["p", "span", "div", "strong", "small", "label"] },
    size: { control: "inline-radio", options: ["xs", "sm", "md", "base", "lg", "xl"] },
    tone: {
      control: "select",
      options: [
        "default",
        "muted",
        "subtle",
        "primary",
        "success",
        "danger",
        "inverse",
        "inverse-muted",
      ],
    },
    weight: {
      control: "inline-radio",
      options: ["regular", "medium", "semibold", "bold", "extrabold"],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Tamanhos: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      {(["xs", "sm", "md", "base", "lg", "xl"] as const).map((size) => (
        <Text key={size} {...args} size={size}>
          {size} — {args.children}
        </Text>
      ))}
    </div>
  ),
};

export const Tons: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Text tone="default">Principal</Text>
      <Text tone="muted">Secundário</Text>
      <Text tone="subtle">Apoio</Text>
      <Text tone="primary">Primário</Text>
      <Text tone="success">Sucesso</Text>
      <Text tone="danger">Perigo</Text>
      <div className="rounded-card bg-surface-inverse p-4">
        <Text tone="inverse">Sobre petróleo</Text>
        <Text tone="inverse-muted">Apoio sobre petróleo</Text>
      </div>
    </div>
  ),
};

export const Pesos: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {(["regular", "medium", "semibold", "bold", "extrabold"] as const).map((weight) => (
        <Text key={weight} weight={weight}>
          {weight}
        </Text>
      ))}
    </div>
  ),
};

export const Preco: Story = {
  name: "Números tabulares (preço)",
  render: () => (
    <div className="flex flex-col items-end">
      <Text numeric tone="success" weight="bold" size="xl">
        R$ 1.111,90
      </Text>
      <Text numeric tone="success" weight="bold" size="xl">
        R$ 888,00
      </Text>
      <Text numeric tone="muted" size="sm">
        ou 10x de R$ 111,19
      </Text>
    </div>
  ),
};
