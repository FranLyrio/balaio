import type { Meta, StoryObj } from "@storybook/react-vite";
import { MessageCircle, Star, Store } from "lucide-react";
import { Text } from "../text/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "Sobreposição/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: { defaultValue: "descricao" },
  render: (args) => (
    <Tabs {...args} className="max-w-xl">
      <TabsList aria-label="Detalhes do produto">
        <TabsTrigger value="descricao">Descrição</TabsTrigger>
        <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
        <TabsTrigger value="duvidas">Dúvidas</TabsTrigger>
      </TabsList>
      <TabsContent value="descricao">
        <Text>Cesta com 12 itens orgânicos, colhidos na semana da entrega.</Text>
      </TabsContent>
      <TabsContent value="avaliacoes">
        <Text>4,8 de 5 — 132 avaliações.</Text>
      </TabsContent>
      <TabsContent value="duvidas">
        <Text>Nenhuma dúvida ainda.</Text>
      </TabsContent>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const ComIconesEDesabilitada: Story = {
  name: "Com ícones e aba desabilitada",
  render: () => (
    <Tabs defaultValue="avaliacoes" className="max-w-xl">
      <TabsList aria-label="Seções da loja">
        <TabsTrigger value="avaliacoes">
          <Star aria-hidden="true" /> Avaliações
        </TabsTrigger>
        <TabsTrigger value="loja">
          <Store aria-hidden="true" /> Loja
        </TabsTrigger>
        <TabsTrigger value="chat" disabled>
          <MessageCircle aria-hidden="true" /> Chat
        </TabsTrigger>
      </TabsList>
      <TabsContent value="avaliacoes">
        <Text>Avaliações</Text>
      </TabsContent>
      <TabsContent value="loja">
        <Text>Sobre a loja</Text>
      </TabsContent>
      <TabsContent value="chat">
        <Text>Chat</Text>
      </TabsContent>
    </Tabs>
  ),
};

export const MuitasAbas: Story = {
  name: "Muitas abas (rolagem horizontal)",
  render: () => (
    <Tabs defaultValue="0" className="max-w-sm">
      <TabsList aria-label="Categorias">
        {["Frutas", "Verduras", "Grãos", "Laticínios", "Padaria", "Bebidas"].map((c, i) => (
          <TabsTrigger key={c} value={String(i)}>
            {c}
          </TabsTrigger>
        ))}
      </TabsList>
      {["Frutas", "Verduras", "Grãos", "Laticínios", "Padaria", "Bebidas"].map((c, i) => (
        <TabsContent key={c} value={String(i)}>
          <Text>{c}</Text>
        </TabsContent>
      ))}
    </Tabs>
  ),
};
