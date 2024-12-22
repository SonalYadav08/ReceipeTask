// ThemeContext.tsx
import React, {createContext, useState, useEffect, ReactNode} from 'react';
import {Appearance} from 'react-native';
import {lightTheme, darkTheme} from '../lib/theme';

// Define the context type
interface ThemeContextType {
  theme: typeof lightTheme;
  toggleTheme: () => void;
}

// Provide a default value
const defaultContext: ThemeContextType = {
  theme: lightTheme, // Default to light theme
  toggleTheme: () => {},
};

// Create the context with a default value
export const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const systemTheme = Appearance.getColorScheme(); // 'light' or 'dark'
  const [theme, setTheme] = useState(
    systemTheme === 'dark' ? darkTheme : lightTheme,
  );

  useEffect(() => {
    const listener = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
    });
    return () => listener.remove();
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
