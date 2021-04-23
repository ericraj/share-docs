import { Arg, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { Category } from "../../entities";
import { PaginatedData } from "../types";

@ObjectType()
class PaginatedCategories extends PaginatedData {
  @Field(() => [Category])
  categories: Category[];
}

@Resolver(Category)
export default class GetCategoriesResolver {
  @Query(() => PaginatedCategories)
  async categories(
    @Arg("take", () => Int, { nullable: true }) take: number | undefined,
    @Arg("skip", () => Int, { nullable: true, defaultValue: 0 }) skip: number | undefined
  ): Promise<PaginatedCategories> {
    let categories: Category[] = [];
    if (take) {
      categories = await getRepository(Category)
        .createQueryBuilder("cat")
        .take(take)
        .skip(skip)
        .getMany();
    } else {
      categories = await getRepository(Category).createQueryBuilder("cat").skip(skip).getMany();
    }

    return {
      categories,
      total: await Category.count(),
      take,
      skip
    };
  }
}
