import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface TopicTagProps {
  label: string;
  onPress?: () => void;
  selected?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const TopicTag: React.FC<TopicTagProps> = ({ 
  label, 
  onPress, 
  selected = false,
  size = 'medium' 
}) => {
  const { theme } = useTheme();

  const sizeStyles = {
    small: { paddingVertical: 4, paddingHorizontal: 10, fontSize: 12 },
    medium: { paddingVertical: 8, paddingHorizontal: 16, fontSize: 14 },
    large: { paddingVertical: 12, paddingHorizontal: 24, fontSize: 16 },
  };

  return (
    <TouchableOpacity
      style={[
        styles.tag,
        {
          backgroundColor: selected ? theme.colors.secondary : theme.colors.surface,
          borderColor: theme.colors.secondary,
          paddingVertical: sizeStyles[size].paddingVertical,
          paddingHorizontal: sizeStyles[size].paddingHorizontal,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.label,
          {
            color: selected ? '#FFFFFF' : theme.colors.secondary,
            fontSize: sizeStyles[size].fontSize,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  label: {
    fontWeight: '500',
  },
});

