import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { VerseCard, ActionButtons, TextInputBox, Loader } from '../components';
import { getAIResponse } from '../utils/verseUtils';
import { Verse } from '../types';

export const AskKrishnaScreen: React.FC = () => {
  const { theme } = useTheme();
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question.trim()) return;

    setLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const verse = getAIResponse(question);
    setResponse(verse);
    setLoading(false);
  };

  const handleNewQuestion = () => {
    setQuestion('');
    setResponse(null);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.colors.primary }]}>
              Ask Krishna
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              Share what's on your mind, and receive divine guidance
            </Text>
          </View>

          {loading ? (
            <View style={styles.loaderContainer}>
              <Loader message="Seeking wisdom..." />
            </View>
          ) : response ? (
            <>
              {/* User's Question */}
              <View style={[styles.questionBox, { backgroundColor: theme.colors.surface }]}>
                <Text style={[styles.questionLabel, { color: theme.colors.textMuted }]}>
                  Your Question:
                </Text>
                <Text style={[styles.questionText, { color: theme.colors.text }]}>
                  "{question}"
                </Text>
              </View>

              {/* Response */}
              <View style={styles.responseSection}>
                <Text style={[styles.responseLabel, { color: theme.colors.secondary }]}>
                  🙏 Krishna's Guidance
                </Text>
                <VerseCard verse={response} showTags={false} />
                <ActionButtons verse={response} />
              </View>

              {/* Ask Another */}
              <View style={styles.askAnother}>
                <Text
                  style={[styles.askAnotherText, { color: theme.colors.secondary }]}
                  onPress={handleNewQuestion}
                >
                  ← Ask another question
                </Text>
              </View>
            </>
          ) : (
            <>
              {/* Prompt Ideas */}
              <View style={styles.promptSection}>
                <Text style={[styles.promptTitle, { color: theme.colors.textSecondary }]}>
                  💭 What are you seeking guidance for?
                </Text>
                <View style={styles.promptExamples}>
                  {promptExamples.map((prompt, index) => (
                    <Text
                      key={index}
                      style={[styles.promptExample, { 
                        color: theme.colors.textMuted,
                        backgroundColor: theme.colors.surface,
                      }]}
                      onPress={() => setQuestion(prompt)}
                    >
                      {prompt}
                    </Text>
                  ))}
                </View>
              </View>

              {/* Input Box */}
              <TextInputBox
                value={question}
                onChangeText={setQuestion}
                placeholder="What are you facing today?"
                onSubmit={handleSubmit}
                submitLabel="🙏 Seek Guidance"
              />
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const promptExamples = [
  "I'm anxious about my career",
  "How do I deal with difficult relationships?",
  "I'm struggling with self-doubt",
  "How to find inner peace?",
];

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardView: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  header: { marginBottom: 24 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 15, lineHeight: 22 },
  promptSection: { marginBottom: 24 },
  promptTitle: { fontSize: 16, fontWeight: '500', marginBottom: 12 },
  promptExamples: { gap: 8 },
  promptExample: { padding: 12, borderRadius: 8, fontSize: 14 },
  loaderContainer: { height: 300, justifyContent: 'center' },
  questionBox: { padding: 16, borderRadius: 12, marginBottom: 20 },
  questionLabel: { fontSize: 12, marginBottom: 4 },
  questionText: { fontSize: 16, fontStyle: 'italic' },
  responseSection: { marginBottom: 20 },
  responseLabel: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  askAnother: { alignItems: 'center', marginTop: 20 },
  askAnotherText: { fontSize: 15, fontWeight: '500' },
});

