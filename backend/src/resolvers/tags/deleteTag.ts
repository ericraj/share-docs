import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Tag } from "../../entities";
import { isAuth } from "../../middlewares";
import { Context } from "../../types";
import { checkCurrentUser } from "../../utils/checkCurrentUser";

@Resolver(Tag)
export default class DeleteTagResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteTag(@Arg("id", () => Int) id: number, @Ctx() { req }: Context): Promise<boolean> {
    const tag = await Tag.findOne(id);
    if (!tag) return false;

    checkCurrentUser(tag.creatorId, (req.session as any).userId);

    // TODO : soft delete with isRemoved field ?

    // Delete document tag relations
    if (tag.documents && tag.documents.length > 0) {
      await getConnection()
        .createQueryBuilder("document_tags_tag", "dt")
        .where('dt."tagId" = :tagId AND dt."documentId" IN (:documentIds)', {
          tagId: id,
          documentIds: tag.documents.map(d => d.id)
        })
        .delete();
    }

    await Tag.delete({ id });
    return true;
  }
}
