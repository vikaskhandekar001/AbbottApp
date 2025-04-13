import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {lightColors, darkColors, Theme} from '../../theme/colors'; // Import colors from the colors file

// Defining the type for the theme

const ThemeContext = createContext<
  | {
      theme: Theme;
      toggleTheme: () => void;
    }
  | undefined
>(undefined);

// ThemeProvider component that wraps around the app
const loadTheme = async (): Promise<Theme> => {
  const storedTheme = await AsyncStorage.getItem('theme');
  return storedTheme ? JSON.parse(storedTheme) : lightColors;
};

const saveTheme = async (theme: Theme) => {
  await AsyncStorage.setItem('theme', JSON.stringify(theme));
};

export const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [theme, setTheme] = useState<Theme>(lightColors);

  useEffect(() => {
    const fetchStoredTheme = async () => {
      const storedTheme = await loadTheme();
      setTheme(storedTheme);
    };
    fetchStoredTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === lightColors ? darkColors : lightColors;
    setTheme(newTheme);
    await saveTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = (): {theme: Theme; toggleTheme: () => void} => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
