import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import storybook from "eslint-plugin-storybook";

const DS = "src/design-system/**/*.{ts,tsx}";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  ...storybook.configs["flat/recommended"],
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "storybook-static/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },

  // O design system é uma biblioteca: não conhece o app nem o Next.js.
  {
    files: [DS],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["next", "next/*"],
              message:
                "O design system não pode depender do Next.js. Use o padrão asChild para links e imagens.",
            },
            {
              group: ["@/*", "**/app/*", "**/app"],
              message: "O design system não pode importar nada do app.",
            },
            {
              group: ["@balaio/ui", "@balaio/ui/*"],
              message: "Dentro do design system use imports relativos, não o alias público.",
            },
          ],
        },
      ],
    },
  },

  // Componentes usam só tokens semânticos: nada de hex nem classes da paleta.
  {
    files: ["src/design-system/components/**/*.tsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/#[0-9a-fA-F]{3,8}\\b/]",
          message: "Não use cores em hex nos componentes. Use um token semântico.",
        },
        {
          selector: "TemplateElement[value.raw=/#[0-9a-fA-F]{3,8}\\b/]",
          message: "Não use cores em hex nos componentes. Use um token semântico.",
        },
        {
          selector:
            "Literal[value=/\\b(petroleo|limao|neutro|tinta|verde|vermelho|ambar)-\\d+|-branco\\b/]",
          message: "Componentes usam só tokens semânticos, nunca a paleta direta.",
        },
        {
          selector:
            "TemplateElement[value.raw=/\\b(petroleo|limao|neutro|tinta|verde|vermelho|ambar)-\\d+|-branco\\b/]",
          message: "Componentes usam só tokens semânticos, nunca a paleta direta.",
        },
      ],
    },
  },

  // O app consome o design system só pela API pública.
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: [DS],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/design-system",
                "@/design-system/*",
                "**/design-system",
                "**/design-system/*",
              ],
              message: "Importe o design system só por '@balaio/ui'.",
            },
          ],
        },
      ],
    },
  },

  prettier,
]);
