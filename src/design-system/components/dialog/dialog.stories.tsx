import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { Field } from "../field/field";
import { Input } from "../input/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const meta = {
  title: "Sobreposição/Dialog",
  component: DialogContent,
  tags: ["autodocs"],
  argTypes: { size: { control: "inline-radio", options: ["sm", "md", "lg"] } },
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Abrir dialog</Button>
      </DialogTrigger>
      <DialogContent {...args}>
        <DialogHeader>
          <DialogTitle>Excluir endereço?</DialogTitle>
          <DialogDescription>
            O endereço “Casa” será removido da sua conta. Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Excluir</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
} satisfies Meta<typeof DialogContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Pequeno: Story = { args: { size: "sm" } };

export const Grande: Story = { args: { size: "lg" } };

export const ComFormulario: Story = {
  name: "Com formulário",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Novo endereço</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo endereço</DialogTitle>
          <DialogDescription>Usado para calcular o frete e entregar seu pedido.</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <Field label="CEP" required>
            <Input inputMode="numeric" autoComplete="postal-code" />
          </Field>
          <Field label="Número" required>
            <Input />
          </Field>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  ),
};

export const AbertoPorPadrao: Story = {
  name: "Aberto (para revisão visual)",
  render: (args) => (
    <Dialog defaultOpen>
      <DialogContent {...args}>
        <DialogHeader>
          <DialogTitle>Pedido confirmado</DialogTitle>
          <DialogDescription>Enviamos os detalhes para o seu e-mail.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="accent">Continuar comprando</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
