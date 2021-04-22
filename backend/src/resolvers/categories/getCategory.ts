import { Category, User } from "src/entities";
import { Context } from "src/types";
import { Arg, Ctx, FieldResolver, Int, Query, Resolver, Root } from "type-graphql";

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
