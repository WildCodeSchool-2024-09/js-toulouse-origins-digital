import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

export interface VideoPlaylist {
  id: number;
  id_playlist: number;
  id_video: number;
}

class VideoAndPlaylistRepository {
  async createVideoPlaylist(videoPlaylist: VideoPlaylist): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO video_playlist (id_playlist, id_video) VALUES (?, ?)",
      [videoPlaylist.id_playlist, videoPlaylist.id_video],
    );
    return result;
  }

  async deleteVideoPlaylist(id: number): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM video_playlist WHERE id = ?",
      [id],
    );
    return result;
  }

  async findVideosByPlaylistId(id_playlist: number): Promise<Rows> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM video_playlist WHERE id_playlist = ?",
      [id_playlist],
    );
    return rows;
  }
}
export default new VideoAndPlaylistRepository();
