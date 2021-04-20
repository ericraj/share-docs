import { Field, ObjectType } from "type-graphql";
import { Category, User } from "../entities";
import { FieldError } from "./error";

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class CategoryResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Category, { nullable: true })
  category?: Category;
}
