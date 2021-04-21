import { Arg, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { Tag } from "../../entities";

@ObjectType()
class PaginatedTags {
  @Field(() => [Tag])
  tags: Tag[];

  @Field(() => Int)
  total: number;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;
}

@Resolver(Tag)
export default class GetTagsResolver {
  @Query(() => PaginatedTags)
  async tags(
    @Arg("take", () => Int, { nullable: true }) take: number | undefined,
    @Arg("skip", () => Int, { nullable: true, defaultValue: 0 }) skip: number | undefined
  ): Promise<PaginatedTags> {
    const tags = await getRepository(Tag).createQueryBuilder("tag").take(take).skip(skip).getMany();
    return {
      tags,
      total: await Tag.count(),
      take,
      skip
    };
  }
}
