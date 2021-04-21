import { Arg, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Tag } from "../../entities";

@ObjectType()
class PaginatedTags {
  @Field(() => [Tag])
  tags: Tag[];

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  skip: number;
}

@Resolver(Tag)
export default class GetTagsResolver {
  @Query(() => PaginatedTags)
  async tags(
    @Arg("limit", () => Int, { nullable: true }) limit: number | null,
    @Arg("page", () => Int, { nullable: true }) page: number | null,
    @Arg("skip", () => Int, { nullable: true }) skip: number | null
  ): Promise<PaginatedTags> {
    console.log(`limit, page, `, limit, page, skip);

    // TODO : query for pagination

    const tags = await getConnection().query(`SELECT * FROM tag`);

    return {
      tags,
      total: await Tag.count(),
      page: 0,
      skip: 0
    };
  }
}
