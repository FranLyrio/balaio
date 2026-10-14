import { Bricolage_Grotesque, Figtree } from "next/font/google";

/**
 * O app carrega as fontes com next/font e as entrega ao design system pelas
 * variáveis CSS --font-sans e --font-display. O design system não conhece o Next.
 */
export const fontSans = Figtree({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-sans",
  display: "swap",
});

export const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-display",
  display: "swap",
});
