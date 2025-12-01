import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { VerseCard, ActionButtons } from '../components';

export const FavoritesScreen: React.FC = () => {
  const { theme } = useTheme();
  const { favorites, removeFavorite } = useFavorites();

  const handleDelete = (id: string, reference: string) => {
    Alert.alert(
      'Remove from Favorites',
      `Remove ${reference} from your saved verses?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removeFavorite(id) },
      ]
    );
  };

  const formatSavedDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            Favorites
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Your collection of saved wisdom
          </Text>
        </View>

        {/* Favorites Count */}
        {favorites.length > 0 && (
          <View style={[styles.countBadge, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.countText, { color: theme.colors.secondary }]}>
              💛 {favorites.length} saved verse{favorites.length > 1 ? 's' : ''}
            </Text>
          </View>
        )}

        {/* Favorites List */}
        {favorites.length > 0 ? (
          favorites.map((verse) => (
            <View key={verse.id} style={styles.favoriteItem}>
              {/* Saved Date & Delete */}
              <View style={styles.itemHeader}>
                <Text style={[styles.savedDate, { color: theme.colors.textMuted }]}>
                  Saved on {formatSavedDate(verse.savedAt)}
                </Text>
                <TouchableOpacity
                  onPress={() => handleDelete(verse.id, `${verse.chapter}:${verse.verse}`)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={[styles.deleteButton, { color: theme.colors.textMuted }]}>
                    🗑️ Remove
                  </Text>
                </TouchableOpacity>
              </View>

              <VerseCard verse={verse} showTags compact />
              <ActionButtons verse={verse} />
            </View>
          ))
        ) : (
          /* Empty State */
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📚</Text>
            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
              No saved verses yet
            </Text>
            <Text style={[styles.emptyText, { color: theme.colors.textMuted }]}>
              Start saving verses that resonate with you. Tap the heart icon 💛 on any verse to add it here.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
  },
  countBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 20,
  },
  countText: {
    fontSize: 14,
    fontWeight: '500',
  },
  favoriteItem: {
    marginBottom: 24,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  savedDate: {
    fontSize: 12,
  },
  deleteButton: {
    fontSize: 13,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
  },
});

