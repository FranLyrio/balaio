import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio, RadioGroup } from "./radio-group";

const opcoes = (
  <>
    <Radio value="normal" label="Normal" description="Até 7 dias úteis — grátis" />
    <Radio value="expressa" label="Expressa" description="Até 2 dias úteis — R$ 19,90" />
    <Radio value="retirada" label="Retirar na loja" />
  </>
);

const meta = {
  title: "Formulário/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  args: { legend: "Forma de entrega", defaultValue: "normal", children: opcoes },
  argTypes: { orientation: { control: "inline-radio", options: ["vertical", "horizontal"] } },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    legend: "Tamanho",
    defaultValue: "m",
    children: (
      <>
        <Radio value="p" label="P" />
        <Radio value="m" label="M" />
        <Radio value="g" label="G" />
        <Radio value="gg" label="GG" disabled />
      </>
    ),
  },
};

export const ComDicaEErro: Story = {
  name: "Com dica e erro",
  args: {
    hint: "O prazo conta a partir da confirmação do pagamento.",
    error: "Escolha uma forma de entrega.",
    required: true,
    defaultValue: undefined,
  },
};

export const Desabilitado: Story = {
  args: { disabled: true },
};
