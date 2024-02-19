import React, {ReactNode, useState} from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { themeCreator } from './base';
import {StylesProvider} from '@mui/styles';

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);

interface ThemeProviderProps {
  children: ReactNode;
}
const ThemeProviderWrapper: React.FC<ThemeProviderProps> = ({ children }: ThemeProviderProps) => {
  const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  };

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
