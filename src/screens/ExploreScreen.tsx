import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { VerseCard, ActionButtons, TopicTag } from '../components';
import { getAllTags, getVersesByTag } from '../utils/verseUtils';
import { Verse } from '../types';

const tagEmojis: Record<string, string> = {
  'Action': '⚡',
  'Karma Yoga': '🎯',
  'Work': '💼',
  'Anxiety': '😰',
  'Career': '📈',
  'Patience': '🧘',
  'Emotions': '💭',
  'Mindfulness': '🧠',
  'Self-doubt': '🤔',
  'Desire': '💫',
  'Attachment': '🔗',
  'Relationships': '❤️',
  'Self-control': '🛡️',
  'Leadership': '👑',
  'Responsibility': '✨',
  'Influence': '🌟',
  'Faith': '🙏',
  'Hope': '🌈',
  'Purpose': '🎯',
  'Spirituality': '☸️',
  'Difficult Times': '🌧️',
  'Self-improvement': '📚',
  'Mental Health': '💚',
  'Motivation': '🔥',
  'Personal Growth': '🌱',
  'Trust': '🤝',
  'Surrender': '🕊️',
  'Peace': '☮️',
  'Contentment': '😊',
  'Liberation': '🦋',
  'Fear': '😨',
  'Death': '🌑',
  'Change': '🔄',
  'Transition': '➡️',
  'Loss': '💔',
  'Grief': '😢',
  'Identity': '🪞',
  'Authenticity': '💎',
  'Mind': '🧠',
  'Meditation': '🧘‍♂️',
  'Focus': '🎯',
};

export const ExploreScreen: React.FC = () => {
  const { theme } = useTheme();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = useMemo(() => getAllTags(), []);
  const filteredVerses = useMemo(() => {
    if (!selectedTag) return [];
    return getVersesByTag(selectedTag);
  }, [selectedTag]);

  const handleTagPress = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            Explore
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Browse wisdom by life situation
          </Text>
        </View>

        {/* Tags Grid */}
        <View style={styles.tagsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            📚 Topics
          </Text>
          <View style={styles.tagsGrid}>
            {tags.map((tag) => (
              <TopicTag
                key={tag}
                label={`${tagEmojis[tag] || '📿'} ${tag}`}
                selected={selectedTag === tag}
                onPress={() => handleTagPress(tag)}
                size="medium"
              />
            ))}
          </View>
        </View>

        {/* Selected Tag Results */}
        {selectedTag && filteredVerses.length > 0 && (
          <View style={styles.resultsSection}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              {tagEmojis[selectedTag] || '📿'} {selectedTag}
            </Text>
            <Text style={[styles.resultCount, { color: theme.colors.textMuted }]}>
              {filteredVerses.length} verse{filteredVerses.length > 1 ? 's' : ''} found
            </Text>
            
            {filteredVerses.map((verse) => (
              <View key={verse.id} style={styles.verseItem}>
                <VerseCard verse={verse} showTags={false} compact />
                <ActionButtons verse={verse} />
              </View>
            ))}
          </View>
        )}

        {/* Empty State */}
        {!selectedTag && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={[styles.emptyText, { color: theme.colors.textMuted }]}>
              Select a topic above to explore related verses
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  header: { marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 15 },
  tagsSection: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  tagsGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  resultsSection: { marginTop: 8 },
  resultCount: { fontSize: 14, marginBottom: 16 },
  verseItem: { marginBottom: 24 },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyText: { fontSize: 16, textAlign: 'center' },
});

