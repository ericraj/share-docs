import { Arg, Ctx, FieldResolver, Int, Query, Resolver, Root } from "type-graphql";
import { getConnection } from "typeorm";
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
    const tagIds = await getConnection().query(
      `SELECT dt."tagId" FROM document_tags_tag dt WHERE dt."documentId" = ${document.id}`
    );
    if (tagIds && tagIds.length > 0) {
      console.log(`tagIds :>>`, tagIds);
      return tagLoader.loadMany(tagIds.map((t: { tagId: number }) => t.tagId));
    } else {
      return [];
    }
  }

  @Query(() => Document, { nullable: true })
  async document(@Arg("id", () => Int) id: number): Promise<Document | undefined> {
    return Document.findOne(id);
  }
}
