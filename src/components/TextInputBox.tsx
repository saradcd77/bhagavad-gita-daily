import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface TextInputBoxProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  submitLabel?: string;
  multiline?: boolean;
}

export const TextInputBox: React.FC<TextInputBoxProps> = ({
  value,
  onChangeText,
  placeholder = 'What are you facing today?',
  onSubmit,
  submitLabel = 'Ask Krishna',
  multiline = true,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
            borderColor: theme.colors.border,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        multiline={multiline}
        numberOfLines={3}
        textAlignVertical="top"
      />
      {onSubmit && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.secondary }]}
          onPress={onSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{submitLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    lineHeight: 24,
  },
  button: {
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

