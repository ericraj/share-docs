import { Category } from "../../entities/Category";
import { Arg, Mutation, Resolver } from "type-graphql";
import { CategoryResponse } from "../response";
import { CategoryInput } from "../categoryInput";
import { validateCategory } from "../../utils/validateCategory";
import { getConnection } from "typeorm";

@Resolver(Category)
export default class CategoryResolver {
  @Mutation(() => CategoryResponse)
  async createCategory(@Arg("inputs") inputs: CategoryInput): Promise<CategoryResponse> {
    const errors = validateCategory(inputs);
    if (errors) {
      return { errors };
    }

    let category;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values({
          name: inputs.name,
          creatorId: inputs.creatorId
        })
        .returning("*")
        .execute();
      category = result.raw[0];
    } catch (err) {
      if (err.code === "23505") {
        if (err.detail.includes("name")) {
          return {
            errors: [{ field: "name", message: "name already taken" }]
          };
        }

        if (err.detail.includes("creatorId")) {
          return {
            errors: [{ field: "creatorId", message: "creatorId wrong" }]
          };
        }
      }
    }
    console.log(":>>", category);

    return { category };
  }
}
