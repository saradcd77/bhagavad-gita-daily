export interface Verse {
  id: string;
  chapter: number;
  verse: number;
  sanskrit: string;
  english: string;
  tags: string[];
  reflection: string;
}

export interface FavoriteVerse extends Verse {
  savedAt: Date;
}

export type ThemeMode = 'light' | 'dark' | 'temple';

export interface UserSettings {
  theme: ThemeMode;
  dailyNotification: boolean;
}

