import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface LoaderProps {
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ message = 'Loading wisdom...' }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ActivityIndicator size="large" color={theme.colors.secondary} />
      <Text style={[styles.message, { color: theme.colors.textSecondary }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    fontStyle: 'italic',
  },
});

