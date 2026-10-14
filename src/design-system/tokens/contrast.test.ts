import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { contrastPairs, contrastRatio, minimumFor } from "./contrast-pairs";

/** Lê as variáveis direto dos arquivos CSS, que são a fonte única da verdade. */
function readTokens() {
  const dir = join(__dirname, "../styles/tokens");
  const css = ["palette.css", "semantic.css"]
    .map((f) => readFileSync(join(dir, f), "utf8"))
    .join("\n")
    // ignora o bloco do tema escuro (ainda vazio)
    .replace(/\[data-theme="dark"\]\s*\{[^}]*\}/g, "");
  const vars = new Map<string, string>();
  for (const [, name, value] of css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    if (!vars.has(name!)) vars.set(name!, value!.trim());
  }
  const resolve = (name: string, depth = 0): string => {
    const value = vars.get(name);
    if (!value) throw new Error(`Token não encontrado: ${name}`);
    const ref = value.match(/^var\((--[\w-]+)\)$/);
    if (ref && depth < 10) return resolve(ref[1]!, depth + 1);
    return value;
  };
  return resolve;
}

describe("contraste dos tokens", () => {
  const resolve = readTokens();

  it.each(contrastPairs)("$usage ($fg sobre $bg)", (pair) => {
    const ratio = contrastRatio(resolve(pair.fg), resolve(pair.bg));
    expect(ratio).toBeGreaterThanOrEqual(minimumFor(pair));
  });

  it("limão nunca passa como texto sobre fundo claro", () => {
    expect(contrastRatio(resolve("--ui-accent"), resolve("--ui-surface"))).toBeLessThan(4.5);
  });
});
