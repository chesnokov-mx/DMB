import { FC, useState } from "react";
import { Theme, ThemeContext } from "./ThemeContext";

export type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(Theme.LIGHT);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
