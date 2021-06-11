import { Arg, Ctx, FieldResolver, Int, Query, Resolver, Root } from "type-graphql";
import { getConnection } from "typeorm";
import { TABLES_NAMES } from "../../constants";
import { Category, Document, Tag, User } from "../../entities";
import { Context } from "../../types";

@Resolver(Document)
export default class GetDocumentResolver {
  @FieldResolver(() => User)
  creator(@Root() document: Document, @Ctx() { userLoader }: Context) {
    return userLoader.load(document.creatorId);
  }

  @FieldResolver(() => Category)
  category(@Root() document: Document, @Ctx() { categoryLoader }: Context) {
    return categoryLoader.load(document.categoryId);
  }

  @FieldResolver(() => [Tag], { nullable: true })
  async tags(@Root() document: Document, @Ctx() { tagLoader }: Context) {
    const tagsIds = await getConnection().query(
      `SELECT dt."tagId" FROM ${TABLES_NAMES.documents_tags} dt WHERE dt."documentId" = ${document.id}`
    );

    return tagsIds && tagsIds.length > 0
      ? tagLoader.loadMany(tagsIds.map((item: { tagId: any }) => item.tagId))
      : [];
  }

  @Query(() => Document, { nullable: true })
  async document(@Arg("id", () => Int) id: number): Promise<Document | undefined> {
    return Document.findOne(id);
  }
}
