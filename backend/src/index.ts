import "dotenv-safe/config";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import path from "path";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Category, Document, Tag, User } from "./entities";
import { DATABASE_URL, PORT } from "./env";
import { HelloResolver } from "./resolvers";

const main = async () => {
  await createConnection({
    type: "postgres",
    url: DATABASE_URL,
    schema: "public",
    logging: true,
    synchronize: false,
    entities: [Category, Document, Tag, User],
    migrations: [path.join(__dirname, "./migrations/*")]
  });

  // await db.runMigrations();

  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false
    })
  });

  apolloServer.applyMiddleware({
    app,
    cors: false
    // cors: { origin: "http://localhost:3000/" /** Or "*" */ },
  });

  app.listen(PORT, () => {
    console.log(`🚀  Server ready at http://localhost:${PORT}`);
  });
};

main().catch(err => {
  console.log("err :>> ", err);
});
