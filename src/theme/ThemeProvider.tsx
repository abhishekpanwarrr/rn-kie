import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { themes, ThemeType } from "./themes";

type ThemeContextType = {
  theme: ThemeType;
  colors: typeof themes.light;
  setTheme: (t: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<ThemeType>("light");

  useEffect(() => {
    SecureStore.getItemAsync("theme").then((saved) => {
      if (saved) setThemeState(saved as ThemeType);
    });
  }, []);

  const setTheme = async (t: ThemeType) => {
    setThemeState(t);
    await SecureStore.setItemAsync("theme", t);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors: themes[theme],
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
