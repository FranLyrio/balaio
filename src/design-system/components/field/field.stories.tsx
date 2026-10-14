import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../input/input";
import { Select } from "../select/select";
import { Textarea } from "../textarea/textarea";
import { Field } from "./field";

const meta = {
  title: "Formulário/Field",
  component: Field,
  tags: ["autodocs"],
  args: { label: "E-mail", children: null },
  decorators: [(Story) => <div className="max-w-md">{Story()}</div>],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {
  name: "Padrão",
  render: (args) => (
    <Field {...args}>
      <Input type="email" placeholder="voce@exemplo.com" />
    </Field>
  ),
};

export const ComDica: Story = {
  name: "Com dica",
  args: { hint: "Usamos só para enviar o status do pedido." },
  render: Padrao.render,
};

export const ComErro: Story = {
  name: "Com erro",
  args: { error: "Informe um e-mail válido.", hint: "Ex.: voce@exemplo.com" },
  render: (args) => (
    <Field {...args}>
      <Input type="email" defaultValue="voce@" />
    </Field>
  ),
};

export const Obrigatorio: Story = {
  name: "Obrigatório",
  args: { required: true },
  render: Padrao.render,
};

export const Desabilitado: Story = {
  args: { disabled: true },
  render: (args) => (
    <Field {...args}>
      <Input type="email" defaultValue="voce@exemplo.com" />
    </Field>
  ),
};

export const LabelOculto: Story = {
  name: "Label oculto",
  args: { label: "Buscar", hideLabel: true },
  render: (args) => (
    <Field {...args}>
      <Input type="search" placeholder="Buscar no Balaio" />
    </Field>
  ),
};

export const Formulario: Story = {
  name: "Formulário completo",
  render: () => (
    <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
      <Field label="Nome completo" required>
        <Input autoComplete="name" />
      </Field>
      <Field label="Estado" hint="Usado para calcular o frete">
        <Select placeholder="Selecione">
          <option value="BA">Bahia</option>
          <option value="PE">Pernambuco</option>
          <option value="SP">São Paulo</option>
        </Select>
      </Field>
      <Field label="Observações" error="Use no máximo 200 caracteres.">
        <Textarea defaultValue="Entregar na portaria" />
      </Field>
    </form>
  ),
};
