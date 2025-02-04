import "../styles/CarousselFavoriteVideo.css";
import { useFavorites } from "../contexts/FavoritesContext";

export default function CarouselFavoriteVideo() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return <div className="no-favorites-message">Aucune vidéo en favoris.</div>;
  }

  return (
    <div className="carousel-favorite-video">
      {favorites.map((video) => (
        <div key={video.id} className="favorite-video-container">
          <iframe
            className="favorite-video-frame"
            src={video.url}
            title={video.title}
            allowFullScreen
          />
          <h3 className="favorite-video-title">{video.title}</h3>
        </div>
      ))}
    </div>
  );
}
