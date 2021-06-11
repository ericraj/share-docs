import { createConnection, getConnection } from "typeorm";
import entities from "../entities";
import { DATABASE_URL } from "../env";
import seedCategory from "./category";
import seedTag from "./tag";
import seedUser from "./user";

// eslint-disable-next-line import/prefer-default-export
export const CONNECTION_NAME = "seed";

const main = async () => {
  const connection = await createConnection({
    type: "postgres",
    url: DATABASE_URL,
    entities: [...entities],
    name: CONNECTION_NAME,
    logging: true
  });

  console.log(`Start seeding ...`);

  await seedUser(connection);
  await seedTag(connection);
  await seedCategory(connection);

  console.log(`Seeding finished.`);
};

main()
  .catch(async e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await getConnection(CONNECTION_NAME).close();
  });
