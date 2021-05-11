import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Category } from "../../entities";
import { isAuth } from "../../middlewares";
import { Context } from "../../types";
import { checkCurrentUser } from "../../utils/checkCurrentUser";
import { validateCategory } from "../../utils/validateCategory";
import { CategoryResponse } from "../types";
import { UpdateCategoryInputs } from "./inputs";

@Resolver(Category)
export default class UpdateCategoryResolver {
  @Mutation(() => CategoryResponse)
  @UseMiddleware(isAuth)
  async updateCategory(
    @Arg("inputs") inputs: UpdateCategoryInputs,
    @Ctx() { req }: Context
  ): Promise<CategoryResponse | null> {
    const { id, name } = inputs;

    const errors = validateCategory(inputs);
    if (errors) return { errors };

    if (!id) {
      return { errors: [{ field: "id", message: `field is required` }] };
    }

    const category = await Category.findOne(id);

    if (!category) {
      return { errors: [{ field: "id", message: `category with id ${id} not found` }] };
    }

    checkCurrentUser(category.creatorId, (req.session as any).userId);

    const result = await getConnection()
      .createQueryBuilder()
      .update(Category)
      .set({ name: name })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: (req.session as any).userId
      })
      .returning("*")
      .execute();
    const res = result.raw[0];
    return { category: res };
  }
}
