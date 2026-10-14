import type { Meta, StoryObj } from "@storybook/react-vite";
import { Leaf } from "lucide-react";
import { useState } from "react";
import { Chip, RemovableChip } from "./chip";

const meta = {
  title: "Exibição/Chip",
  component: Chip,
  tags: ["autodocs"],
  args: { children: "Orgânicos" },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md"] } },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Estados: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(["md", "sm"] as const).map((size) => (
        <div key={size} className="flex flex-wrap items-center gap-2">
          <Chip size={size}>Não selecionado</Chip>
          <Chip size={size} defaultSelected>
            Selecionado
          </Chip>
          <Chip size={size} icon={<Leaf />}>
            Com ícone
          </Chip>
          <Chip size={size} disabled>
            Desabilitado
          </Chip>
        </div>
      ))}
    </div>
  ),
};

function FiltrosDemo() {
  const [filtros, setFiltros] = useState(["Bahia", "Até R$ 50", "Frete grátis"]);
  return (
    <div className="flex flex-wrap gap-2">
      {filtros.map((filtro) => (
        <RemovableChip
          key={filtro}
          onRemove={() => setFiltros((atual) => atual.filter((f) => f !== filtro))}
        >
          {filtro}
        </RemovableChip>
      ))}
      {filtros.length === 0 ? <p className="text-fg-subtle">Nenhum filtro aplicado.</p> : null}
    </div>
  );
}

export const Removivel: Story = {
  name: "Removível",
  render: () => <FiltrosDemo />,
};

export const RemovivelTamanhos: Story = {
  name: "Removível — tamanhos",
  render: () => (
    <div className="flex items-center gap-2">
      <RemovableChip onRemove={() => {}}>md</RemovableChip>
      <RemovableChip size="sm" onRemove={() => {}}>
        sm
      </RemovableChip>
      <RemovableChip selected onRemove={() => {}}>
        Selecionado
      </RemovableChip>
      <RemovableChip disabled onRemove={() => {}}>
        Desabilitado
      </RemovableChip>
    </div>
  ),
};
