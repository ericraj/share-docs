import faker from "faker";
import { Connection } from "typeorm";
import { Tag } from "../entities";
import { TagInputs } from "../resolvers/tags/inputs";
import { getRandomUserId } from "./helpers";

const tags: TagInputs[] = Array.from({ length: 10 }).map(() => {
  return { name: faker.lorem.word() };
});

export const seedTag = async (connection: Connection) => {
  await Promise.all(
    tags.map(async tag => {
      const count = await connection
        .createQueryBuilder()
        .from(Tag, "tag")
        .where("tag.name = :name", {
          name: tag.name
        })
        .getCount();

      if (count > 0) return;

      const creatorId = await getRandomUserId(connection);
      const result = await connection
        .createQueryBuilder()
        .insert()
        .into(Tag)
        .values({ ...tag, creatorId: creatorId })
        .returning("*")
        .execute();
      const createdTag = result.raw[0];
      console.log(`Tag created with id: ${createdTag.id}`);
    })
  );
};
