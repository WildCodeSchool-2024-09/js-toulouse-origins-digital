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
        <div key={video.id}>
          <div>
            <img src={video.url} alt={video.title} className="favorite-video" />
          </div>
        </div>
      ))}
    </div>
  );
}
