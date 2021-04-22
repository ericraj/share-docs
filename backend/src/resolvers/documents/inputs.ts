import { InputType, Field, Int } from "type-graphql";

@InputType()
export class DocumentInputs {
  @Field()
  title: string;

  @Field()
  link: string;

  @Field(() => Int)
  categoryId: number;

  @Field(() => [Int], { nullable: true })
  tagsIds?: number[];
}

@InputType()
export class UpdateDocumentInputs extends DocumentInputs {
  @Field(() => Int)
  id: number;
}
