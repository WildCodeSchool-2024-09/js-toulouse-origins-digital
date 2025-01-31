import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  email: string;
  hashed_password: string;
  pseudo: string;
  is_admin: boolean;
  avatar_url: string;
};

class userRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from user");
    return rows as User[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where id = ?",
      [id],
    );
    return rows[0] as User | undefined;
  }

  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where email = ?",
      [email],
    );
    return rows[0] as User;
  }

  async update(user: User) {
    const [result] = await databaseClient.query<Result>(
      "update user set email = ?, hashed_password = ?, pseudo = ?, is_admin = ?, avatar_url = ? where id = ?",
      [
        user.email,
        user.hashed_password,
        user.pseudo,
        user.is_admin,
        user.avatar_url,
        user.id,
      ],
    );
    return result.affectedRows;
  }

  async create(user: Omit<User, "id">) {
    try {
      const query =
        'insert into user (email, hashed_password, pseudo, is_admin, avatar_url) values (?, ?, ?, ?, "https://img.freepik.com/vecteurs-libre/jeu-astronaute-mignon-joystick-casque-dessin-anime-icone-vectorielle-illustration-science-techno_138676-9648.jpg")';
      const params = [
        user.email,
        user.hashed_password,
        user.pseudo,
        user.is_admin,
        user.avatar_url,
      ];
      const [result] = await databaseClient.query<Result>(query, params);
      return result.insertId;
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un utilisateur", error);
      throw error;
    }
  }

  async delete(id: number) {
    const query = "delete from user where id = ?";
    const [result] = await databaseClient.query<Result>(query, [id]);
    return result.affectedRows;
  }
}

export default new userRepository();
