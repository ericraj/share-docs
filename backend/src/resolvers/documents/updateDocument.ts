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

    const { id, tagsIds } = inputs;

    if (!id) {
      return { errors: [{ field: "id", message: "field is required" }] };
    }

    const doc = await Document.findOne(id);

    if (!doc) {
      return { errors: [{ field: "id", message: "document not found" }] };
    }

    checkCurrentUser(doc.creatorId, (req.session as any).userId);

    const result = await getConnection()
      .createQueryBuilder()
      .update(Document)
      .set({
        ...inputs,
        tags: tagsIds && tagsIds.length > 0 ? await Tag.findByIds(tagsIds) : doc.tags,
        creatorId: (req.session as any).userId
      })
      .where('id = :id and "creatorId" = :creatorId', {
        id: inputs.id,
        creatorId: (req.session as any).userId
      })
      .returning("*")
      .execute();
    const document = result.raw[0];
    return { document };
  }
}
