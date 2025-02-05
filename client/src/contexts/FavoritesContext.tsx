import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

interface Video {
  id: number;
  title: string;
  description: string;
  video_url: string;
  date: Date;
  views: number;
}

interface FavoritesContextType {
  favorites: Video[];
  addToFavorites: (video: Video) => void;
  removeFromFavorites: (videoId: number) => void;
  isFavorite: (videoId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Video[]>(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (video: Video) => {
    setFavorites((prev) => {
      if (!prev.some((fav) => fav.id === video.id)) {
        return [...prev, video];
      }
      return prev;
    });
  };

  const removeFromFavorites = (videoId: number) => {
    setFavorites((prev) => prev.filter((video) => video.id !== videoId));
  };

  const isFavorite = (videoId: number) => {
    return favorites.some((video) => video.id === videoId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
