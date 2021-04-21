import { InputType, Field, Int } from "type-graphql";

@InputType()
export class TagInputs {
  @Field()
  name: string;
}

@InputType()
export class UpdateTagInputs {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
