import { Field, ObjectType } from "type-graphql";

@ObjectType()
// eslint-disable-next-line import/prefer-default-export
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}
