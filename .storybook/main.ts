import type { StorybookConfig } from "@storybook/react-vite";
import { fileURLToPath } from "node:url";
import { mergeConfig } from "vite";

/**
 * O Storybook usa o framework Vite puro (não o de Next.js) de propósito:
 * o design system não pode depender do Next, e é assim que ele rodaria
 * como pacote independente.
 *
 * As features do app importam `next/link`, que não funciona fora do Next
 * (quebra com "process is not defined"). Por isso ele é trocado por um
 * substituto simples em `.storybook/mocks/`.
 */
const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: [
    "../src/design-system/**/*.mdx",
    "../src/design-system/**/*.stories.@(ts|tsx)",
    "../src/features/**/*.stories.@(ts|tsx)",
  ],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  core: { disableTelemetry: true },
  viteFinal: async (viteConfig) => {
    viteConfig.resolve ??= {};
    // Lê o alias @balaio/ui (e os demais) direto do tsconfig.json.
    viteConfig.resolve.tsconfigPaths = true;
    return mergeConfig(viteConfig, {
      resolve: {
        alias: {
          "next/link": fileURLToPath(new URL("./mocks/next-link.tsx", import.meta.url)),
        },
      },
    });
  },
};

export default config;
