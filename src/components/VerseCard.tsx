import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Verse } from '../types';
import { TopicTag } from './TopicTag';

interface VerseCardProps {
  verse: Verse;
  showTags?: boolean;
  compact?: boolean;
}

export const VerseCard: React.FC<VerseCardProps> = ({ verse, showTags = true, compact = false }) => {
  const { theme } = useTheme();

  return (
    <View style={[
      styles.card, 
      { 
        backgroundColor: theme.colors.cardBackground,
        borderColor: theme.colors.border,
      }
    ]}>
      {/* Chapter and Verse Reference */}
      <View style={styles.header}>
        <Text style={[styles.reference, { color: theme.colors.secondary }]}>
          Bhagavad Gita {verse.chapter}:{verse.verse}
        </Text>
      </View>

      {/* Sanskrit Text */}
      <View style={[styles.sanskritContainer, { borderLeftColor: theme.colors.secondary }]}>
        <Text style={[
          styles.sanskrit, 
          { 
            color: theme.colors.sanskrit,
            fontSize: compact ? 16 : 18,
          }
        ]}>
          {verse.sanskrit}
        </Text>
      </View>

      {/* English Translation */}
      <Text style={[
        styles.english, 
        { 
          color: theme.colors.text,
          fontSize: compact ? 15 : 17,
        }
      ]}>
        "{verse.english}"
      </Text>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

      {/* Modern Reflection */}
      <View style={styles.reflectionContainer}>
        <Text style={[styles.reflectionLabel, { color: theme.colors.secondary }]}>
          ✨ Today's Reflection
        </Text>
        <Text style={[
          styles.reflection, 
          { 
            color: theme.colors.textSecondary,
            fontSize: compact ? 14 : 16,
          }
        ]}>
          {verse.reflection}
        </Text>
      </View>

      {/* Tags */}
      {showTags && verse.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          {verse.tags.slice(0, 4).map((tag, index) => (
            <TopicTag key={index} label={tag} size="small" />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    marginBottom: 16,
  },
  reference: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  sanskritContainer: {
    borderLeftWidth: 3,
    paddingLeft: 16,
    marginBottom: 16,
  },
  sanskrit: {
    fontFamily: 'System',
    fontWeight: '500',
    lineHeight: 28,
    fontStyle: 'italic',
  },
  english: {
    lineHeight: 26,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  reflectionContainer: {
    marginBottom: 16,
  },
  reflectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  reflection: {
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
});

