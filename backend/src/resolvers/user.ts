import argon2 from "argon2";
import { Arg, Ctx, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { Context } from "../types";
import { validateRegister } from "../utils/validateRegister";
import { UserInput } from "./userInput";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(@Arg("inputs") inputs: UserInput, @Ctx() { req }: Context): Promise<UserResponse> {
    const errors = validateRegister(inputs);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(inputs.password);

    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          email: inputs.email,
          username: inputs.username,
          password: hashedPassword
        })
        .returning("*")
        .execute();
      user = result.raw[0];
    } catch (err) {
      // Username already exist
      if (err.code === "23505") {
        if (err.detail.includes("email")) {
          return {
            errors: [{ field: "email", message: "email already taken" }]
          };
        }

        if (err.detail.includes("username")) {
          return {
            errors: [{ field: "username", message: "username already taken" }]
          };
        }
      }
    }

    // Store user id session
    // This will set a cookie on the user
    // Keep them logged in
    (req as any).session!.userId = user.id;

    return { user };
  }
}
