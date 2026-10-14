import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { Field } from "../field/field";
import { Input } from "../input/input";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "./popover";

const meta = {
  title: "Sobreposição/Popover",
  component: PopoverContent,
  tags: ["autodocs"],
  argTypes: {
    side: { control: "inline-radio", options: ["top", "right", "bottom", "left"] },
    align: { control: "inline-radio", options: ["start", "center", "end"] },
  },
  render: (args) => (
    <div className="flex min-h-80 items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Calcular frete</Button>
        </PopoverTrigger>
        <PopoverContent {...args} aria-label="Calcular frete">
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <Field label="CEP">
              <Input size="sm" inputMode="numeric" placeholder="00000-000" />
            </Field>
            <PopoverClose asChild>
              <Button size="sm" type="submit">
                Calcular
              </Button>
            </PopoverClose>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  ),
} satisfies Meta<typeof PopoverContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };
export const EmCima: Story = { name: "Em cima", args: { side: "top" } };
export const AlinhadoNoInicio: Story = { name: "Alinhado no início", args: { align: "start" } };
