import "dotenv-safe/config";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { PORT } from "./env";
import { HelloResolver } from "./resolvers";

const main = async () => {
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
