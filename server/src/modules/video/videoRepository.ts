import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Video = {
  id: number;
  title: string;
  description: string;
  duration: number;
  url: string;
  date: string;
  views: number;
};

class videoRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from video");
    return rows as Video[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from video where id = ?",
      [id],
    );
    return rows[0] as Video | undefined;
  }

  async update(video: Video) {
    const [result] = await databaseClient.query<Result>(
      "update video set title = ?, description = ?, duration = ?, url = ?, date = ?, views = ? where id = ?",
      [
        video.title,
        video.description,
        video.duration,
        video.url,
        video.date,
        video.views,
        video.id,
      ],
    );
    return result.affectedRows;
  }

  async create(video: Omit<Video, "id">) {
    try {
      const query =
        "insert into video (title, description, duration, url, date, views) values (?, ?, ?, ?, ?, ?)";
      const params = [
        video.title,
        video.description,
        video.duration,
        video.url,
        video.date,
        video.views,
      ];

      const [result] = await databaseClient.query<Result>(query, params);
      return result.insertId;
    } catch (error) {
      console.error("Erreur lors de l'ajout d'une vidéo", error);
      throw error;
    }
  }

  async delete(id: number) {
    const query = "delete from video where id = ?";
    const [result] = await databaseClient.query<Result>(query, [id]);
    return result.affectedRows;
  }
}

export default new videoRepository();
