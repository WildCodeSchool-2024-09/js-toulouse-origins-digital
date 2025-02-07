import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  email: string;
  pseudo: string;
  hashed_password: string;
  is_admin: boolean | undefined;
  avatar_url: string;
};

class userRepository {
  readById(arg0: number) {
    throw new Error("Method not implemented.");
  }
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

  async update(user: Omit<User, "hashed_password">) {
    const [result] = await databaseClient.query<Result>(
      "update user set email = ?, pseudo = ?, is_admin = ?, avatar_url = ? where id = ?",
      [user.email, user.pseudo, user.is_admin, user.avatar_url, user.id],
    );
    return result.affectedRows;
  }

  async create(user: Omit<User, "id">) {
    try {
      const query = `insert into user (email, hashed_password, pseudo, is_admin, avatar_url) values (?, ?, ?, ?, "https://images-ext-1.discordapp.net/external/Wm6KsZl_iebEBuXjiRPIG_mWBPxecfHMUqUC6Hgu8bI/https/img.freepik.com/vecteurs-libre/jeu-astronaute-mignon-joystick-casque-dessin-anime-icone-vectorielle-illustration-science-techno_138676-9648.jpg")`;
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

  async updateProfileImage(userId: number, avatarUrl: string): Promise<number> {
    const query = "UPDATE user SET avatar_url = ? WHERE id = ?";
    const [result] = await databaseClient.query<Result>(query, [
      avatarUrl,
      userId,
    ]);
    return result.affectedRows;
  }
}

export default new userRepository();
