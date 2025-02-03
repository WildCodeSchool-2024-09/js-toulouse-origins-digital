import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Category = {
  id: number;
  name: string;
  url_image: string;
  description: string;
};

class categoryRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from category");
    return rows as Category[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from category where id = ?",
      [id],
    );
    return rows[0] as Category | undefined;
  }

  async update(category: Category) {
    const [result] = await databaseClient.query<Result>(
      "update category set name = ?, url_image = ?, description = ? where id = ?",
      [category.name, category.url_image, category.description, category.id],
    );
    return result.affectedRows;
  }

  async create(category: Omit<Category, "id">) {
    try {
      const query =
        "insert into category (name, url_image, description) values (?, ?, ?)";
      const params = [category.name, category.url_image, category.description];

      const [result] = await databaseClient.query<Result>(query, params);
      return result.insertId;
    } catch (error) {
      console.error("Erreur lors de l'ajout d'une catégorie", error);
      throw error;
    }
  }

  async delete(id: number) {
    const query = "delete from category where id = ?";
    const [result] = await databaseClient.query<Result>(query, [id]);
    return result.affectedRows;
  }
}

export default new categoryRepository();
