import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Checkbox } from "./checkbox";

const meta = {
  title: "Formulário/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: { label: "Quero receber ofertas por e-mail" },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Estados: Story = {
  render: () => (
    <div className="flex flex-col">
      <Checkbox label="Desmarcado" />
      <Checkbox label="Marcado" defaultChecked />
      <Checkbox label="Indeterminado" indeterminate />
      <Checkbox label="Com descrição" description="Você pode cancelar quando quiser." />
      <Checkbox label="Com erro" aria-invalid />
      <Checkbox label="Desabilitado" disabled />
      <Checkbox label="Desabilitado marcado" disabled defaultChecked />
    </div>
  ),
};

function SelecionarTodosDemo() {
  const [items, setItems] = useState({ frutas: true, verduras: false, graos: false });
  const values = Object.values(items);
  const all = values.every(Boolean);
  const some = values.some(Boolean);
  return (
    <div className="flex flex-col">
      <Checkbox
        label="Selecionar todas as categorias"
        checked={all}
        indeterminate={some && !all}
        onChange={() => setItems({ frutas: !all, verduras: !all, graos: !all })}
      />
      <div className="flex flex-col pl-8">
        {(Object.keys(items) as (keyof typeof items)[]).map((key) => (
          <Checkbox
            key={key}
            label={key}
            checked={items[key]}
            onChange={(e) => setItems((s) => ({ ...s, [key]: e.target.checked }))}
          />
        ))}
      </div>
    </div>
  );
}

export const SelecionarTodos: Story = {
  name: "Selecionar todos (indeterminado)",
  render: () => <SelecionarTodosDemo />,
};
