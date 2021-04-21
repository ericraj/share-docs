import { InputType, Field } from "type-graphql";

@InputType()
export class TagInputs {
  @Field()
  name: string;
}
