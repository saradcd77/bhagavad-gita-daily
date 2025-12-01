import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Share, Alert } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { Verse } from '../types';

interface ActionButtonsProps {
  verse: Verse;
  onRefresh?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ verse, onRefresh }) => {
  const { theme } = useTheme();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const isCurrentFavorite = isFavorite(verse.id);

  const handleSave = () => {
    if (isCurrentFavorite) {
      removeFavorite(verse.id);
    } else {
      addFavorite(verse);
    }
  };

  const handleShare = async () => {
    try {
      const message = `📿 Bhagavad Gita ${verse.chapter}:${verse.verse}\n\n"${verse.sanskrit}"\n\n"${verse.english}"\n\n💭 ${verse.reflection}\n\n— Shared from Gita Today`;
      
      await Share.share({
        message,
        title: 'Gita Today - Daily Wisdom',
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to share. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
        onPress={handleSave}
        activeOpacity={0.7}
      >
        <Text style={styles.emoji}>{isCurrentFavorite ? '💛' : '🤍'}</Text>
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
          {isCurrentFavorite ? 'Saved' : 'Save'}
        </Text>
      </TouchableOpacity>

      {onRefresh && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
          onPress={onRefresh}
          activeOpacity={0.7}
        >
          <Text style={styles.emoji}>🔄</Text>
          <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Refresh</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
        onPress={handleShare}
        activeOpacity={0.7}
      >
        <Text style={styles.emoji}>📤</Text>
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  emoji: {
    fontSize: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});

