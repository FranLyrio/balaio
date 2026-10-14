import { useSyncExternalStore } from "react";
import { contrastPairs, contrastRatio, minimumFor } from "../tokens/contrast-pairs";

/** Lê o valor atual de uma variável CSS (fonte única da verdade). */
function useCssVar(name: string) {
  return useSyncExternalStore(
    () => () => {},
    () => getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
    () => "",
  );
}

function toHex(value: string) {
  const m = value.match(/rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);
  if (!m) return value.toUpperCase();
  return `#${[m[1], m[2], m[3]].map((n) => Number(n).toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

function Swatch({ name, note }: { name: string; note?: string }) {
  const value = useCssVar(name);
  return (
    <div className="flex items-center gap-3">
      <span
        className="size-12 shrink-0 rounded-control border border-border"
        style={{ background: `var(${name})` }}
      />
      <span className="flex min-w-0 flex-col">
        <code className="truncate text-md font-semibold text-fg">{name}</code>
        <span className="text-sm text-fg-subtle">
          {toHex(value)}
          {note ? ` · ${note}` : null}
        </span>
      </span>
    </div>
  );
}

export function SwatchGrid({ items }: { items: (string | [string, string])[] }) {
  return (
    <div className="my-6 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
      {items.map((item) => {
        const [name, note] = Array.isArray(item) ? item : [item, undefined];
        return <Swatch key={name} name={name} note={note} />;
      })}
    </div>
  );
}

const typeScale = [
  ["text-6xl", "--text-6xl", "54px"],
  ["text-5xl", "--text-5xl", "44px"],
  ["text-4xl", "--text-4xl", "34px"],
  ["text-3xl", "--text-3xl", "28px"],
  ["text-2xl", "--text-2xl", "24px"],
  ["text-xl", "--text-xl", "20px"],
  ["text-lg", "--text-lg", "17px"],
  ["text-base", "--text-base", "15px (corpo)"],
  ["text-md", "--text-md", "14px"],
  ["text-sm", "--text-sm", "13px"],
  ["text-xs", "--text-xs", "12px"],
] as const;

function TypeRow({ cls, token, label }: { cls: string; token: string; label: string }) {
  const lh = useCssVar(`${token}--line-height`);
  const display = ["text-6xl", "text-5xl", "text-4xl", "text-3xl", "text-2xl"].includes(cls);
  return (
    <div className="grid grid-cols-[160px_1fr] items-baseline gap-4 border-b border-divider py-3">
      <span className="text-sm text-fg-subtle">
        <code className="font-semibold text-fg">{cls}</code>
        <br />
        {label} / {lh || "…"}
      </span>
      <span
        className={`${cls} ${display ? "font-display font-bold tracking-display-tight" : "font-sans"} truncate`}
      >
        Feira boa é feira cheia
      </span>
    </div>
  );
}

export function TypeScale() {
  return (
    <div className="my-6">
      {typeScale.map(([cls, token, label]) => (
        <TypeRow key={cls} cls={cls} token={token} label={label} />
      ))}
    </div>
  );
}

export function FontFamilies() {
  return (
    <div className="my-6 grid gap-4 sm:grid-cols-2">
      <div className="rounded-card border border-border bg-surface p-6">
        <p className="text-sm text-fg-subtle">Display · font-display · 600–800</p>
        <p className="font-display text-4xl font-extrabold tracking-display-tighter">Bricolage</p>
        <p className="font-display text-2xl font-semibold tracking-display">Aa Bb Cc 0123</p>
      </div>
      <div className="rounded-card border border-border bg-surface p-6">
        <p className="text-sm text-fg-subtle">Interface e texto · font-sans · 400–800</p>
        <p className="font-sans text-4xl font-bold">Figtree</p>
        <p className="font-sans text-2xl">Aa Bb Cc 0123</p>
        <p className="font-sans text-xl font-bold text-success tabular-nums">
          R$ 1.111,90 · tabular-nums
        </p>
      </div>
    </div>
  );
}

const spacing = [1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18];

export function SpacingScale() {
  return (
    <div className="my-6 flex flex-col gap-2">
      {spacing.map((step) => (
        <div key={step} className="grid grid-cols-[120px_1fr] items-center gap-4">
          <code className="text-md">
            {step} · {step * 4}px
          </code>
          <span className="h-4 rounded-tag bg-primary" style={{ width: step * 4 }} />
        </div>
      ))}
    </div>
  );
}

const radii = [
  ["rounded-tag", "6px · tags e badges"],
  ["rounded-control", "12px · botões e campos"],
  ["rounded-card", "18px · cards"],
  ["rounded-panel", "24px · painéis, dialog, sheet"],
  ["rounded-full", "pílulas, avatares, chips"],
] as const;

export function RadiusScale() {
  return (
    <div className="my-6 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
      {radii.map(([cls, label]) => (
        <div key={cls} className="flex flex-col gap-2">
          <span className={`${cls} h-20 border-strong border-primary bg-primary-subtle`} />
          <code className="text-md font-semibold">{cls}</code>
          <span className="text-sm text-fg-subtle">{label}</span>
        </div>
      ))}
    </div>
  );
}

const controls = [
  ["h-control-sm", "36px · sm"],
  ["h-control-md", "44px · md (padrão e alvo de toque)"],
  ["h-control-lg", "52px · lg"],
] as const;

export function ControlHeights() {
  return (
    <div className="my-6 flex flex-wrap items-end gap-4">
      {controls.map(([cls, label]) => (
        <div key={cls} className="flex flex-col gap-2">
          <span
            className={`${cls} flex w-40 items-center justify-center rounded-control bg-primary text-md font-semibold text-primary-fg`}
          >
            {cls}
          </span>
          <span className="text-sm text-fg-subtle">{label}</span>
        </div>
      ))}
    </div>
  );
}

function PairRow({ pair }: { pair: (typeof contrastPairs)[number] }) {
  const fg = useCssVar(pair.fg);
  const bg = useCssVar(pair.bg);
  const ratio = fg && bg ? contrastRatio(fg, bg) : 0;
  const min = minimumFor(pair);
  const ok = ratio >= min;
  return (
    <tr className="border-b border-divider">
      <td className="py-2 pr-4">
        <span
          className="inline-flex h-10 min-w-28 items-center justify-center rounded-control border border-border px-3 font-semibold"
          style={{ color: `var(${pair.fg})`, background: `var(${pair.bg})` }}
        >
          {pair.large ? "■ ◯ ✓" : "Aa Texto"}
        </span>
      </td>
      <td className="py-2 pr-4 text-md">{pair.usage}</td>
      <td className="py-2 pr-4 text-sm">
        <code>{pair.fg}</code>
        <br />
        <code>{pair.bg}</code>
      </td>
      <td className="py-2 pr-4 text-md font-semibold tabular-nums">
        {ratio ? ratio.toFixed(2) : "…"}:1
      </td>
      <td className={`py-2 text-md font-semibold ${ok ? "text-success" : "text-danger"}`}>
        {ok ? "Passa" : "Falha"} (mín. {min}:1)
      </td>
    </tr>
  );
}

export function ContrastTable() {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-border text-sm text-fg-subtle">
            <th className="py-2 pr-4 font-semibold">Amostra</th>
            <th className="py-2 pr-4 font-semibold">Uso</th>
            <th className="py-2 pr-4 font-semibold">Tokens</th>
            <th className="py-2 pr-4 font-semibold">Contraste</th>
            <th className="py-2 font-semibold">WCAG AA</th>
          </tr>
        </thead>
        <tbody>
          {contrastPairs.map((pair) => (
            <PairRow key={`${pair.fg}-${pair.bg}`} pair={pair} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
