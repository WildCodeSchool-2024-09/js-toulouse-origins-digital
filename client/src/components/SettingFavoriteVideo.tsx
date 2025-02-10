import "../styles/CarousselFavoriteVideo.css";
import { useEffect, useState } from "react";
import deleteIcon from "../assets/images/supprimer.png";
import { useFavorites } from "../contexts/FavoritesContext";
import VideoCard from "./VideoCard";

interface Video {
  id: number;
  title: string;
  description: string;
  video_url: string;
  date: Date;
  views: number;
  categories?: number[];
}

function getVideasVideoId(url: string): string | null {
  const regExp =
    /^.*\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}).*$/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

function getVideasThumbnail(url: string): string {
  const videoId = getVideasVideoId(url);
  return videoId ? `https://app.videas.fr/media/${videoId}/thumbnail.jpg` : "";
}

interface CarouselFavoriteVideoProps {
  selectedCategories: number[];
  sortBy: string;
}

export default function SettingFavoriteVideo({
  selectedCategories,
  sortBy,
}: CarouselFavoriteVideoProps) {
  const handleCloseVideo = () => setSelectedVideo(null);
  const { favorites, removeFromFavorites } = useFavorites();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videoCategories, setVideoCategories] = useState<
    Record<number, number[]>
  >({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responses = await Promise.all(
          favorites.map((video) =>
            fetch(
              `${import.meta.env.VITE_API_URL}/api/videocategory/categories/${
                video.id
              }`,
              { credentials: "include" },
            ),
          ),
        );

        const data = await Promise.all(responses.map((res) => res.json()));

        const newCategories: Record<number, number[]> = {};
        favorites.forEach((video, index) => {
          newCategories[video.id] = data[index].map(
            (cat: { id: number }) => cat.id,
          );
        });

        setVideoCategories(newCategories);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories", error);
      }
    };
    if (favorites.length > 0) fetchCategories(); // N'appeler que si des favoris existent.
  }, [favorites]);

  const filteredFavorites =
    selectedCategories.length > 0
      ? favorites.filter((video) =>
          videoCategories[video.id]?.some((catId) =>
            selectedCategories.includes(catId),
          ),
        )
      : favorites;

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "az":
        return a.title.localeCompare(b.title);
      case "za":
        return b.title.localeCompare(a.title);
      case "views":
        return b.views - a.views;
      case "less-views":
        return a.views - b.views;
      default:
        return 0;
    }
  });

  if (filteredFavorites.length === 0) {
    return (
      <div className="no-favorites-message">
        {favorites.length === 0
          ? "Aucune vidéo en favoris."
          : "Aucune vidéo ne correspond aux filtres sélectionnés."}
      </div>
    );
  }

  return (
    <div className="carousel-favorite-video">
      {sortedFavorites.map((video) => (
        <div key={video.id} className="favorite-video-container">
          <div
            key={video.id}
            className="video-card"
            onClick={() => setSelectedVideo(video)}
            onKeyDown={() => setSelectedVideo(video)}
          >
            <img
              className="favorite-video-frame"
              src={getVideasThumbnail(video.video_url)}
              alt="thumbnail"
            />
          </div>
          <div className="favorite-video-info">
            <h3 className="favorite-video-title">{video.title}</h3>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFromFavorites(video.id);
              }}
              className="delete-button"
            >
              <img src={deleteIcon} alt="Supprimer" className="delete-icon" />
            </button>
          </div>
        </div>
      ))}
      {selectedVideo && (
        <VideoCard
          video={{
            ...selectedVideo,
            date: selectedVideo?.date ? selectedVideo.date.toISOString() : "",
          }}
          onClose={handleCloseVideo}
        />
      )}
    </div>
  );
}
