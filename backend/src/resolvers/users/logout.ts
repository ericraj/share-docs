import { Ctx, Mutation } from "type-graphql";
import { COOKIE_NAME } from "../../constants";
import { Context } from "../../types";

export default class LogoutResolver {
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: Context) {
    return new Promise(resolve =>
      req.session?.destroy(err => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
