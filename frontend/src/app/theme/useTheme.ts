import { useCallback, useContext } from "react";
import { Theme, ThemeContext } from "./ThemeContext";

type UseThemeResult = {
  toggleTheme: () => void;
  theme: Theme;
};

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  if (!theme || !setTheme) {
    return {
      theme: Theme.LIGHT,
      toggleTheme: () => {},
    };
  }

  const toggleTheme = useCallback(() => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(newTheme);
  }, [setTheme, theme]);

  return { theme, toggleTheme };
}
