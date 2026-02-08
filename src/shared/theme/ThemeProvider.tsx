import React, {createContext, useContext} from 'react';
import {colors, radius, shadows, spacing, typography} from './tokens';

const theme = {colors, spacing, radius, typography, shadows};

type Theme = typeof theme;

const ThemeContext = createContext<Theme>(theme);

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);