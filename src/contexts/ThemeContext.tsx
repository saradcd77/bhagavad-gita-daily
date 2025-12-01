import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode } from '../types';

interface ThemeColors {
  background: string;
  surface: string;
  cardBackground: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  sanskrit: string;
}

interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  isTempleMode: boolean;
}

const themes: Record<ThemeMode, ThemeColors> = {
  light: {
    background: '#FDF8F3',
    surface: '#FFFFFF',
    cardBackground: '#FEF9F3',
    primary: '#1A365D',
    secondary: '#C9A227',
    accent: '#D4AF37',
    text: '#1A202C',
    textSecondary: '#4A5568',
    textMuted: '#718096',
    border: '#E2D5C3',
    sanskrit: '#8B4513',
  },
  dark: {
    background: '#1A1A2E',
    surface: '#16213E',
    cardBackground: '#1F2937',
    primary: '#E2D5C3',
    secondary: '#D4AF37',
    accent: '#C9A227',
    text: '#F7FAFC',
    textSecondary: '#CBD5E0',
    textMuted: '#A0AEC0',
    border: '#374151',
    sanskrit: '#D4AF37',
  },
  temple: {
    background: '#2D1B0E',
    surface: '#3D2817',
    cardBackground: '#4A3423',
    primary: '#F5DEB3',
    secondary: '#FFD700',
    accent: '#DAA520',
    text: '#FFF8DC',
    textSecondary: '#DEB887',
    textMuted: '#D2B48C',
    border: '#5D4037',
    sanskrit: '#FFD700',
  },
};

interface ThemeContextType {
  theme: Theme;
  setThemeMode: (mode: ThemeMode) => void;
  dailyNotification: boolean;
  setDailyNotification: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('light');
  const [dailyNotification, setDailyNotificationState] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('themeMode');
      const savedNotification = await AsyncStorage.getItem('dailyNotification');
      
      if (savedTheme) setThemeModeState(savedTheme as ThemeMode);
      if (savedNotification !== null) setDailyNotificationState(savedNotification === 'true');
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    await AsyncStorage.setItem('themeMode', mode);
  };

  const setDailyNotification = async (enabled: boolean) => {
    setDailyNotificationState(enabled);
    await AsyncStorage.setItem('dailyNotification', String(enabled));
  };

  const theme: Theme = {
    mode: themeMode,
    colors: themes[themeMode],
    isTempleMode: themeMode === 'temple',
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeMode, dailyNotification, setDailyNotification }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

