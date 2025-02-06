import type {
  ApiResponse,
  Playlist,
  Video,
  VideoPlaylist,
} from "../types/types";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export const fetchPlaylists = async (userId: number): Promise<Playlist[]> => {
  const response = await fetch(`${BASE_URL}/playlists/${userId}`, {
    method: "GET",
    credentials: "include",
  });
  const data: ApiResponse<Playlist> = await response.json();
  return data.playlists || [];
};

export const addPlaylist = async (
  userId: number,
  newPlaylist: Playlist,
): Promise<void> => {
  await fetch(`${BASE_URL}/playlists/${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(newPlaylist),
  });
};

export const deletePlaylist = async (playlistId: number): Promise<void> => {
  await fetch(`${BASE_URL}/playlists/${playlistId}`, {
    method: "DELETE",
    credentials: "include",
  });
};

export const fetchVideoPlaylists = async (
  playlistId: number,
): Promise<VideoPlaylist[]> => {
  const response = await fetch(`${BASE_URL}/videoplaylist/${playlistId}`, {
    credentials: "include",
  });
  const data: ApiResponse<VideoPlaylist> = await response.json();
  return data.videoplaylist || [];
};

export const fetchVideos = async (
  videoPlaylists: VideoPlaylist[],
): Promise<Video[]> => {
  const videoPromises = videoPlaylists.map((vp) =>
    fetch(`${BASE_URL}/videos/${vp.id_video}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data: ApiResponse<Video>) => data.video),
  );
  const results = await Promise.all(videoPromises);
  return results.filter((video): video is Video => video !== undefined);
};

export const deleteVideoFromPlaylist = async (
  videoPlaylistId: number,
): Promise<void> => {
  await fetch(`${BASE_URL}/videoplaylist/${videoPlaylistId}`, {
    method: "DELETE",
    credentials: "include",
  });
};
