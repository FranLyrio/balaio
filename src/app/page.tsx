import NextLink from "next/link";
import { ArrowRight, Heart, Leaf, ShoppingBag, Truck } from "lucide-react";
import {
  Badge,
  Button,
  Card,
  Heading,
  Icon,
  IconButton,
  Link,
  Separator,
  Text,
  Tooltip,
} from "@balaio/ui";
import { NewsletterForm } from "./_components/newsletter-form";

const destaques = [
  {
    titulo: "Cesta de orgânicos",
    loja: "Sítio Boa Vista",
    preco: "R$ 89,90",
    selo: "Mais vendido",
  },
  { titulo: "Café especial 500g", loja: "Torra da Serra", preco: "R$ 42,00", selo: "-15%" },
  { titulo: "Mel silvestre 1kg", loja: "Apiário Flor", preco: "R$ 54,50", selo: "Novo" },
];

export default function HomePage() {
  return (
    <main className="container-page flex flex-col gap-12 py-12">
      <section className="flex flex-col items-start gap-5">
        <Badge variant="accent">
          <Leaf aria-hidden="true" /> Feito por quem faz
        </Badge>
        <Heading
          as="h1"
          size="6xl"
          weight="extrabold"
          className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl"
        >
          Tudo o que cabe no seu balaio
        </Heading>
        <Text size="lg" tone="muted" className="max-w-xl">
          Este é um marketplace de estudo. A página só existe para provar a integração do app com o
          design system <code>@balaio/ui</code>.
        </Text>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" leftIcon={<Icon icon={ShoppingBag} size="lg" />}>
            Começar a comprar
          </Button>
          <Button asChild size="lg" variant="outline" rightIcon={<Icon icon={ArrowRight} />}>
            <NextLink href="#destaques">Ver destaques</NextLink>
          </Button>
        </div>
      </section>

      <Separator />

      <section aria-labelledby="destaques" className="flex flex-col gap-6">
        <div className="flex items-end justify-between gap-4">
          <Heading as="h2" id="destaques" size="3xl">
            Destaques da semana
          </Heading>
          <Link asChild underline="hover" className="shrink-0">
            <NextLink href="#destaques">Ver todos</NextLink>
          </Link>
        </div>
        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {destaques.map((item) => (
            <li key={item.titulo}>
              <Card asChild className="flex h-full flex-col gap-3">
                <article aria-labelledby={`produto-${item.titulo}`}>
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant={item.selo.startsWith("-") ? "success" : "neutral"}>
                      {item.selo}
                    </Badge>
                    <Tooltip content="Salvar nos favoritos">
                      <IconButton
                        size="sm"
                        aria-label={`Favoritar ${item.titulo}`}
                        icon={<Icon icon={Heart} />}
                        className="-mt-2 -mr-2"
                      />
                    </Tooltip>
                  </div>
                  <Heading as="h3" size="xl" id={`produto-${item.titulo}`}>
                    {item.titulo}
                  </Heading>
                  <Text size="md" tone="subtle">
                    {item.loja}
                  </Text>
                  <Text size="xl" weight="bold" tone="success" numeric className="mt-auto">
                    {item.preco}
                  </Text>
                </article>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <Card tone="inverse" padding="lg" className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <Icon icon={Truck} size="xl" className="text-accent" />
          <Heading as="h2" size="3xl" tone="inverse">
            Receba as ofertas da feira
          </Heading>
          <Text tone="inverse-muted">
            Toda sexta, uma seleção do que chegou fresquinho nas lojas do Balaio.
          </Text>
        </div>
        <Card padding="md">
          <NewsletterForm />
        </Card>
      </Card>
    </main>
  );
}
