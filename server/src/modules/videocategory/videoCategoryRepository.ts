import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

interface VideoCategory {
  id: number;
  id_video: number;
  id_category: number;
}

class VideoCategoryRepository {
  async read(id_category: number): Promise<Rows> {
    const [rows] = await databaseClient.query<Rows>(
      "select * from video_category where id_category = ?",
      [id_category],
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
