import "../styles/VideoCard.css";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { fetchPlaylists } from "../services/playlistService";
import type { Playlist } from "../types/types";

interface VideoPlayerProps {
  video: {
    id: number;
    title: string;
    description: string;
    video_url: string;
    views: number;
  } | null;
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

export default function VideoCard({ video }: VideoPlayerProps) {
  const [isOpenCardVideo, setIsOpenCardVideo] = useState(false);
  const [isOpenPlaylists, setIsOpenPlaylists] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { auth } = useOutletContext() as { auth: Auth | null };
  const userId =
    auth?.user.id ||
    (() => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        return user.id;
      }
      return 0;
    })();
  useEffect(() => {
    const loadPlaylists = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPlaylists(userId || 0);
        setPlaylists(data);
      } catch {
        setError("Failed to load playlists");
      } finally {
        setIsLoading(false);
      }
    };
    loadPlaylists();
  }, [userId]);
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
        `${import.meta.env.VITE_API_URL}/api/videoplaylist/${playlistId}/${videoId}`,
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

  return (
    <>
      {isOpenCardVideo && (
        <div className="card-video-card">
          <div className="card-content-video-card">
            <div>
              <iframe
                className="frame-video"
                src={video?.video_url}
                title={video?.title}
              />
            </div>
            <h2 className="title-video-card">{video?.title}</h2>
            <p className="card-text">Vues: {video?.views}</p>

            <p className="card-text">{video?.description}</p>

            <button
              className="button-playlist"
              type="button"
              onClick={() => setIsOpenPlaylists(!isOpenPlaylists)}
              onKeyDown={() => setIsOpenPlaylists(!isOpenPlaylists)}
            >
              ajouter à une playlist{" "}
            </button>
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
          </div>
          <button
            onClick={() => setIsOpenCardVideo(false)}
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
