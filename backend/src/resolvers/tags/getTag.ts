import { Arg, Ctx, FieldResolver, Int, Query, Resolver, Root } from "type-graphql";
import { Tag, User } from "../../entities";
import { Context } from "../../types";

@Resolver(Tag)
export default class GetTagResolver {
  @FieldResolver(() => User)
  creator(@Root() tag: Tag, @Ctx() { userLoader }: Context) {
    return userLoader.load(tag.creatorId);
  }
  
  @Query(() => Tag, { nullable: true })
  async tag(@Arg("id", () => Int) id: number): Promise<Tag | undefined> {
    return Tag.findOne(id);
  }
}
