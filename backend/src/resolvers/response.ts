import { Field, ObjectType } from "type-graphql";
import { Tag, User } from "../entities";
import { Category } from "../entities";
import { FieldError } from "./error";
@ObjectType()
export class ErrorResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class UserResponse extends ErrorResponse {
  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
export class TagResponse extends ErrorResponse {
  @Field(() => Tag, { nullable: true })
  tag?: Tag;
}
export class CategoryResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Category, { nullable: true })
  category?: Category;
}
