import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Category } from "../../entities";
import { isAuth } from "../../middlewares";
import { Context } from "../../types";
import validateCategory from "../../utils/validateCategory";
import { CategoryResponse } from "../types";
import { CategoryInputs } from "./inputs";

@Resolver(Category)
export default class CreateCategoryResolver {
  @Mutation(() => CategoryResponse)
  @UseMiddleware(isAuth)
  async createCategory(
    @Arg("inputs") inputs: CategoryInputs,
    @Ctx() { req }: Context
  ): Promise<CategoryResponse> {
    const errors = validateCategory(inputs);
    if (errors) return { errors };
    const category = await Category.create({
      ...inputs,
      creatorId: (req.session as any).userId
    }).save();
    return { category };
  }
}
