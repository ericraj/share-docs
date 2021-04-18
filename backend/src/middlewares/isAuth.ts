import { Context } from "../types";
import { MiddlewareFn } from "type-graphql";

const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const session: any = context.req.session;
  if (!session.userId) {
    throw new Error("not authenticated");
  }

  return next();
};

export default isAuth;
