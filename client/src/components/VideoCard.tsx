import "../styles/VideoCard.css";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import bookMarkIcon from "../assets/images/bookmark.png";
import { useFavorites } from "../contexts/FavoritesContext";
import { useNav } from "../contexts/NavProvider";
import { fetchPlaylists } from "../services/playlistService";
import type { Playlist } from "../types/types";

interface VideoPlayerProps {
  video: {
    id: number;
    title: string;
    description: string;
    video_url: string;
    views: number;
    date: string | Date;
    categoryId?: number;
    category_id?: number;
  } | null;
  onClose: () => void;
}
type User = {
  id: number;
  email: string;
  is_admin: boolean;
};

type Auth = {
  user: User;
  token: string;
};

export default function VideoCard({ video, onClose }: VideoPlayerProps) {
  const [isOpenCardVideo, setIsOpenCardVideo] = useState(false);
  const [isOpenPlaylists, setIsOpenPlaylists] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { auth } = useOutletContext() as { auth: Auth | null };
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const isOldVideo = video
    ? new Date(video.date) <=
      new Date(new Date().setMonth(new Date().getMonth() - 2))
    : false;
  const isUserLoggedIn = auth?.user?.id;
  const { setIsOpenLogin } = useNav();
  useEffect(() => {
    const loadPlaylists = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPlaylists(auth?.user.id || 0);
        setPlaylists(data);
      } catch {
        setError("Failed to load playlists");
      } finally {
        setIsLoading(false);
      }
    };
    loadPlaylists();
  }, [auth?.user.id]);
  useEffect(() => {
    if (video && video.id > 0) {
      setIsOpenCardVideo(true);
      incrementViews(video.id);
    }
  }, [video]);

  async function incrementViews(videoId: number) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/videos/views/${videoId}`,
        {
          method: "PUT",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'incrémentation des vues");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  }

  const addVideoToPlaylist = async (playlistId: number, videoId: number) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/videoplaylist/${playlistId}/${videoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ playlistId, videoId }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Vidéo ajoutée à votre playlist !");
        setIsOpenPlaylists(false);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Erreur lors de l'ajout de la vidéo à la playlist.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavoriteClick = () => {
    if (!video) return;

    if (isFavorite(video.id)) {
      removeFromFavorites(video.id);
    } else {
      fetch(
        `${import.meta.env.VITE_API_URL}/api/videocategory/categories/${
          video.id
        }`,
      )
        .then((response) => response.json())
        .then((categories) => {
          addToFavorites({
            id: video.id,
            title: video.title,
            description: video.description,
            video_url: video.video_url,
            date: new Date(),
            views: video.views,
            categories: categories.map((cat: { id: number }) => cat.id),
          });
        });
    }
  };

  return (
    <>
      {isOpenCardVideo && (
        <div className="card-video-card">
          <div className="card-content-video-card">
            {!isOldVideo && !isUserLoggedIn ? (
              <div className="restricted-video">
                <p>Connectez-vous pour voir cette vidéo</p>
                <button
                  type="button"
                  onClick={() => setIsOpenLogin((prev) => !prev)}
                >
                  Se connecter
                </button>
              </div>
            ) : (
              <>
                <iframe
                  className={`frame-video ${
                    !isUserLoggedIn ? "grayed-out" : ""
                  }`}
                  src={video?.video_url}
                  title={video?.title}
                  allowFullScreen
                />
                <p className="text-view">Vues: {video?.views}</p>

                <p className="card-text">{video?.description}</p>
                {isUserLoggedIn && (
                  <div className="video-header">
                    <button
                      type="button"
                      onClick={handleFavoriteClick}
                      className="bookmark-button"
                    >
                      <img
                        src={bookMarkIcon}
                        alt="bookmark"
                        className={`bookmark-icon ${
                          video && isFavorite(video.id) ? "active" : ""
                        }`}
                      />
                    </button>
                    <button
                      className="button-playlist"
                      type="button"
                      onClick={() => setIsOpenPlaylists(!isOpenPlaylists)}
                      onKeyDown={() => setIsOpenPlaylists(!isOpenPlaylists)}
                    >
                      ajouter à une playlist{" "}
                    </button>
                  </div>
                )}
                {successMessage && (
                  <div className="success-message">{successMessage}</div>
                )}

                {isOpenPlaylists ? (
                  <ul className="playlist-list">
                    {isLoading ? (
                      <li>Chargement...</li>
                    ) : error ? (
                      <li>{error}</li>
                    ) : playlists.length > 0 ? (
                      playlists.map((playlist) => (
                        <li
                          key={playlist.id}
                          onClick={() =>
                            video && addVideoToPlaylist(playlist.id, video.id)
                          }
                          onKeyDown={() =>
                            video && addVideoToPlaylist(playlist.id, video.id)
                          }
                        >
                          {playlist.name}
                        </li>
                      ))
                    ) : (
                      <li>Aucune playlist disponible</li>
                    )}
                  </ul>
                ) : null}
              </>
            )}
          </div>
          <button
            onClick={() => {
              setIsOpenCardVideo(false);
              onClose();
            }}
            type="button"
            className="button-close-video-card"
          >
            fermer
          </button>
        </div>
      )}
    </>
  );
}
