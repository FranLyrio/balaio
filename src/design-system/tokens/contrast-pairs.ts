/**
 * Pares de texto/fundo documentados. Os valores vêm sempre das variáveis
 * CSS (fonte única da verdade); aqui ficam só os nomes e o uso.
 * Usado pelo teste de contraste e pela página de docs do Storybook.
 */
export type ContrastPair = {
  fg: `--ui-${string}`;
  bg: `--ui-${string}`;
  usage: string;
  /** Texto grande (≥ 24px) ou elemento gráfico: mínimo 3:1 em vez de 4.5:1. */
  large?: boolean;
};

export const contrastPairs: ContrastPair[] = [
  { fg: "--ui-fg", bg: "--ui-page", usage: "Texto principal sobre o fundo da página" },
  { fg: "--ui-fg", bg: "--ui-surface", usage: "Texto principal sobre superfície" },
  { fg: "--ui-fg-muted", bg: "--ui-surface", usage: "Texto secundário sobre superfície" },
  { fg: "--ui-fg-muted", bg: "--ui-page", usage: "Texto secundário sobre a página" },
  { fg: "--ui-fg-subtle", bg: "--ui-surface", usage: "Texto de apoio sobre superfície" },
  { fg: "--ui-fg-subtle", bg: "--ui-page", usage: "Texto de apoio sobre a página" },
  { fg: "--ui-fg", bg: "--ui-surface-subtle", usage: "Texto sobre superfície petróleo clara" },
  { fg: "--ui-primary-fg", bg: "--ui-primary", usage: "Botão primário" },
  { fg: "--ui-primary-fg", bg: "--ui-primary-hover", usage: "Botão primário (hover)" },
  {
    fg: "--ui-fg-inverse-muted",
    bg: "--ui-surface-inverse",
    usage: "Texto de apoio sobre petróleo",
  },
  { fg: "--ui-primary", bg: "--ui-surface", usage: "Link e botão outline/ghost" },
  { fg: "--ui-primary", bg: "--ui-primary-subtle", usage: "Chip selecionado" },
  { fg: "--ui-accent-fg", bg: "--ui-accent", usage: "Botão e badge de destaque (limão)" },
  { fg: "--ui-accent-fg", bg: "--ui-accent-hover", usage: "Botão de destaque (hover)" },
  { fg: "--ui-accent-fg", bg: "--ui-accent-subtle", usage: "Texto sobre limão claro" },
  { fg: "--ui-success", bg: "--ui-surface", usage: "Preço, parcela e desconto" },
  { fg: "--ui-success", bg: "--ui-page", usage: "Preço sobre a página" },
  { fg: "--ui-success", bg: "--ui-success-subtle", usage: "Badge de sucesso" },
  { fg: "--ui-danger", bg: "--ui-surface", usage: "Mensagem de erro" },
  { fg: "--ui-danger", bg: "--ui-danger-subtle", usage: "Badge de perigo" },
  { fg: "--ui-danger-fg", bg: "--ui-danger", usage: "Botão destrutivo" },
  {
    fg: "--ui-border-control",
    bg: "--ui-surface",
    usage: "Contorno de campos e controles (elemento gráfico)",
    large: true,
  },
  {
    fg: "--ui-border-control",
    bg: "--ui-page",
    usage: "Contorno de campos sobre a página (elemento gráfico)",
    large: true,
  },
  {
    fg: "--ui-focus-ring",
    bg: "--ui-surface",
    usage: "Anel de foco (elemento gráfico)",
    large: true,
  },
];

/* Cálculo de contraste segundo a WCAG 2.x */
function channel(c: number) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

export function parseHex(hex: string): [number, number, number] {
  const h = hex.trim().replace("#", "");
  const full = h.length === 3 ? [...h].map((c) => c + c).join("") : h;
  const n = Number.parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function parseColor(value: string): [number, number, number] {
  const v = value.trim();
  if (v.startsWith("#")) return parseHex(v);
  const m = v.match(/rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);
  if (m) return [Number(m[1]), Number(m[2]), Number(m[3])];
  throw new Error(`Cor não suportada: ${value}`);
}

export function luminance([r, g, b]: [number, number, number]) {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(a: string, b: string) {
  const la = luminance(parseColor(a));
  const lb = luminance(parseColor(b));
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

export function minimumFor(pair: ContrastPair) {
  return pair.large ? 3 : 4.5;
}
