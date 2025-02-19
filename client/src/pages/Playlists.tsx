// src/components/GamePlaylists.tsx
import { useEffect, useState } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import PlaylistList from "../components/PlaylistList";
import VideosGrid from "../components/VideosGrid";
import {
  addPlaylist,
  deletePlaylist,
  deleteVideoFromPlaylist,
  fetchPlaylists,
  fetchVideoPlaylists,
  fetchVideos,
} from "../services/playlistService";
import "../styles/Playlists.css";
import { useOutletContext } from "react-router-dom";
import type { Playlist, Video, VideoPlaylist } from "../types/types";
import AccessDenied from "./AccessDenied";

type User = {
  id: number;
  email: string;
  is_admin: boolean;
};

type Auth = {
  user: User;
  token: string;
};

const GamePlaylists = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null,
  );
  const [videoPlaylists, setVideoPlaylists] = useState<VideoPlaylist[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playlistName, setPlaylistName] = useState("");
  const { auth } = useOutletContext() as { auth: Auth | null };

  const userId = auth?.user.id ?? 0;

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

  const handleAddPlaylist = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPlaylist: Playlist = {
        id: 0,
        name: playlistName,
        id_user: userId || 0,
      };
      await addPlaylist(userId, newPlaylist);
      const updatedPlaylists = await fetchPlaylists(userId);
      setPlaylists(updatedPlaylists);
    } catch {
      setError("Failed to add playlist");
    }
  };

  const handleDeletePlaylist = async (playlistId: number) => {
    try {
      await deletePlaylist(playlistId);
      const updatedPlaylists = await fetchPlaylists(userId);
      setPlaylists(updatedPlaylists);
    } catch {
      setError("Failed to delete playlist");
    }
  };

  const handlePlaylistClick = async (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setIsLoading(true);
    try {
      const vp = await fetchVideoPlaylists(playlist.id);
      setVideoPlaylists(vp);
      const vids = await fetchVideos(vp);
      setVideos(vids);
    } catch {
      setError("Failed to load videos");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {auth ? (
        <>
          <Header />
          <main className="playlists-container">
            <div className="playlists-section">
              <h2 className="title-playlists-page">
                {!selectedPlaylist
                  ? "Mes Playlists \u27E9"
                  : `${selectedPlaylist?.name} \u27E9`}
              </h2>
            </div>
            <hr className="line" />
            {error && <div className="error-message">{error}</div>}
            {isLoading && <div className="loading">Loading...</div>}
            {!selectedPlaylist ? (
              <PlaylistList
                playlists={playlists}
                onPlaylistClick={handlePlaylistClick}
                onAddPlaylist={handleAddPlaylist}
                onDeletePlaylist={handleDeletePlaylist}
                playlistName={playlistName}
                setPlaylistName={setPlaylistName}
              />
            ) : (
              <VideosGrid
                videos={videos}
                videoPlaylists={videoPlaylists}
                selectedPlaylist={selectedPlaylist}
                onBack={() => setSelectedPlaylist(null)}
                onDeleteVideo={(videoId) =>
                  deleteVideoFromPlaylist(videoId).then(() => {
                    handlePlaylistClick(selectedPlaylist);
                  })
                }
              />
            )}
          </main>
          <NavBar />
        </>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default GamePlaylists;
