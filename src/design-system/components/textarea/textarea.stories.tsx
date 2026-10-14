import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "../field/field";
import { Textarea } from "./textarea";

const meta = {
  title: "Formulário/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: { "aria-label": "Mensagem", placeholder: "Conte mais sobre o pedido" },
  decorators: [(Story) => <div className="max-w-md">{Story()}</div>],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Estados: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <Field label="Com dica" hint="Até 200 caracteres">
        <Textarea />
      </Field>
      <Field label="Com erro" error="Use no máximo 200 caracteres.">
        <Textarea defaultValue="Texto muito longo…" />
      </Field>
      <Field label="Desabilitado" disabled>
        <Textarea defaultValue="Não editável" />
      </Field>
      <Field label="Sem redimensionar">
        <Textarea resize="none" rows={2} />
      </Field>
    </div>
  ),
};
