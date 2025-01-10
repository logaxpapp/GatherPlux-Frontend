import type { Config } from "tailwindcss";
import aspectRatio from "@tailwindcss/aspect-ratio"; // Import the aspect-ratio plugin
import scrollbarHide from "tailwind-scrollbar-hide";  


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Include files in the pages directory
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Include files in the components directory
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Include files in the app directory
  ],
  theme: {
    extend: {
      colors: {
        black: "#000", // Explicit black color definition
        background: "var(--background)", // Use CSS variables for theming
        foreground: "var(--foreground)", // Use CSS variables for theming
        primary: {
          DEFAULT: "#89E101", // Default primary color
          500: "#89E101", // Specific shade for primary
        },
      },
      fontFamily: {
        menseal: ["Menseal", "sans-serif"], // Primary typeface
        inter: ["Inter", "sans-serif"], // Secondary typeface for body and sub-headline
        jakarta: ["Plus Jakarta Sans", "sans-serif"], // Supporting typeface
      },
      fontSize: {
        headline: "64px", // Font size for Headline
        subheadline: "36px", // Font size for Sub-Headline
        body: "24px", // Font size for Body text
      },
    },
  },
  plugins: [
    scrollbarHide, // Use the imported scrollbar-hide plugin
    aspectRatio, // Use the imported aspect-ratio plugin
  ],
};

export default config;
