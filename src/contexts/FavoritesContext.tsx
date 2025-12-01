import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Verse, FavoriteVerse } from '../types';

interface FavoritesContextType {
  favorites: FavoriteVerse[];
  addFavorite: (verse: Verse) => void;
  removeFavorite: (verseId: string) => void;
  isFavorite: (verseId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteVerse[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const saved = await AsyncStorage.getItem('favorites');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFavorites(parsed.map((f: any) => ({ ...f, savedAt: new Date(f.savedAt) })));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  };

  const saveFavorites = async (newFavorites: FavoriteVerse[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  };

  const addFavorite = (verse: Verse) => {
    const favoriteVerse: FavoriteVerse = {
      ...verse,
      savedAt: new Date(),
    };
    const newFavorites = [favoriteVerse, ...favorites];
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const removeFavorite = (verseId: string) => {
    const newFavorites = favorites.filter(f => f.id !== verseId);
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const isFavorite = (verseId: string) => {
    return favorites.some(f => f.id === verseId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

