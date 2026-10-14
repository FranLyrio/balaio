import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "../field/field";
import { Select } from "./select";

const options = (
  <>
    <option value="relevancia">Mais relevantes</option>
    <option value="menor-preco">Menor preço</option>
    <option value="maior-preco">Maior preço</option>
    <option value="avaliacao">Melhor avaliados</option>
  </>
);

const meta = {
  title: "Formulário/Select",
  component: Select,
  tags: ["autodocs"],
  args: { "aria-label": "Ordenar por", children: options },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md", "lg"] } },
  decorators: [(Story) => <div className="max-w-xs">{Story()}</div>],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const ComPlaceholder: Story = {
  name: "Com placeholder",
  args: { placeholder: "Ordenar por" },
};

export const Tamanhos: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Select {...args} size="sm" />
      <Select {...args} size="md" />
      <Select {...args} size="lg" />
    </div>
  ),
};

export const Estados: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <Field label="Com erro" error="Escolha uma opção">
        <Select placeholder="Selecione">{options}</Select>
      </Field>
      <Field label="Desabilitado" disabled>
        <Select>{options}</Select>
      </Field>
    </div>
  ),
};
