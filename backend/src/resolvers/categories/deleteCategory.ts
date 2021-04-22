import { Category } from "../../entities";
import { isAuth } from "../../middlewares";
import { Context } from "../../types";
import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from "type-graphql";

@Resolver(Category)
export default class DeleteCategoryResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteTag(@Arg("id", () => Int) id: number, @Ctx() { req }: Context): Promise<boolean> {
    const category = await Category.findOne(id);
    if (!category) return false;
    if (category.creatorId !== (req.session as any).userId) {
      throw new Error("not authorized");
    }

    // TODO : soft delete with isRemoved field ?

    await Category.delete({ id });
    return true;
  }
}
