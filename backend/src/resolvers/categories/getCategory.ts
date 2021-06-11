import { Arg, Ctx, FieldResolver, Int, Query, Resolver, Root } from "type-graphql";
import { Category, User } from "../../entities";
import { Context } from "../../types";

@Resolver(Category)
export default class GetCategoryReseolver {
  @FieldResolver(() => User)
  creator(@Root() category: Category, @Ctx() { userLoader }: Context) {
    return userLoader.load(category.creatorId);
  }

  @Query(() => Category, { nullable: true })
  async category(@Arg("id", () => Int) id: number): Promise<Category | undefined> {
    return Category.findOne(id);
  }
}
