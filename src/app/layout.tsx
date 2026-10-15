import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ToastProvider, TooltipProvider } from "@balaio/ui";
import "@balaio/ui/styles.css";
import { fontDisplay, fontSans } from "./fonts";

export const metadata: Metadata = {
  title: { default: "Balaio", template: "%s · Balaio" },
  description: "Marketplace de estudo: produtos de quem faz, direto pra sua casa.",
};

export const viewport: Viewport = {
  themeColor: "#0C4A55",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fontSans.variable} ${fontDisplay.variable}`}>
      <body className="min-h-dvh font-sans">
        <TooltipProvider>
          <ToastProvider>
            <header>header</header>
            {children}
          </ToastProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
