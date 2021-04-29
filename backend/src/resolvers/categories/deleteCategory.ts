import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Category } from "../../entities";
import { isAuth } from "../../middlewares";
import { Context } from "../../types";
import { checkCurrentUser } from "../../utils/checkCurrentUser";

@Resolver(Category)
export default class DeleteCategoryResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteCategory(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: Context
  ): Promise<boolean> {
    const category = await Category.findOne(id);
    if (!category) return false;

    checkCurrentUser(category.creatorId, (req.session as any).userId)

    // TODO : soft delete with isRemoved field ?

    await Category.delete({ id });
    return true;
  }
}
