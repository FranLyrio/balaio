import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowRight } from "lucide-react";
import { Icon } from "../icon/icon";
import { Link } from "./link";

const meta = {
  title: "Ações/Link",
  component: Link,
  tags: ["autodocs"],
  args: { href: "#", children: "Ver todas as ofertas" },
  argTypes: {
    tone: { control: "inline-radio", options: ["primary", "default", "muted", "inverse"] },
    underline: { control: "inline-radio", options: ["always", "hover", "none"] },
    size: { control: "inline-radio", options: ["inherit", "sm", "md", "base", "lg"] },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Tons: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-3">
      <Link {...args} tone="primary">
        Primário
      </Link>
      <Link {...args} tone="default">
        Padrão
      </Link>
      <Link {...args} tone="muted">
        Discreto
      </Link>
      <div className="rounded-card bg-surface-inverse p-4">
        <Link {...args} tone="inverse">
          Sobre petróleo
        </Link>
      </div>
    </div>
  ),
};

export const Sublinhado: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-3">
      <Link {...args} underline="always">
        Sempre
      </Link>
      <Link {...args} underline="hover">
        No hover
      </Link>
      <Link {...args} underline="none">
        Nunca (use só quando o contexto deixar claro que é link)
      </Link>
    </div>
  ),
};

export const ComIcone: Story = {
  name: "Com ícone",
  render: (args) => (
    <Link {...args} underline="hover">
      Ver todas <Icon icon={ArrowRight} size="sm" />
    </Link>
  ),
};

export const ComRoteador: Story = {
  name: "Com roteador (asChild)",
  render: () => (
    <Link asChild>
      {/* No app: <NextLink href="/ofertas">. O design system não importa next/link. */}
      <a href="#ofertas">Link do roteador</a>
    </Link>
  ),
};
