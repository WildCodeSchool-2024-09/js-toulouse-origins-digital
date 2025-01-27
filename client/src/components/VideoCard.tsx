import "../styles/VideoCard.css";
import { useEffect, useState } from "react";
import { fetchPlaylists } from "../services/playlistService";
import type { Playlist } from "../types/types";

interface VideoPlayerProps {
  video: {
    id: number;
    title: string;
    description: string;
    video_url: string;
  } | null;
}

const userId = 2;

export default function VideoCard({ video }: VideoPlayerProps) {
  const [isOpenCardVideo, setIsOpenCardVideo] = useState(false);
  const [isOpenPlaylists, setIsOpenPlaylists] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadPlaylists = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPlaylists(userId);
        setPlaylists(data);
      } catch {
        setError("Failed to load playlists");
      } finally {
        setIsLoading(false);
      }
    };
    loadPlaylists();
  }, []);
  useEffect(() => {
    if (video && video.id > 0) {
      setIsOpenCardVideo(true);
    }
  }, [video]);

  const addVideoToPlaylist = async (playlistId: number, videoId: number) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `http://localhost:3310/api/videoplaylist/${playlistId}/${videoId}`,
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
        <div className="card-video">
          <h2>{video?.title}</h2>
          <button onClick={() => setIsOpenCardVideo(false)} type="button">
            fermer
          </button>
          <div className="card-content">
            <div>
              <iframe
                className="frame-video"
                src={video?.video_url}
                title={video?.title}
              />
            </div>

            <p className="card-text">{video?.description}</p>

            <button
              type="button"
              onClick={() => setIsOpenPlaylists(!isOpenPlaylists)}
              onKeyDown={() => setIsOpenPlaylists(!isOpenPlaylists)}
            >
              ajouter a un eplaylist{" "}
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
        </div>
      )}
    </>
  );
}
