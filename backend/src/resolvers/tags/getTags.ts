import { Arg, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { Tag } from "../../entities";
import { PaginatedData } from "../types";

@ObjectType()
class PaginatedTags extends PaginatedData {
  @Field(() => [Tag])
  tags: Tag[];
}

@Resolver(Tag)
export default class GetTagsResolver {
  @Query(() => PaginatedTags)
  async tags(
    @Arg("take", () => Int, { nullable: true }) take: number | undefined,
    @Arg("skip", () => Int, { nullable: true, defaultValue: 0 }) skip: number | undefined
  ): Promise<PaginatedTags> {
    let tags: Tag[] = [];
    if (take) {
      tags = await getRepository(Tag).createQueryBuilder("tag").take(take).skip(skip).getMany();
    } else {
      tags = await getRepository(Tag).createQueryBuilder("tag").skip(skip).getMany();
    }

    return {
      tags,
      total: await Tag.count(),
      take,
      skip
    };
  }
}
