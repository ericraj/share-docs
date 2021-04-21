import { Arg, Ctx, FieldResolver, Int, Query, Resolver, Root } from "type-graphql";
import { Document, User } from "../../entities";
import { Context } from "../../types";

@Resolver(Document)
export default class GetDocumentResolver {
  @FieldResolver(() => User)
  creator(@Root() document: Document, @Ctx() { userLoader }: Context) {
    return userLoader.load(document.creatorId);
  }

  @Query(() => Document, { nullable: true })
  async document(@Arg("id", () => Int) id: number): Promise<Document | undefined> {
    return Document.findOne(id);
  }
}
