import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mail, Search } from "lucide-react";
import { Field } from "../field/field";
import { Input } from "./input";

const meta = {
  title: "Formulário/Input",
  component: Input,
  tags: ["autodocs"],
  args: { placeholder: "Digite aqui", "aria-label": "Exemplo" },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md", "lg"] } },
  decorators: [(Story) => <div className="max-w-md">{Story()}</div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Tamanhos: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Input size="sm" aria-label="Pequeno" placeholder="sm — 36px" />
      <Input size="md" aria-label="Médio" placeholder="md — 44px" />
      <Input size="lg" aria-label="Grande" placeholder="lg — 52px" />
    </div>
  ),
};

export const ComIcones: Story = {
  name: "Com ícones",
  render: () => (
    <div className="flex flex-col gap-3">
      <Input
        type="search"
        aria-label="Buscar"
        placeholder="Buscar no Balaio"
        startIcon={<Search />}
      />
      <Input type="email" aria-label="E-mail" placeholder="voce@exemplo.com" endIcon={<Mail />} />
    </div>
  ),
};

export const Estados: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <Field label="Normal">
        <Input placeholder="Placeholder" />
      </Field>
      <Field label="Preenchido">
        <Input defaultValue="Rua das Flores, 123" />
      </Field>
      <Field label="Com erro" error="Campo obrigatório">
        <Input />
      </Field>
      <Field label="Desabilitado" disabled>
        <Input defaultValue="Não editável" />
      </Field>
      <Field label="Somente leitura">
        <Input readOnly defaultValue="Pedido #4821" />
      </Field>
    </div>
  ),
};
