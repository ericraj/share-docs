import { Field, ObjectType } from "type-graphql";
import { User } from "../entities";
import { FieldError } from "./error";

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
