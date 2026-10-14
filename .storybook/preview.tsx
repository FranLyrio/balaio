import type { Preview } from "@storybook/react-vite";
import "@balaio/ui/styles.css";
import "./fonts.css";

const preview: Preview = {
  parameters: {
    layout: "padded",
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    backgrounds: {
      options: {
        page: { name: "Página", value: "#F3F5F4" },
        surface: { name: "Superfície", value: "#FFFFFF" },
        petroleo: { name: "Petróleo", value: "#0C4A55" },
      },
    },
    a11y: {
      // Violações aparecem como erro no painel de acessibilidade.
      test: "error",
    },
  },
  initialGlobals: {
    backgrounds: { value: "page" },
  },
};

export default preview;
