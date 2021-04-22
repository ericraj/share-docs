import { InputType, Field, Int } from "type-graphql";

@InputType()
export class CategoryInputs {
  @Field()
  name: string;
}

@InputType()
export class UpdateCategoryInputs {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
