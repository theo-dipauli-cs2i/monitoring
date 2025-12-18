import { createContext } from 'preact';

export interface ThemeContextType {
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  secondaryColor: string;
  setSecondaryColor: (color: string) => void;
  menuItemsVisibility: Record<string, boolean>;
  setMenuItemsVisibility: (items: Record<string, boolean>) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
