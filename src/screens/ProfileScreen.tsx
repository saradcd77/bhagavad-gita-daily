import React from 'react';
import { View, Text, ScrollView, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { ThemeMode } from '../types';

export const ProfileScreen: React.FC = () => {
  const { theme, setThemeMode, dailyNotification, setDailyNotification } = useTheme();
  const { favorites } = useFavorites();

  const themeOptions: { mode: ThemeMode; label: string; emoji: string; description: string }[] = [
    { mode: 'light', label: 'Light', emoji: '☀️', description: 'Clean, bright interface' },
    { mode: 'dark', label: 'Dark', emoji: '🌙', description: 'Easy on the eyes' },
    { mode: 'temple', label: 'Temple', emoji: '🕉️', description: 'Sacred ambiance' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            Settings
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Customize your experience
          </Text>
        </View>

        {/* Stats Card */}
        <View style={[styles.statsCard, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>💛</Text>
            <Text style={[styles.statNumber, { color: theme.colors.primary }]}>{favorites.length}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>Saved Verses</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
          <View style={styles.statItem}>
            <Text style={styles.statEmoji}>📿</Text>
            <Text style={[styles.statNumber, { color: theme.colors.primary }]}>12</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textMuted }]}>Total Verses</Text>
          </View>
        </View>

        {/* Theme Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            🎨 Theme
          </Text>
          <View style={styles.themeOptions}>
            {themeOptions.map((option) => (
              <TouchableOpacity
                key={option.mode}
                style={[
                  styles.themeOption,
                  {
                    backgroundColor: theme.mode === option.mode ? theme.colors.secondary : theme.colors.surface,
                    borderColor: theme.colors.border,
                  },
                ]}
                onPress={() => setThemeMode(option.mode)}
                activeOpacity={0.7}
              >
                <Text style={styles.themeEmoji}>{option.emoji}</Text>
                <Text style={[
                  styles.themeLabel,
                  { color: theme.mode === option.mode ? '#FFFFFF' : theme.colors.text }
                ]}>
                  {option.label}
                </Text>
                <Text style={[
                  styles.themeDescription,
                  { color: theme.mode === option.mode ? 'rgba(255,255,255,0.8)' : theme.colors.textMuted }
                ]}>
                  {option.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            🔔 Notifications
          </Text>
          <View style={[styles.settingRow, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
                Daily Verse Reminder
              </Text>
              <Text style={[styles.settingDescription, { color: theme.colors.textMuted }]}>
                Receive your daily wisdom at 8:00 AM
              </Text>
            </View>
            <Switch
              value={dailyNotification}
              onValueChange={setDailyNotification}
              trackColor={{ false: theme.colors.border, true: theme.colors.secondary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            ℹ️ About
          </Text>
          <View style={[styles.aboutCard, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.aboutTitle, { color: theme.colors.primary }]}>
              Gita Today
            </Text>
            <Text style={[styles.aboutVersion, { color: theme.colors.textMuted }]}>
              Version 1.0.0
            </Text>
            <Text style={[styles.aboutText, { color: theme.colors.textSecondary }]}>
              A minimalist app bringing ancient wisdom to modern life. Each verse is carefully curated with contemporary reflections to guide you through life's challenges.
            </Text>
            <Text style={[styles.aboutFooter, { color: theme.colors.secondary }]}>
              🙏 Made with Devotion by Sarad
            </Text>
          </View>
        </View>
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
  statsCard: { flexDirection: 'row', borderRadius: 16, padding: 20, marginBottom: 24 },
  statItem: { flex: 1, alignItems: 'center' },
  statDivider: { width: 1, marginVertical: 8 },
  statEmoji: { fontSize: 24, marginBottom: 8 },
  statNumber: { fontSize: 28, fontWeight: '700' },
  statLabel: { fontSize: 12, marginTop: 4 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  themeOptions: { flexDirection: 'row', gap: 12 },
  themeOption: { flex: 1, padding: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1 },
  themeEmoji: { fontSize: 28, marginBottom: 8 },
  themeLabel: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  themeDescription: { fontSize: 11, textAlign: 'center' },
  settingRow: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12 },
  settingInfo: { flex: 1 },
  settingLabel: { fontSize: 16, fontWeight: '500', marginBottom: 4 },
  settingDescription: { fontSize: 13 },
  aboutCard: { padding: 20, borderRadius: 16, alignItems: 'center' },
  aboutTitle: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  aboutVersion: { fontSize: 13, marginBottom: 16 },
  aboutText: { fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 16 },
  aboutFooter: { fontSize: 14, fontWeight: '500' },
});

