import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from "type-graphql";
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

    await Document.delete({ id });
    return true;
  }
}
