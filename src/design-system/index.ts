/**
 * API pública do design system Balaio.
 * O app importa tudo por `@balaio/ui`. Nada fora desta lista é público.
 * Os estilos entram separadamente: `import "@balaio/ui/styles.css"`.
 */

// Utilitários
export { cn } from "./lib/cn";

// Tipografia
export * from "./components/heading";
export * from "./components/text";

// Ações
export * from "./components/button";
export * from "./components/link";

// Formulário
export * from "./components/field";
export * from "./components/input";
export * from "./components/textarea";
export * from "./components/select";
export * from "./components/checkbox";
export * from "./components/radio-group";
export * from "./components/switch";

// Exibição
export * from "./components/badge";
export * from "./components/chip";
export * from "./components/card";
export * from "./components/avatar";
export * from "./components/separator";
export * from "./components/skeleton";
export * from "./components/spinner";
export * from "./components/visually-hidden";
export * from "./components/icon";

// Sobreposição
export * from "./components/dialog";
export * from "./components/sheet";
export * from "./components/popover";
export * from "./components/tooltip";
export * from "./components/tabs";
export * from "./components/toast";
