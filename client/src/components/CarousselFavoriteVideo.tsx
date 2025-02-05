import "../styles/CarousselFavoriteVideo.css";
import { useState } from "react";
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

export default function CarouselFavoriteVideo() {
  const handleCloseVideo = () => setSelectedVideo(null);
  const { favorites, removeFromFavorites } = useFavorites();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  if (favorites.length === 0) {
    return <div className="no-favorites-message">Aucune vidéo en favoris.</div>;
  }

  return (
    <div className="carousel-favorite-video">
      {favorites.map((video) => (
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
              onClick={() => removeFromFavorites(video.id)}
              className="delete-button"
            >
              <img src={deleteIcon} alt="Supprimer" className="delete-icon" />
            </button>
          </div>
        </div>
      ))}
      <VideoCard video={selectedVideo ?? null} onClose={handleCloseVideo} />
    </div>
  );
}
