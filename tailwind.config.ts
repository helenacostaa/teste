import type { Config } from "tailwindcss";

// Tokens do 🕹️ Lucky | Design System (ShadCN) — valores vindos das variáveis do Figma.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Axiforma", "ui-sans-serif", "system-ui", "-apple-system", "\"Segoe UI\"", "Roboto", "Arial", "sans-serif"] },
      colors: {
        background: "var(--base-background)",
        foreground: "var(--base-foreground)",
        card: "var(--base-card)",
        border: "var(--base-border)",
        input: "var(--base-input)",
        muted: { DEFAULT: "var(--base-muted)", foreground: "var(--base-muted-foreground)" },
        primary: { DEFAULT: "var(--base-primary)", foreground: "var(--base-primary-foreground)" },
        secondary: "var(--base-secondary)",
        accent: "var(--base-accent)",
        ring: "var(--base-ring)",
        sidebar: { DEFAULT: "var(--base-sidebar-background)", foreground: "var(--base-sidebar-foreground)", border: "var(--base-sidebar-border)" },
        destructive40: "var(--custom-destructive-40)",
        neutral200: "var(--neutral-200)",
      },
      spacing: { "0-5": "2px", "1-5": "6px", "2-5": "10px" },
      borderRadius: { lg: "10px", md: "8px", "3xl": "24px" },
      boxShadow: {
        xs: "0px 1px 2px 0px rgba(0,0,0,0.05)",
        "inset-sm": "inset 0px 2px 4px 0px rgba(0,0,0,0.05)",
        focus: "0px 0px 0px 3px var(--custom-outline)",
        md: "0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
