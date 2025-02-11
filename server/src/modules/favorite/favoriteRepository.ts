import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

export interface Favorite {
  id: number;
  id_user: number;
  id_video: number;
}

class FavoriteRepository {
  async createFavorite(favorite: Favorite): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO favorite (id_user, id_video) VALUES (?, ?)",
      [favorite.id_user, favorite.id_video],
    );
    return result;
  }

  async deleteFavorite(favorite: Favorite): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM favorite WHERE id_user = ? AND id_video = ?",
      [favorite.id_user, favorite.id_video],
    );
    return result;
  }

  async findFavoritesByUserId(id_user: number): Promise<Rows> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT v.* FROM video v JOIN favorite f ON v.id = f.id_video WHERE f.id_user = ?",
      [id_user],
    );
    return rows;
  }
}

export default new FavoriteRepository();
