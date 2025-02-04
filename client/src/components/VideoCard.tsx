import bookmarkIcon from "../assets/images/bookmark.png";
import { useFavorites } from "../contexts/FavoritesContext";

interface VideoProps {
  id: number;
  title: string;
  url: string;
}

export default function VideoCard({ id, title, url }: VideoProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isFavorite(id)) {
      removeFromFavorites(id);
    } else {
      addToFavorites({ id, title, url });
    }
  };

  return (
    <div className="video-card">
      <img src={url} alt={title} />
      <div className="video-info">
        <h3>{title}</h3>
        <button
          type="button"
          onClick={handleFavoriteClick}
          className={`favorite-button ${isFavorite(id) ? "active" : ""}`}
        >
          {isFavorite(id) ? (
            <img src={bookmarkIcon} alt="heart" />
          ) : (
            <img src={bookmarkIcon} alt="heart" />
          )}
        </button>
      </div>
    </div>
  );
}
