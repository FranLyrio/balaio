import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { Checkbox } from "../checkbox/checkbox";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

const meta = {
  title: "Sobreposição/Sheet",
  component: SheetContent,
  tags: ["autodocs"],
  argTypes: { side: { control: "inline-radio", options: ["right", "left", "bottom"] } },
  render: (args) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Filtros</Button>
      </SheetTrigger>
      <SheetContent {...args}>
        <SheetHeader>
          <SheetTitle>Filtrar resultados</SheetTitle>
          <SheetDescription>Escolha o que quer ver.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col">
          <Checkbox label="Frete grátis" />
          <Checkbox label="Orgânicos" />
          <Checkbox label="Loja oficial" />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button fullWidth>Aplicar filtros</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button fullWidth variant="ghost">
              Limpar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
} satisfies Meta<typeof SheetContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Direita: Story = { args: { side: "right" } };
export const Esquerda: Story = { args: { side: "left" } };
export const Inferior: Story = { args: { side: "bottom" } };
