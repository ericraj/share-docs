import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Document, Tag } from "../../entities";
import { isAuth } from "../../middlewares";
import { Context } from "../../types";
import { checkCurrentUser } from "../../utils/checkCurrentUser";
import { validateDocument } from "../../utils/validateDocument";
import { DocumentResponse } from "../types";
import { UpdateDocumentInputs } from "./inputs";

@Resolver(Document)
export default class UpdateDocumentResolver {
  @Mutation(() => DocumentResponse)
  @UseMiddleware(isAuth)
  async updateDocument(
    @Arg("inputs") inputs: UpdateDocumentInputs,
    @Ctx() { req }: Context
  ): Promise<DocumentResponse> {
    const errors = await validateDocument(inputs);
    if (errors) return { errors };

    const { id, title, link, categoryId, tagsIds } = inputs;

    if (!id) {
      return { errors: [{ field: "id", message: "field is required" }] };
    }

    const document = await Document.findOne(id);

    if (!document) {
      return { errors: [{ field: "id", message: "document not found" }] };
    }

    checkCurrentUser(document.creatorId, (req.session as any).userId);

    const result = await getConnection()
      .createQueryBuilder()
      .update(Document)
      .set({
        title,
        link,
        categoryId
      })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: (req.session as any).userId
      })
      .returning("*")
      .execute();

    // Update many-to-many relations
    if (tagsIds) {
      if (tagsIds.length === 0) document.tags = [];
      if (tagsIds.length > 0) document.tags = await Tag.findByIds(tagsIds);
      await document.save();
    }

    const res = result.raw[0];
    return { document: res };
  }
}
