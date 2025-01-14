import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type User = {
  id: number;
  email: string;
  password: string;
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
}

export default new userRepository();
