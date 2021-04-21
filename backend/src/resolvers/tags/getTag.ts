import { Arg, Int, Query, Resolver } from "type-graphql";
import { Tag } from "../../entities";

@Resolver(Tag)
export default class GetTagResolver {
  @Query(() => Tag, { nullable: true })
  async tag(@Arg("id", () => Int) id: number): Promise<Tag | undefined> {
    return Tag.findOne(id);
  }
}
