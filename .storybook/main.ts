import type { StorybookConfig } from "@storybook/react-vite";

/**
 * O Storybook usa o framework Vite puro (não o de Next.js) de propósito:
 * o design system não pode depender do Next, e é assim que ele rodaria
 * como pacote independente.
 */
const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../src/design-system/**/*.mdx", "../src/design-system/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  core: { disableTelemetry: true },
  viteFinal: async (viteConfig) => {
    viteConfig.resolve ??= {};
    // Lê o alias @balaio/ui (e os demais) direto do tsconfig.json.
    viteConfig.resolve.tsconfigPaths = true;
    return viteConfig;
  },
};

export default config;
