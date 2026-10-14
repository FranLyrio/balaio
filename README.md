# Balaio

Marketplace de estudo em Next.js com um design system próprio, o **`@balaio/ui`**, que vive
dentro do projeto mas foi pensado para virar uma biblioteca publicada.

Este repositório é só a base: tokens, componentes reutilizáveis, Storybook, testes e CI. As
telas e os componentes de feature (ProductCard, Header, SearchBar, Price, Rating…) entram depois,
construídos com o design system.

## Stack

| Área           | Ferramenta                                                         |
| -------------- | ------------------------------------------------------------------ |
| App            | Next.js 16 (App Router, Turbopack), React 19, TypeScript 6 strict  |
| Estilo         | Tailwind CSS v4 (tokens em `@theme`), cva, tailwind-merge, clsx    |
| Acessibilidade | Radix UI só em Dialog, Sheet, Popover, Tooltip, Tabs e Toast       |
| Ícones         | lucide-react                                                       |
| Testes         | Vitest 5, Testing Library, jsdom, axe-core                         |
| Documentação   | Storybook 10 (`@storybook/react-vite`) com addon de acessibilidade |
| Qualidade      | ESLint 9, Prettier, GitHub Actions                                 |
| Gerenciador    | pnpm 12                                                            |

## Como rodar

Requisitos: **Node 22.12+** e **pnpm** (`corepack enable pnpm` instala a versão do
`packageManager`).

```bash
pnpm install
```

```bash
pnpm dev
```

Abra http://localhost:3000. Para o Storybook:

```bash
pnpm storybook
```

Abra http://localhost:6006.

### Scripts

| Script                 | O que faz                                          |
| ---------------------- | -------------------------------------------------- |
| `pnpm dev`             | Servidor de desenvolvimento do Next.js             |
| `pnpm build`           | Build de produção do app                           |
| `pnpm start`           | Sobe o build de produção                           |
| `pnpm lint`            | ESLint em todo o projeto                           |
| `pnpm typecheck`       | `tsc --noEmit`                                     |
| `pnpm test`            | Testes (Vitest) uma vez; `pnpm test:watch` assiste |
| `pnpm format`          | Formata com Prettier (`format:check` só confere)   |
| `pnpm storybook`       | Storybook em modo dev                              |
| `pnpm build-storybook` | Storybook estático em `storybook-static/`          |

O CI (`.github/workflows/ci.yml`) roda `format:check`, `lint`, `typecheck` e `test` a cada push.

## Estrutura

```
.storybook/              config do Storybook (alias @balaio/ui, fontes próprias)
src/
  app/                   app Next.js (layout, página inicial, next/font)
  design-system/         o @balaio/ui
    index.ts             API pública — tudo que o app pode usar
    styles/
      styles.css         ponto de entrada de CSS (importa Tailwind + tokens)
      base.css           utilitários próprios (focus-ring, container-page, z-*) e base
      tokens/
        palette.css      camada 1: paleta
        semantic.css     camada 2: tokens semânticos (+ estrutura do tema escuro)
        foundation.css   tipografia, espaçamento, raios, sombra, movimento, camadas
    tokens/              pares de contraste + teste que lê o CSS
    lib/                 cn, controlVariants, useComposedRefs
    test/                setup do Vitest e matcher toHaveNoAxeViolations
    docs/                páginas de docs do Storybook (tokens, contraste)
    components/<nome>/   <nome>.tsx, <nome>.test.tsx, <nome>.stories.tsx, index.ts
```

## Arquitetura do design system

### Fronteira com o app

- O app importa **só** por `@balaio/ui` (componentes) e `@balaio/ui/styles.css` (estilos).
  O alias está em `tsconfig.json` (`paths`); o Storybook e o Vitest leem o mesmo tsconfig.
- O design system **não importa nada** do app nem do Next.js. Links e imagens do framework
  entram pelo padrão `asChild`:

  ```tsx
  import NextLink from "next/link";
  import { Button, Link } from "@balaio/ui";

  <Link asChild><NextLink href="/ajuda">Ajuda</NextLink></Link>
  <Button asChild variant="outline"><NextLink href="/ofertas">Ver ofertas</NextLink></Button>
  ```

- Essas regras são garantidas pelo ESLint (`eslint.config.mjs`):
  - em `src/design-system/**`: proibido importar `next`, `next/*`, `@/*` (o app) e o próprio
    `@balaio/ui`;
  - no resto de `src/`: proibido importar `@/design-system/*` por caminho;
  - em `src/design-system/components/**`: proibido usar cor em hex ou classes da paleta
    (`bg-petroleo-700`…). Componentes usam só tokens semânticos.

### Tokens

Fonte única da verdade em CSS, no `@theme` do Tailwind v4, em duas camadas:

1. **Paleta** (`palette.css`) — `--color-petroleo-700`, `--color-limao-500`… Gera classes,
   mas componentes não podem usá-las.
2. **Semânticos** (`semantic.css`) — valores em variáveis `--ui-*` no `:root`, mapeadas com
   `@theme inline` para `bg-page`, `bg-surface`, `text-fg`, `text-fg-muted`, `border-border`,
   `border-border-control`, `bg-primary`, `bg-accent`, `text-success`, `text-danger`…

Com `@theme inline`, a classe aponta para a variável viva. Para criar o tema escuro basta
preencher o bloco `[data-theme="dark"]` em `semantic.css` com as mesmas `--ui-*` e aplicar
`data-theme="dark"` no `<html>`. Nenhum componente muda.

Outros tokens: escala de texto (`text-xs` 12 … `text-base` 15 … `text-6xl` 54, cada uma com
line-height), `tracking-display*`, espaçamento base 4px, `h-control-sm/md/lg` (36/44/52),
`rounded-tag/control/card/panel`, `shadow-overlay`, `z-sticky … z-tooltip`, `--duration-*`,
`ease-standard`, `container-page`, `border-strong` (1.5px) e o anel de foco (`focus-ring`, também
aplicado globalmente em `:focus-visible`).

A página **Fundamentos → Tokens** do Storybook mostra tudo com os valores lidos ao vivo, e
**Fundamentos → Contraste** lista os pares de texto/fundo com a razão calculada.

### Fontes

Os componentes usam `var(--font-sans)` (Figtree) e `var(--font-display)` (Bricolage
Grotesque). Quem consome o design system define essas variáveis:

- o app, com `next/font` em `src/app/fonts.ts`;
- o Storybook, com `@fontsource-variable` em `.storybook/fonts.css`.

### Server e Client Components

Componentes sem interatividade funcionam como Server Components: Heading, Text, Link, Badge,
Card, Avatar, Separator, Skeleton, Spinner, VisuallyHidden e Icon. Os interativos começam com
`"use client"`: Button/IconButton, Field e controles de formulário, Chip, Dialog, Sheet,
Popover, Tooltip, Tabs e Toast.

### Acessibilidade

- Foco visível em todo elemento interativo (2px em tinta + halo de 4px em limão).
- Alvo de toque de 44px no tamanho `md` (botões, campos, chips, abas; checkbox, radio e switch
  ampliam a área clicável).
- `Field` liga label, dica e erro por ids, `aria-describedby` e `aria-invalid`.
  `useFieldControl()` deixa controles próprios fazerem o mesmo.
- `IconButton` exige `aria-label` no tipo.
- Cada componente tem teste com axe (`toHaveNoAxeViolations`). O jsdom não calcula cores, então
  o contraste é coberto por `tokens/contrast.test.ts` (que lê o CSS) e pelo addon a11y do
  Storybook.
- `prefers-reduced-motion` desliga animações e transições.

## Como criar um componente novo

1. Crie a pasta `src/design-system/components/<nome>/` com:
   - `<nome>.tsx` — o componente;
   - `<nome>.test.tsx` — comportamento + `await expect(container).toHaveNoAxeViolations()`;
   - `<nome>.stories.tsx` — todas as variantes e estados;
   - `index.ts` — reexporta o componente, as variantes e os tipos.
2. No componente:
   - props estendem as do elemento nativo (`ComponentProps<"button">`…);
   - a ref chega pela prop `ref` (React 19, sem `forwardRef`) e vai para o elemento nativo;
   - variantes com `cva` e classes combinadas com `cn()`;
   - só tokens semânticos (o lint barra hex e paleta);
   - `"use client"` apenas se tiver estado, efeitos, contexto ou handlers;
   - nada de `next/*` nem imports do app; para integrar com o framework, ofereça `asChild`.
3. Exporte em `src/design-system/index.ts`.
4. Rode `pnpm lint && pnpm typecheck && pnpm test` e confira a aba **Accessibility** no
   Storybook.

Componentes de feature (ProductCard, Header, Price…) **não** vão para o design system: ficam no
app (ex.: `src/app/_components` ou `src/features`) e são montados com o `@balaio/ui`.

## Como ele viraria um pacote

A estrutura já está pronta para a extração; os imports do app não mudam.

1. Mover `src/design-system/` para `packages/ui/src/` e criar um workspace do pnpm
   (`pnpm-workspace.yaml` com `packages/*`).
2. Criar `packages/ui/package.json` com `"name": "@balaio/ui"`, `exports` para `.` (JS + tipos)
   e `./styles.css`, `peerDependencies` de `react` e `react-dom`, e as dependências de runtime
   (Radix, cva, clsx, tailwind-merge, lucide-react).
3. Fazer o build com `tsup` ou `tsc` preservando as diretivas `"use client"` por arquivo (um
   arquivo por componente, sem juntar tudo num bundle).
4. No app, remover os `paths` de `@balaio/ui` do `tsconfig.json` e instalar
   `"@balaio/ui": "workspace:*"` (ou a versão publicada).
5. Como o CSS do pacote traz `@source "../"`, o Tailwind do app continua gerando as classes
   usadas pelos componentes.
6. Levar o Storybook junto para `packages/ui` (ele já não depende do Next).
