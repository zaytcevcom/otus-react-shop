import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useInsertionEffect,
  useState,
  useMemo,
} from 'react';
import { Theme } from './types';

export type ThemeProviderProps = {
  children: React.ReactNode;
};

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const useThemeContext = (): ThemeContextType => useContext(ThemeContext);

const KEY = 'theme';

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(KEY) as Theme) || Theme.light
  );

  useInsertionEffect(() => {
    localStorage.setItem(KEY, theme);
    const html = document.body.parentElement as HTMLElement;
    html.classList.add(theme);

    return () => html.classList.remove(theme);
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((v) => (v === Theme.light ? Theme.dark : Theme.light)),
    []
  );

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme }),
    [theme, toggleTheme, setTheme]
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
