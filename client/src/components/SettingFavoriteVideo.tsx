import "../styles/Favorite.css";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import deleteIcon from "../assets/images/supprimer.png";
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

type Favorite = {
  id: number;
  title: string;
  description: string;
  video_url: string;
  date: string;
  views: number;
};

type User = {
  id: number;
  email: string;
  is_admin: boolean;
};

type Auth = {
  user: User;
  token: string;
};

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

interface SettingFavoriteVideoProps {
  selectedCategories: number[];
  sortBy: string;
  favorites: Favorite[];
}

export default function SettingFavoriteVideo({
  selectedCategories,
  sortBy,
}: SettingFavoriteVideoProps) {
  const { auth } = useOutletContext() as { auth: Auth | null };
  const userId = auth?.user.id;
  const handleCloseVideo = () => setSelectedVideo(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videoCategories, setVideoCategories] = useState<
    Record<number, number[]>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      if (userId)
        for (const video of favorites) {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/videocategory/categories/${video.id}`,
          );
          const data = await response.json();
          setVideoCategories((prev) => ({
            ...prev,
            [video.id]: data.map((cat: { id: number }) => cat.id),
          }));
        }
    };

    fetchCategories();
  }, [favorites, userId]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (userId) {
        try {
          setIsLoading(true);
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/favorites/${userId}`,
            { credentials: "include" },
          );
          if (!response.ok) throw new Error("Failed to fetch favorites");
          const data = await response.json();
          setFavorites(data.favorites || []);
        } catch (error) {
          console.error("Error fetching favorites:", error);
          setError("Failed to load favorites");
          setFavorites([]);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchFavorites();
  }, [userId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const filteredFavorites =
    selectedCategories.length > 0
      ? favorites.filter((video) =>
          videoCategories[video.id]?.some((catId) =>
            selectedCategories.includes(catId),
          ),
        )
      : favorites;

  const sortedFavorites = [...filteredFavorites];

  switch (sortBy) {
    case "oldest":
      sortedFavorites.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
      break;
    case "views":
      sortedFavorites.sort((a, b) => b.views - a.views);
      break;
    case "less-views":
      sortedFavorites.sort((a, b) => a.views - b.views);
      break;
    case "az":
      sortedFavorites.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "za":
      sortedFavorites.sort((a, b) => b.title.localeCompare(a.title));
      break;
    default: // "recent"
      sortedFavorites.reverse();
  }

  const removeFromFavorites = async (videoId: number) => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/favorites/${auth?.user?.id}/${videoId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      setFavorites((prev) => prev.filter((fav) => fav.id !== videoId));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

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
    <div className="favorite-video-box">
      {sortedFavorites.map((video) => (
        <div key={video.id} className="favorite-video-container">
          <div
            key={video.id}
            className="video-card"
            onClick={() =>
              setSelectedVideo({ ...video, date: new Date(video.date) })
            }
            onKeyDown={() =>
              setSelectedVideo({ ...video, date: new Date(video.date) })
            }
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
