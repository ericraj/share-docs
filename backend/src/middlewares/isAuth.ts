import { MiddlewareFn } from "type-graphql";
import { Context } from "../types";

const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const { session } = context.req;
  if (!(session as any).userId) {
    throw new Error("not authenticated");
  }

  return next();
};

export default isAuth;
