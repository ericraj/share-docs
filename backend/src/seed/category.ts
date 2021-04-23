import faker from "faker";
import { Connection } from "typeorm";
import { Category } from "../entities";
import { CategoryInputs } from "../resolvers/categories/inputs";
import { getRandomUserId } from "./helpers";

const categories: CategoryInputs[] = Array.from({ length: 10 }).map(() => {
  return { name: faker.lorem.word() };
});

export const seedCategory = async (connection: Connection) => {
  await Promise.all(
    categories.map(async category => {
      const count = await connection
        .createQueryBuilder()
        .from(Category, "category")
        .where("category.name = :name", {
          name: category.name
        })
        .getCount();

      if (count > 0) return;

      const creatorId = await getRandomUserId(connection);
      const result = await connection
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values({ ...category, creatorId: creatorId })
        .returning("*")
        .execute();
      const createdCategory = result.raw[0];
      console.log(`Category created with id: ${createdCategory.id}`);
    })
  );
};
