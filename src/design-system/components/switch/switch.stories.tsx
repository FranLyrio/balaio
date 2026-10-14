import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./switch";

const meta = {
  title: "Formulário/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: { label: "Avisar quando baixar o preço" },
  argTypes: { labelPosition: { control: "inline-radio", options: ["end", "start"] } },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Estados: Story = {
  render: () => (
    <div className="flex flex-col">
      <Switch label="Desligado" />
      <Switch label="Ligado" defaultChecked />
      <Switch label="Com descrição" description="Enviamos no máximo um e-mail por semana." />
      <Switch label="Desabilitado" disabled />
      <Switch label="Desabilitado ligado" disabled defaultChecked />
    </div>
  ),
};

export const LabelNoInicio: Story = {
  name: "Label no início",
  args: { labelPosition: "start", label: "Modo férias da loja" },
};
