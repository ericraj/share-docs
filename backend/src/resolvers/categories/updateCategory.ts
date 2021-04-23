import { Category } from "../../entities";
import { isAuth } from "../../middlewares";
import { Context } from "../../types";
import { validateCategory } from "../../utils/validateCategory";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
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
    const errors = validateCategory(inputs);
    if (errors) return { errors };

    // TODO : check if current user is creator user ?

    const result = await getConnection()
      .createQueryBuilder()
      .update(Category)
      .set({ name: inputs.name })
      .where('id = :id and "creatorId" = :creatorId', {
        id: inputs.id,
        creatorId: (req.session as any).userId
      })
      .returning("*")
      .execute();
    const category = result.raw[0];
    return { category };
  }
}
