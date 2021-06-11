import { Request, Response } from "express";
import { Session } from "express-session";
import { Redis } from "ioredis";
import createTagLoader from "../utils/createTagLoader";
import createCategoryLoader from "../utils/createCategoryLoader";
import createUserLoader from "../utils/createUserLoader";

export type Context = {
  req: Request & { session: Session };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  categoryLoader: ReturnType<typeof createCategoryLoader>;
  tagLoader: ReturnType<typeof createTagLoader>;
};
