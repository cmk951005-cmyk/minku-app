import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeColor = 'pink' | 'blue';

interface ThemeCtx {
  theme: ThemeColor;
  setTheme: (t: ThemeColor) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: 'pink', setTheme: () => {}, toggleTheme: () => {},
});

const THEMES: Record<ThemeColor, Record<string, string>> = {
  pink: {
    '--accent': '#e91e8c',
    '--accent-dark': '#c91670',
    '--accent-light': '#f5b3d4',
    '--accent-bg': '#fff0f6',
    '--accent-shadow': 'rgba(233, 30, 140, 0.15)',
    '--splash-grad': 'linear-gradient(135deg, #e91e8c 0%, #d91e6b 100%)',
    '--bg-grad': 'linear-gradient(135deg, #fff0f6 0%, #fff 100%)',
  },
  blue: {
    '--accent': '#3b82f6',
    '--accent-dark': '#2563eb',
    '--accent-light': '#93c5fd',
    '--accent-bg': '#eff6ff',
    '--accent-shadow': 'rgba(59, 130, 246, 0.15)',
    '--splash-grad': 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    '--bg-grad': 'linear-gradient(135deg, #dbeafe 0%, #e0ecff 100%)',
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeColor>(() => {
    try { return (localStorage.getItem('miku-theme') as ThemeColor) || 'pink'; }
    catch { return 'pink'; }
  });

  useEffect(() => {
    const vars = THEMES[theme];
    const root = document.documentElement;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    document.body.style.background = vars['--bg-grad'];
    try { localStorage.setItem('miku-theme', theme); } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'pink' ? 'blue' : 'pink');

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
