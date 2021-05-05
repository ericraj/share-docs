import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Document } from "../../entities";
import { isAuth } from "../../middlewares";
import { Context } from "../../types";
import { checkCurrentUser } from "../../utils/checkCurrentUser";

@Resolver(Document)
export default class DeleteDocumentResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteDocument(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: Context
  ): Promise<boolean> {
    const document = await Document.findOne(id);
    if (!document) return false;

    checkCurrentUser(document.creatorId, (req.session as any).userId);

    // TODO : soft delete with isRemoved field ?

    // Delete document tag relations
    if (document.tags && document.tags.length > 0) {
      await getConnection()
        .createQueryBuilder("document_tags_tag", "dt")
        .where('dt."documentId" = :documentId AND dt."tagId" IN (:tagIds)', {
          documentId: id,
          tagIds: document.tags.map(t => t.id)
        })
        .delete();
    }

    await Document.delete({ id });
    return true;
  }
}
