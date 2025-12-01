import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { FavoritesProvider } from './src/contexts/FavoritesContext';
import { AppNavigator } from './src/navigation/AppNavigator';

const AppContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <StatusBar style={theme.mode === 'light' ? 'dark' : 'light'} />
      <AppNavigator />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <FavoritesProvider>
          <AppContent />
        </FavoritesProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
