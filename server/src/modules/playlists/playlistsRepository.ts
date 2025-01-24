import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

export interface Playlist {
  id: number;
  id_user: number;
  name: string;
}

class PlaylistRepository {
  async createPlaylist(playlist: Playlist): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO playlist (id_user, name) VALUES (?, ?)",
      [playlist.id_user, playlist.name],
    );
    return result;
  }

  async deletePlaylist(playlist: Playlist): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM playlist WHERE id = ?",
      [playlist.id],
    );
    return result;
  }

  async findPlaylistsByUserId(id_user: number): Promise<Rows> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM playlist WHERE id_user = ?",
      [id_user],
    );
    return rows;
  }
}
export default new PlaylistRepository();
