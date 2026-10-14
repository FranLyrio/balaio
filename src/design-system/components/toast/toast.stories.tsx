import type { Meta, StoryObj } from "@storybook/react-vite";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { Button } from "../button/button";
import { Toast, ToastProvider, useToast } from "./toast";

const meta = {
  title: "Sobreposição/Toast",
  component: Toast,
  tags: ["autodocs"],
  args: { title: "Adicionado à sacola", description: "Cesta de orgânicos · 1 unidade" },
  argTypes: { variant: { control: "inline-radio", options: ["neutral", "success", "danger"] } },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

function Disparadores() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        onClick={() => toast({ title: "Link copiado", description: "Cole onde quiser." })}
      >
        Neutro
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Pedido confirmado",
            description: "Você recebe o código de rastreio por e-mail.",
            variant: "success",
          })
        }
      >
        Sucesso
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Pagamento recusado",
            description: "Confira os dados do cartão.",
            variant: "danger",
          })
        }
      >
        Perigo
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Item removido da sacola",
            action: {
              label: "Desfazer",
              altText: "Desfazer remoção do item",
              onClick: () => toast({ title: "Item devolvido à sacola", variant: "success" }),
            },
          })
        }
      >
        Com ação
      </Button>
    </div>
  );
}

export const Interativo: Story = {
  render: () => (
    <ToastProvider>
      <Disparadores />
    </ToastProvider>
  ),
};

export const Variantes: Story = {
  name: "Variantes (estáticas)",
  render: (args) => (
    <ToastPrimitive.Provider>
      <ol className="flex max-w-[420px] list-none flex-col gap-3 p-0">
        <Toast {...args} variant="neutral" open duration={Infinity} />
        <Toast {...args} title="Pedido confirmado" variant="success" open duration={Infinity} />
        <Toast
          {...args}
          title="Pagamento recusado"
          description="Confira os dados do cartão."
          variant="danger"
          open
          duration={Infinity}
        />
        <Toast
          {...args}
          title="Item removido"
          description={undefined}
          action={{ label: "Desfazer", altText: "Desfazer remoção", onClick: () => {} }}
          open
          duration={Infinity}
        />
      </ol>
    </ToastPrimitive.Provider>
  ),
};
