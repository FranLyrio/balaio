import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "../heading/heading";
import { Text } from "../text/text";
import { Card } from "./card";

const meta = {
  title: "Exibição/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    children: (
      <div className="flex flex-col gap-2">
        <Heading as="h3" size="xl">
          Feira da semana
        </Heading>
        <Text tone="inherit">Frutas e verduras de produtores locais.</Text>
      </div>
    ),
  },
  argTypes: {
    tone: { control: "inline-radio", options: ["surface", "subtle", "inverse", "accent"] },
    padding: { control: "inline-radio", options: ["none", "sm", "md", "lg"] },
  },
  decorators: [(Story) => <div className="max-w-sm">{Story()}</div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = { name: "Padrão" };

export const Tons: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      {(["surface", "subtle", "inverse", "accent"] as const).map((tone) => (
        <Card key={tone} tone={tone}>
          <Heading as="h3" size="lg" tone={tone === "inverse" ? "inverse" : "default"}>
            {tone}
          </Heading>
          <Text tone={tone === "inverse" ? "inverse-muted" : "inherit"}>
            {String(args.padding ?? "md")}
          </Text>
        </Card>
      ))}
    </div>
  ),
};

export const Paddings: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["none", "sm", "md", "lg"] as const).map((padding) => (
        <Card key={padding} padding={padding}>
          <Text>padding {padding}</Text>
        </Card>
      ))}
    </div>
  ),
};

export const Interativo: Story = {
  name: "Interativo (como link)",
  render: () => (
    <Card asChild interactive>
      <a href="#produto" className="block no-underline">
        <Heading as="h3" size="lg">
          Cesta de orgânicos
        </Heading>
        <Text tone="success" weight="bold" numeric>
          R$ 89,90
        </Text>
      </a>
    </Card>
  ),
};
