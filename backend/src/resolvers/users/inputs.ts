import { InputType, Field } from "type-graphql";

@InputType()
// eslint-disable-next-line import/prefer-default-export
export class UserInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  avatar?: string;
}
