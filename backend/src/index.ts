import "dotenv-safe/config";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import path from "path";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Category, Document, Tag, User } from "./entities";
import { CORS_ORIGIN, DATABASE_URL, PORT, REDIS_URL, SESSION_SECRET } from "./env";
import resolvers from "./resolvers";
import { Context } from "./types";
import cors from "cors";
import { COOKIE_NAME, __prod__ } from "./constants";

const main = async () => {
  await createConnection({
    type: "postgres",
    url: DATABASE_URL,
    schema: "public",
    logging: true,
    synchronize: true,
    entities: [Category, Document, Tag, User],
    migrations: [path.join(__dirname, "./migrations/*")]
  });

  // await db.runMigrations();

  const app = express();

  // Cors
  app.use(
    cors({
      origin: CORS_ORIGIN,
      credentials: true
    })
  );

  const RedisStore = connectRedis(session);
  const redis = new Redis(REDIS_URL);

  // Session
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10 /** 10 years */,
        httpOnly: true,
        sameSite: "lax" /** csrf */,
        secure: __prod__ /** cookie only works in https */
        // domain: __prod__ ? ".aze.com" : undefined
      },
      secret: SESSION_SECRET || "",
      saveUninitialized: false,
      resave: false
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers,
      validate: false
    }),
    context: ({ req, res }): Context => ({
      req,
      res,
      redis
    })
  });

  apolloServer.applyMiddleware({
    app,
    cors: false
    // cors: { origin: "http://localhost:3000/" /** Or "*" */ },
  });

  app.listen(PORT, () => {
    console.log(`🚀  Server ready at http://localhost:${PORT}`);
    console.log(`🚀  GraphQL Playground ready at http://localhost:${PORT}/graphql`);
  });
};

main().catch(err => {
  console.log("err :>> ", err);
});
