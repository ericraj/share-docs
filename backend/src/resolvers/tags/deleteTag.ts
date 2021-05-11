import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Tag } from "../../entities";
import { isAuth } from "../../middlewares";
import { Context } from "../../types";
import { checkCurrentUser } from "../../utils/checkCurrentUser";

@Resolver(Tag)
export default class DeleteTagResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteTag(@Arg("id", () => Int) id: number, @Ctx() { req }: Context): Promise<boolean> {
    const tag = await Tag.findOne(id);
    if (!tag) return false;

    checkCurrentUser(tag.creatorId, (req.session as any).userId);

    // TODO : soft delete with isRemoved field ?

    await Tag.delete({ id });
    return true;
  }
}
