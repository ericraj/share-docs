import { Arg, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { Document } from "../../entities";
import { PaginatedData } from "../types";

@ObjectType()
class PaginatedDocuments extends PaginatedData {
  @Field(() => [Document])
  documents: Document[];
}

@Resolver(Document)
export default class GetDocumentsResolver {
  @Query(() => PaginatedDocuments)
  async documents(
    @Arg("take", () => Int, { nullable: true }) take: number | undefined,
    @Arg("skip", () => Int, { nullable: true, defaultValue: 0 }) skip: number | undefined
  ): Promise<PaginatedDocuments> {
    let documents: Document[] = [];
    if (take) {
      documents = await getRepository(Document)
        .createQueryBuilder("doc")
        .take(take)
        .skip(skip)
        .getMany();
    } else {
      documents = await getRepository(Document).createQueryBuilder("doc").skip(skip).getMany();
    }

    return {
      documents,
      total: await Document.count(),
      take,
      skip
    };
  }
}
