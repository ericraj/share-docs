import argon2 from "argon2";
import { Connection } from "typeorm";
import { User } from "../entities";
import { UserInput } from "../resolvers/users/inputs";

const users: UserInput[] = Array.from({ length: 10 }).map((_v, i) => {
  return {
    email: `user${i + 1}@yopmail.com`,
    password: `user${i + 1}`,
    username: `user${i + 1}`
  };
});

export const seedUser = async (connection: Connection) => {
  await Promise.all(
    users.map(async user => {
      const count = await connection
        .createQueryBuilder()
        .from(User, "user")
        .where("user.email = :email OR user.username = :username", {
          email: user.email,
          username: user.username
        })
        .getCount();

      if (count > 0) return;

      const result = await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({ ...user, password: await argon2.hash(user.password) })
        .returning("*")
        .execute();
      const createdUser = result.raw[0];
      console.log(`User created with id: ${createdUser.id}`);
    })
  );
};
