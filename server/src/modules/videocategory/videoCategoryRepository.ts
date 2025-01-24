import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

interface VideoCategory {
  id: number;
  id_video: number;
  id_category: number;
}

class VideoCategoryRepository {
  async readVideosByCategory(id_category: number): Promise<Rows> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT v.* FROM video v JOIN video_category vc ON v.id = vc.id_video WHERE vc.id_category = ?",
      [id_category],
    );
    return rows;
  }

  async readCategoriesByVideo(id_video: number): Promise<Rows> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT c.* FROM category c JOIN video_category vc ON c.id = vc.id_category WHERE vc.id_video = ?",
      [id_video],
    );
    return rows;
  }

  async create(videoCategory: VideoCategory): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "insert into video_category (id_category, id_video) VALUES (?, ?)",
      [videoCategory.id_category, videoCategory.id_video],
    );
    return result;
  }

  async delete(videoCategory: VideoCategory): Promise<Result> {
    const [result] = await databaseClient.query<Result>(
      "delete from video_category where id_category = ? ans id_video = ?",
      [videoCategory.id_category, videoCategory.id_video],
    );
    return result;
  }
}

export default new VideoCategoryRepository();
