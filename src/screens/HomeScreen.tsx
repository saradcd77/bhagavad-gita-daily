import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { VerseCard, ActionButtons } from '../components';
import { getDailyVerse, getRandomVerse } from '../utils/verseUtils';
import { Verse } from '../types';

export const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const [verse, setVerse] = useState<Verse>(getDailyVerse());
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setVerse(getRandomVerse());
  }, []);

  const onPullRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setVerse(getDailyVerse());
      setRefreshing(false);
    }, 1000);
  }, []);

  const content = (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onPullRefresh}
            tintColor={theme.colors.secondary}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: theme.colors.textMuted }]}>
            {getGreeting()}
          </Text>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            Gita Today
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Your daily dose of divine wisdom
          </Text>
        </View>

        {/* Date Badge */}
        <View style={[styles.dateBadge, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.dateText, { color: theme.colors.secondary }]}>
            📿 {formatDate(new Date())}
          </Text>
        </View>

        {/* Verse Card */}
        <VerseCard verse={verse} />

        {/* Action Buttons */}
        <ActionButtons verse={verse} onRefresh={handleRefresh} />

        {/* Footer Quote */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.textMuted }]}>
            "In the stillness of your soul, wisdom speaks."
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  if (theme.isTempleMode) {
    return (
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=800' }}
        style={styles.background}
        imageStyle={{ opacity: 0.15 }}
      >
        {content}
      </ImageBackground>
    );
  }

  return content;
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return '🌅 Good Morning';
  if (hour < 17) return '☀️ Good Afternoon';
  return '🌙 Good Evening';
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    marginTop: 4,
  },
  dateBadge: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '500',
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

