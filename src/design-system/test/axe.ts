import axe, { type Result, type RunOptions } from "axe-core";
import { expect } from "vitest";

/**
 * O jsdom não calcula layout nem cores, então a regra de contraste fica
 * desligada aqui. O contraste é garantido pelo teste de tokens
 * (contrast.test.ts) e pelo addon de acessibilidade do Storybook.
 */
const defaultOptions: RunOptions = {
  rules: {
    "color-contrast": { enabled: false },
    region: { enabled: false },
  },
};

function formatViolations(violations: Result[]) {
  return violations
    .map(
      (v) =>
        `• ${v.id} (${v.impact}): ${v.help}\n${v.nodes.map((n) => `    ${n.html}`).join("\n")}`,
    )
    .join("\n\n");
}

expect.extend({
  async toHaveNoAxeViolations(received: Element, options?: RunOptions) {
    const results = await axe.run(received, { ...defaultOptions, ...options });
    const pass = results.violations.length === 0;
    return {
      pass,
      message: () =>
        pass
          ? "Esperava violações de acessibilidade, mas não houve nenhuma."
          : `Violações de acessibilidade encontradas:\n\n${formatViolations(results.violations)}`,
    };
  },
});

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Matchers<R extends void | Promise<void> = void | Promise<void>, T = unknown> {
    toHaveNoAxeViolations(options?: RunOptions): Promise<void>;
  }
}
