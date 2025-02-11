import "../styles/VideoCard.css";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import bookMarkIcon from "../assets/images/bookmark.png";
import { useNav } from "../contexts/NavProvider";
import { addPlaylist, fetchPlaylists } from "../services/playlistService";
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
  const [isFavorite, setIsFavorite] = useState(false);
  const isUserLoggedIn = auth?.user?.id;
  const { setIsOpenLogin } = useNav();
  const isOldVideo = video
    ? new Date(video.date) <=
      new Date(new Date().setMonth(new Date().getMonth() - 2))
    : false;

  useEffect(() => {
    if (isOpenCardVideo) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenCardVideo]);

  useEffect(() => {
    const checkFavorite = async () => {
      if (video && auth?.user?.id) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/favorites/${auth.user.id}`,
            { credentials: "include" },
          );
          const data = await response.json();
          setIsFavorite(
            data.favorites.some((fav: { id: number }) => fav.id === video.id),
          );
        } catch (error) {
          console.error("Error checking favorite:", error);
        }
      }
    };
    checkFavorite();
  }, [video, auth?.user?.id]);

  useEffect(() => {
    const loadPlaylists = async () => {
      if (!auth?.user?.id) return;
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
          credentials: "include",
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

  const [isAddingPlaylist, setIsAddingPlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const createPlaylist = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (auth) {
        const newPlaylist: Playlist = {
          id: 0,
          name: newPlaylistName,
          id_user: auth?.user?.id || 0,
        };

        await addPlaylist(auth.user.id, newPlaylist);
        const updatedPlaylists = await fetchPlaylists(auth.user.id);
        setPlaylists(updatedPlaylists);
      }
    } catch {
      setError("Failed to add playlist");
    }
  };

  const handleFavoriteClick = async () => {
    if (!video || !auth?.user?.id) return;

    try {
      if (isFavorite) {
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/favorites/${auth?.user.id}/${
            video.id
          }`,
          {
            method: "DELETE",
            credentials: "include",
          },
        );
        setIsFavorite(false);
      } else {
        await fetch(
          `${import.meta.env.VITE_API_URL}/api/favorites/${auth?.user.id}/${
            video.id
          }`,
          {
            method: "POST",
            credentials: "include",
          },
        );
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error managing favorite:", error);
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
                <div>
                  <iframe
                    className={`frame-video ${
                      !isUserLoggedIn ? "grayed-out" : ""
                    }`}
                    src={video?.video_url}
                    title={video?.title}
                    allowFullScreen
                  />
                </div>

                {isUserLoggedIn && (
                  <>
                    <div className="video-header">
                      <h2 className="title-video-card">{video?.title}</h2>
                      <button
                        type="button"
                        onClick={handleFavoriteClick}
                        className="bookmark-button"
                      >
                        <img
                          src={bookMarkIcon}
                          alt="bookmark"
                          className={`bookmark-icon ${
                            video && isFavorite ? "active" : ""
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-view">Vues: {video?.views}</p>

                    <p className="card-text">{video?.description}</p>
                    <button
                      className="button-playlist"
                      type="button"
                      onClick={() => setIsOpenPlaylists(!isOpenPlaylists)}
                      onKeyDown={() => setIsOpenPlaylists(!isOpenPlaylists)}
                    >
                      ajouter à une playlist{" "}
                    </button>
                  </>
                )}
                {successMessage && (
                  <div className="success-message">{successMessage}</div>
                )}

                {isOpenPlaylists ? (
                  <div className="playlist-container">
                    <div className="playlist-header">
                      {!isAddingPlaylist ? (
                        <button
                          type="button"
                          className="add-playlist-button"
                          onClick={() => setIsAddingPlaylist(true)}
                        >
                          + Nouvelle playlist
                        </button>
                      ) : (
                        <div className="new-playlist-form">
                          <input
                            type="text"
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                            placeholder="Nom de la playlist"
                            className="playlist-input"
                          />
                          <button
                            type="button"
                            onClick={createPlaylist}
                            className="create-playlist-button"
                          >
                            Créer
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingPlaylist(false);
                              setNewPlaylistName("");
                            }}
                            className="cancel-button"
                          >
                            Annuler
                          </button>
                        </div>
                      )}
                    </div>
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
                  </div>
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
