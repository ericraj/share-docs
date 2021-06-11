import { Connection } from "typeorm";
import { User } from "../entities";

const getRandomUserId = async (connection: Connection): Promise<number> => {
  const users = await connection
    .createQueryBuilder()
    .select("user.id")
    .from(User, "user")
    .getMany();
  const userIds = users.map(u => u.id);
  const userId = userIds[Math.floor(Math.random() * userIds.length)];
  return userId;
};

export default getRandomUserId;
