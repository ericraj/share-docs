import { InputType, Field } from "type-graphql";

@InputType()
export class CategoryInput {
  @Field()
  name: string;

  @Field()
  creatorId: number;
}
