import { Verse } from '../types';
import versesData from '../data/verses.json';

const verses: Verse[] = versesData as Verse[];

export const getRandomVerse = (): Verse => {
  const index = Math.floor(Math.random() * verses.length);
  return verses[index];
};

export const getDailyVerse = (): Verse => {
  // Use date to get consistent verse for the day
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const index = dayOfYear % verses.length;
  return verses[index];
};

export const getVersesByTag = (tag: string): Verse[] => {
  return verses.filter(verse => 
    verse.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};

export const searchVerses = (query: string): Verse[] => {
  const lowerQuery = query.toLowerCase();
  return verses.filter(verse =>
    verse.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    verse.english.toLowerCase().includes(lowerQuery) ||
    verse.reflection.toLowerCase().includes(lowerQuery)
  );
};

export const getAllTags = (): string[] => {
  const tagSet = new Set<string>();
  verses.forEach(verse => {
    verse.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};

export const getVerseById = (id: string): Verse | undefined => {
  return verses.find(verse => verse.id === id);
};

// Mock AI response for AskKrishna feature
export const getAIResponse = (question: string): Verse => {
  const keywords = question.toLowerCase().split(' ');
  
  // Simple keyword matching to find relevant verse
  let bestMatch: Verse | null = null;
  let bestScore = 0;

  verses.forEach(verse => {
    let score = 0;
    keywords.forEach(keyword => {
      if (keyword.length > 3) {
        verse.tags.forEach(tag => {
          if (tag.toLowerCase().includes(keyword)) score += 2;
        });
        if (verse.reflection.toLowerCase().includes(keyword)) score += 1;
        if (verse.english.toLowerCase().includes(keyword)) score += 1;
      }
    });
    if (score > bestScore) {
      bestScore = score;
      bestMatch = verse;
    }
  });

  return bestMatch || getRandomVerse();
};

