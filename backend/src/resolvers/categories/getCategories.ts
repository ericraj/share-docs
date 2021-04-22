import { Arg, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Category } from "../../entities";

@ObjectType()
class PaginatedCategories {
  @Field(() => [Category])
  categories: Category[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  skip: number;
}

@Resolver(Category)
export default class GetCategoriesResolver {
  @Query(() => PaginatedCategories)
  async categories(
    @Arg("limit", () => Int, { nullable: true }) limit: number | null,
    @Arg("page", () => Int, { nullable: true }) page: number | null,
    @Arg("skip", () => Int, { nullable: true }) skip: number | null
  ): Promise<PaginatedCategories> {
    console.log(`limit, page, `, limit, page, skip);

    const categories = await getConnection().query(`SELECT * FROM categories`);

    return {
      categories,
      total: await Category.count(),
      page: 0,
      skip: 0
    };
  }
}
