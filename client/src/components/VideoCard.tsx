import "../styles/VideoCard.css";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import bookMarkIcon from "../assets/images/bookmark.png";
import { useNav } from "../contexts/NavProvider";
import { addPlaylist, fetchPlaylists } from "../services/playlistService";
import type { Playlist } from "../types/types";
import AlertModal from "./AlertModal";
import ConfirmModal from "./ConfirmModal";

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
  const { isOpenLogin, setIsOpenLogin } = useNav();
  const limitTime = new Date();
  limitTime.setMonth(limitTime.getMonth() - 1);

  const isOldVideo = video ? new Date(video.date) <= limitTime : false;

  const [isShowingAlert, setIsShowingAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    title: "",
    message: "",
    type: "",
  });

  const [isShowingConfirm, setIsShowingConfirm] = useState(false);
  const confirmInfo = {
    title: "Connexion requise",
    message:
      "Vous devez être connecté pour voir les vidéos récentes. Voulez-vous vous connecter maintenant ?",
  };

  const toggleAlert = () => {
    setIsShowingAlert(!isShowingAlert);
  };

  const toggleConfirm = () => {
    setIsShowingConfirm(!isShowingConfirm);
  };

  const handleConfirmLogin = () => {
    setIsShowingConfirm(false);
    setIsOpenLogin(true);
  };

  useEffect(() => {
    if (isOpenCardVideo) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenCardVideo]);

  useEffect(() => {
    if (isOpenLogin) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenLogin]);

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
      } else {
        setIsFavorite(false);
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
        setTimeout(() => {
          const fadeOut = setInterval(() => {
            setSuccessMessage((prev) => {
              if (prev === null || prev.length === 0) {
                clearInterval(fadeOut);
                return null;
              }
              return prev.slice(0, -1);
            });
          }, 20);
        }, 2000);

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
    if (!video) return;

    if (!auth?.user?.id) {
      setAlertInfo({
        title: "Non connecté",
        message: "Vous devez être connecté pour ajouter aux favoris.",
        type: "error",
      });
      setIsShowingAlert(true);
      return;
    }

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

  const handleAddToPlaylistClick = () => {
    if (!auth?.user?.id) {
      setAlertInfo({
        title: "Non connecté",
        message: "Vous devez être connecté pour ajouter à une playlist.",
        type: "error",
      });
      setIsShowingAlert(true);
      return;
    }
    setIsOpenPlaylists(!isOpenPlaylists);
  };

  const handleVideoClick = () => {
    if (!isUserLoggedIn && !isOldVideo) {
      setIsShowingConfirm(true);
    }
  };

  return (
    <div className="video-card-modal">
      <AlertModal
        isShowing={isShowingAlert}
        onClose={toggleAlert}
        alertInfo={alertInfo}
      />
      <ConfirmModal
        isShowing={isShowingConfirm}
        onClose={toggleConfirm}
        onConfirm={handleConfirmLogin}
        confirmInfo={confirmInfo}
      />
      {isOpenCardVideo && (
        <div className="card-video-card">
          <button
            type="button"
            className="close close-video-card"
            onClick={() => {
              setIsOpenCardVideo(false);
              setSuccessMessage(null);
              onClose();
            }}
          >
            <span>×</span>
          </button>
          <div className="card-content-video-card">
            <>
              <div onClick={handleVideoClick} onKeyDown={handleVideoClick}>
                <iframe
                  className={`frame-video ${!isOldVideo && !isUserLoggedIn ? "grayed-out" : ""}`}
                  src={video?.video_url}
                  title={video?.title}
                  allowFullScreen
                />
              </div>

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
              <p className="text-date">
                Publié le{" "}
                {video?.date ? new Date(video.date).toLocaleDateString() : ""}
              </p>

              <p className="card-text">{video?.description}</p>
              <button
                className="button-playlist"
                type="button"
                onClick={handleAddToPlaylistClick}
                onKeyDown={handleAddToPlaylistClick}
              >
                Ajouter à une playlist
              </button>

              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}

              {isOpenPlaylists && isUserLoggedIn ? (
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
          </div>
        </div>
      )}
    </div>
  );
}
