export type ThemeType = "light" | "dark" | "brand";

export const themes = {
  light: {
    background: "#FFFFFF",
    text: "#111111",
    card: "#FFFFFF",
    border: "#E5E5E5",
    primary: "#111111",
  },

  dark: {
    background: "#0E0E0E",
    text: "#FFFFFF",
    card: "#1A1A1A",
    border: "#2A2A2A",
    primary: "#FFFFFF",
  },

  brand: {
    background: "#F4F7FF",
    text: "#0F172A",
    card: "#FFFFFF",
    border: "#D0D7FF",
    primary: "#4F46E5", // 🔥 Indigo brand
  },
};
