/** @type {import("prettier").Config} */
const config = {
  printWidth: 100,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/design-system/styles/styles.css",
  tailwindFunctions: ["cva", "cn"],
};

export default config;
