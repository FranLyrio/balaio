import { Icon, IconButton, Input } from "@balaio/ui";
import { Search } from "lucide-react";

export function SearchForm() {
  const formSize = "md";

  return (
    <form
      role="search"
      action="/busca"
      className="flex min-w-0 flex-1 overflow-hidden rounded-control"
    >
      <Input
        className="rounded-none border-0"
        placeholder="Descreva o que você procura: tênis de corrida até R$ 300"
        aria-label="Buscar no Balaio"
        size={formSize}
        type="search"
        name="q"
      />
      <IconButton
        aria-label="Buscar"
        variant="accent"
        icon={<Icon icon={Search} size={formSize} className="rounded-none" />}
        className="rounded-none"
        type="submit"
        size={formSize}
      />
    </form>
  );
}
