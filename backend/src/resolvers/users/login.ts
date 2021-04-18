import argon2 from "argon2";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User";
import { Context } from "../../types";
import { UserResponse } from "../response";

@Resolver(User)
export class LoginResolver {
  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "username or email doesn't exist"
          }
        ]
      };
    }

    const validPassword = await argon2.verify(user.password, password);
    if (!validPassword) {
      return {
        errors: [{ field: "password", message: "incorrect password" }]
      };
    }

    (req.session as any).userId = user.id;

    return { user };
  }
}
