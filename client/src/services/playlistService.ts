
import type { ApiResponse, Playlist, Video, VideoPlaylist } from "../types/types";

const BASE_URL = "http://localhost:3310/api";

export const fetchPlaylists = async (userId: number): Promise<Playlist[]> => {
  const response = await fetch(`${BASE_URL}/playlists/${userId}`);
  const data: ApiResponse<Playlist> = await response.json();
  return data.playlists || [];
};

export const addPlaylist = async (userId: number, newPlaylist: Playlist): Promise<void> => {
  await fetch(`${BASE_URL}/playlists/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPlaylist),
  });
};

export const deletePlaylist = async (playlistId: number): Promise<void> => {
  await fetch(`${BASE_URL}/playlists/${playlistId}`, {
    method: "DELETE",
  });
};

export const fetchVideoPlaylists = async (
  playlistId: number
): Promise<VideoPlaylist[]> => {
  const response = await fetch(`${BASE_URL}/videoplaylist/${playlistId}`);
  const data: ApiResponse<VideoPlaylist> = await response.json();
  return data.videoplaylist || [];
};

export const fetchVideos = async (
  videoPlaylists: VideoPlaylist[]
): Promise<Video[]> => {
  const videoPromises = videoPlaylists.map((vp) =>
    fetch(`${BASE_URL}/videos/${vp.id_video}`)
      .then((res) => res.json())
      .then((data: ApiResponse<Video>) => data.video)
  );
  const results = await Promise.all(videoPromises);
  return results.filter((video): video is Video => video !== undefined);
};

export const deleteVideoFromPlaylist = async (videoPlaylistId: number): Promise<void> => {
  await fetch(`${BASE_URL}/videoplaylist/${videoPlaylistId}`, {
    method: "DELETE",
  });
};
