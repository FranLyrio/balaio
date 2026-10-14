import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight, Heart, ShoppingBag, Trash2, X } from "lucide-react";
import { Icon } from "../icon/icon";
import { Button, IconButton } from "./button";

const variants = ["primary", "accent", "outline", "ghost"] as const;
const sizes = ["sm", "md", "lg"] as const;

const meta = {
  title: "Ações/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Adicionar à sacola" },
  argTypes: {
    variant: { control: "inline-radio", options: variants },
    size: { control: "inline-radio", options: sizes },
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Variantes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Tamanhos: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((size) => (
        <Button key={size} {...args} size={size}>
          Tamanho {size}
        </Button>
      ))}
    </div>
  ),
};

export const ComIcones: Story = {
  name: "Com ícones",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button leftIcon={<Icon icon={ShoppingBag} />}>Adicionar à sacola</Button>
      <Button variant="outline" rightIcon={<Icon icon={ArrowRight} />}>
        Ver todos
      </Button>
      <Button variant="accent" size="lg" leftIcon={<Icon icon={Heart} size="lg" />}>
        Favoritar
      </Button>
    </div>
  ),
};

export const Estados: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-3">
          <Button variant={variant}>Normal</Button>
          <Button variant={variant} loading>
            Salvando
          </Button>
          <Button variant={variant} disabled>
            Desabilitado
          </Button>
        </div>
      ))}
    </div>
  ),
};

export const SoIcone: Story = {
  name: "Só ícone (IconButton)",
  render: () => (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-3">
          {variants.map((variant) => (
            <IconButton
              key={variant}
              variant={variant}
              size={size}
              aria-label="Favoritar"
              icon={<Icon icon={Heart} size={size === "lg" ? "lg" : "md"} />}
            />
          ))}
          <IconButton size={size} aria-label="Remover" icon={<Icon icon={Trash2} />} loading />
          <IconButton size={size} aria-label="Fechar" icon={<Icon icon={X} />} disabled />
        </div>
      ))}
    </div>
  ),
};

export const ComoLink: Story = {
  name: "Como link (asChild)",
  render: () => (
    <Button asChild variant="outline" rightIcon={<Icon icon={ArrowRight} />}>
      <a href="#ofertas">Ver ofertas</a>
    </Button>
  ),
};

export const LarguraTotal: Story = {
  name: "Largura total",
  args: { fullWidth: true },
  decorators: [(Story) => <div className="max-w-sm">{Story()}</div>],
};
