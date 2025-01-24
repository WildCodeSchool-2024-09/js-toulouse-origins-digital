// src/types.ts
export interface Playlist {
  id: number;
  name: string;
  id_user: number;
}

export interface Video {
  id: number;
  title: string;
  description: string;
  duration: string;
  video_url: string;
  date: string;
  views: number;
}

export interface VideoPlaylist {
  id: number;
  id_video: number;
  id_playlist: number;
}

export interface ApiResponse<T> {
  playlists?: T[];
  videoplaylist?: T[];
  video?: T;
}
